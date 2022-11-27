import React from 'react'
import './TopPage_rightArea.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';

function TopPage_rightArea() {

  const history = useHistory();

  //マイページへ遷移
  const moveMypage = () => {
    history.push("/mypage");
  }

  return (
    <div className='rightArea'>

      <div className='myPageArea'>
        <h3 className='myPageArea_title' for="pop-up" onClick={moveMypage}>MyPage</h3>
        <AccountCircleIcon className='myPage_Icon' onClick={moveMypage}/>
      </div>            
    </div>
  )
  
}

export default TopPage_rightArea
