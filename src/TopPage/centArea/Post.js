import { Button } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { forwardRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useFileUpload } from 'use-file-upload';
import { auth, db } from '../../Firebase';
import './Post.css';

const Post = forwardRef(({roomId}, ref) => {

  const history = useHistory();
  console.log(roomId);

  const [files, selectFiles] = useFileUpload();
  const [PostText,setPostText] = useState("");
  const [userName,setUserName] = useState("");

  // ログインユーザー情報取得
  useEffect(() =>{
    onAuthStateChanged(auth,(user) =>{
    setUserName(user.uid);
    });
  },[]);

  // 入力情報を投稿
  const sendPost = (e) => {

    //ツイートボタン押下時にリロードされるのを防ぐ
    e.preventDefault(); 

    // 画像ファイル有無確認
    if(!files) {
      //DB登録
      addDoc(collection(db,"roomTimeline"),{
        id: roomId,
        text: PostText,
        timestamp: serverTimestamp(),
        userId: userName
      }
      );  
    } else {
      addDoc(collection(db,"roomTimeline"),{
        id: roomId,
        text: PostText,
        Image: files.source,
        timestamp: serverTimestamp(),
        userId: userName
      }
      ); 
    }

    files.source = "";
    setPostText("");
  }

  // トップページへ遷移
  const backTopPage = () => {
    history.push("/");
  }

  
  return (
    <div className='Post' ref={ref}>
        <form className='Post_form' onSubmit={sendPost}>
          <div className='Post_Image'>
            <button className='backTop_Button' onClick={backTopPage}>トップへ</button>
            <button
              type='button'
              className='imgUpload_Button'
              onClick={() =>
                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                console.log("Files Selected", { name, size, source, file });
                })
              }
            >
            画像をアップ
            </button>
          </div>

          <div className='Post_Text'>
            <textarea 
            className='Post_summary'
            placeholder="概要"
            value={PostText}
            maxlength="25"
            onChange={(e) => setPostText(e.target.value)}
            >
            </textarea>
          </div>

          <Button type='submit' className='sendPostButton'>投稿する</Button>  
        </form>
    </div>
  )
})

export default Post
