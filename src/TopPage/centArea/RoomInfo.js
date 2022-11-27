import { Button,Grid } from '@mui/material'
import React, { forwardRef } from 'react'
import { useHistory } from 'react-router-dom';
import './RoomInfo.css'

const RoomInfo = forwardRef(({roomId,roomName,roomExplanation}, ref) => {

  const history = useHistory();

  // ルームページへ遷移
  const moveRoom = () =>{
    history.push('/room', {state: roomId,roomName});
  }
    return (
      <div className="RoomInfo" ref={ref}>    
        <div className="RoomInfo_Name">
          <h3>{roomName}</h3>
        </div>

        <div className="RoomInfo_Explanation">
          <p>{roomExplanation}</p>
        </div>

        <form className='RoomInfo_form'>
        <Grid container alignItems='center' justifyContent='center' direction="column">
          <Grid item xs={3}>
            <Button className='EnteringRoomButton' onClick={moveRoom}>ルームに入室する</Button>
          </Grid>
        </Grid>
        </form>
      </div>
    )
  }
)

export default RoomInfo
