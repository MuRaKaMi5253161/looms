import React, { useEffect, useState } from 'react'
import './TopPage_CentArea.css'
import {db} from '../../Firebase';
import { collection, getDocs, orderBy, query} from "firebase/firestore"
import RoomInfo from './RoomInfo';

function TopPage_CentArea() {

  const [rooms,setRooms] = useState([]);

  //DBからルーム情報を取得
  useEffect(() =>{
    const roomInfo = collection(db,"rooms");
    const newRoomInfo = query(roomInfo,orderBy("timestamp","desc"));
    getDocs(newRoomInfo).then((QuerySnapshot) => {
    setRooms(QuerySnapshot.docs.map((doc) => doc.data()));
    });
  },[]);

  return (
    <div className='centArea'>
        <div className='application_title'>
            <h1>Looms</h1>
        </div>

        <div className='EnteredRooms'>
            {rooms.map((room) => 
            <RoomInfo 
            roomId={room.Id}
            roomName={room.roomName}
            roomExplanation={room.roomExplanation}
            verified={room.verified}
          />
        )}
        </div>

    </div>
  )
  
}

export default TopPage_CentArea;
