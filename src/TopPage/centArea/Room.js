import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {db} from '../../Firebase';
import Post from './Post';
import PostContent from './PostContent';
import './Room.css'
import FlipMove from 'react-flip-move';
import { useLocation } from 'react-router-dom';

function Room() {

  const[postContent,setPostContent] = useState([]);
  const location = useLocation();

  //ロケーションのステータス値(ルームID、ルーム名)を取得
  let parms = location.state.state;
  let roomName = location.state.roomName;

  // DBから投稿情報を取得
  useEffect(() => {
    const postData = collection(db,"roomTimeline");
    const newPostData = query(postData,orderBy("timestamp","desc"));
    getDocs(newPostData).then((QuerySnapshot) => {
    setPostContent(QuerySnapshot.docs.map((doc) => doc.data()));
  });
    onSnapshot(newPostData,(realTimeSnapshot) => {
    setPostContent(realTimeSnapshot.docs.map((doc) => doc.data()));

  });

  }, []);

  return (
    <div className='Room'>
        <div className='Room_Title'>
            <h1>{roomName}</h1>
        </div>
        <div className='Room_Timeline'>

          <Post roomId={parms}  /> 

          <FlipMove>
          {postContent.map((post) =>
            <PostContent
              roomId={post.id}
              roomIdParm={parms}
              PostText={post.text}
              PostImage={post.Image}
              userName={post.userId}
            />
          )} 
          </FlipMove>

        </div>
      
    </div>
  )
}

export default Room
