import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import './CreateRoomPage.css'
import {db} from '../Firebase'

function CreateRoomPage() {

  const history = useHistory();
  const [roomName, setRoomName] = useState("");
  const [roomExplanation, setRoomExplanation] = useState("");
  const [roomNameErrorMessage, setroomNameErrorMessage] = useState("");
  const [roomExplanationErrorMessage, setroomExplanationErrorMessage] = useState("");

  // トップ画面へ遷移
  const backTopPage = () =>{
    history.push('/')
  }

  // ルームIDをランダムに作成する  
  const createRoomId = (len) => {  
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/():&%$#';  
    let name = []; 
    for (let i = 0; i < len; i++) {  
      let num = Math.floor(chars.length * Math.random());  
      name.push(chars[num]);  
    }   
    return name.join('');  
  }

  //ルーム情報登録
  const sendRoomInfo = (e) => {  

    // 8文字のIDを生成  
    let roomId = createRoomId(8);  

    setroomNameErrorMessage("");
    setroomExplanationErrorMessage("");

    e.preventDefault();

    let errorCnt = IsValid();
    if(errorCnt > 0){
      history.push('/create');
      return;
    }

    //DB登録
    addDoc(collection(db,"rooms"),{
      Id: roomId,
      roomName: roomName,
      roomExplanation: roomExplanation,
      verified: true,
      timestamp: serverTimestamp()
    }
    );

    setRoomName("");
    setRoomExplanation("");
    history.push('/');
  };

  //バリデーションチェック
  const IsValid = () => {

    let errorCnt = 0;
    if(roomName.length == 0) {
      errorCnt++;
      setroomNameErrorMessage("※ルーム名を入力してください");
    }

    if(roomExplanation.length == 0){
      errorCnt++;
      setroomExplanationErrorMessage("※ルームの説明を入力してください");
    }

    return errorCnt;
  }


  return (
    <div className='CreateRoomPage'>
      <div className='CreateRoomPage_title'>
        <h1>CreateRoom</h1>
      </div>

      {/* エラーメッセージ */}
      <p className='errorMessage'>{roomNameErrorMessage}</p>
      <p className='errorMessage'>{roomExplanationErrorMessage}</p>

      <div className='CreateRoomPage_menu'>
        <form onSubmit={sendRoomInfo}  className='CreateRoomPage_form'>

          {/* ルーム名 */}
          <p className='roomNameTitle'>RoomName</p>
          <input type='text'
            className='roomNameInput'
            placeholder='ルーム名を入力してください'
            maxlength="12"
            onChange={(e) => setRoomName(e.target.value)}> 
          </input><br />

          {/* ルームの説明文 */}
          <p className='roomExplanationTitle'>RoomExplanation</p>
          <textarea
            className='roomExplanationInput'
            placeholder='ルームの説明文を入力してください'
            maxlength="80"
            onChange={(e) => setRoomExplanation(e.target.value)}> 
          </textarea><br />

          {/* 作成するボタン */}
          <Button type='submit' className='CreateRoomSubmit' onClick={sendRoomInfo}>作成する</Button>

          {/* 戻るボタン */}
          <Button className='backTopPage' onClick={backTopPage}>戻る</Button>

        </form>
      </div>
    </div>
  )
  
}

export default CreateRoomPage
