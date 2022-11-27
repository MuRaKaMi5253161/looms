import React from 'react'
import './TopPage_leftArea.css'
import { useHistory } from 'react-router-dom';

function TopPage_leftArea() {

  const history = useHistory();
  
  //ルーム作成ページへ遷移
  const moveCreateRoom = () => {
    history.push("/create");
  };

  return (
    <div className='createRoom'>
      <div className='createRoom_header'>
        <h2>CreateRoom</h2>
      </div>

      <form>
        <button 
        className='createRoomPage_jump_button' 
        type="submit"
        onClick={moveCreateRoom}
        >
        ルームを作る
        </button>
      </form>
    </div>
  )
  
}

export default TopPage_leftArea;
