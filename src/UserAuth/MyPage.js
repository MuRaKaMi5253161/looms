import { Button } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import app, { auth } from '../Firebase';
import './UserAuth.css';

function MyPage() {

    const history = useHistory();
    const [userName, setUserName] = useState([]);
    const [userEmail, setUserEmail] = useState([]);

    // ユーザー情報取得
    useEffect(() =>{
      onAuthStateChanged(auth,(user) =>{
      setUserName(user.uid);
      setUserEmail(user.email);
      });
    },[]);

    // サインアウト
    const signout = async (event) => {

      // ツイートボタン押下時にリロードされるのを防ぐ
      event.preventDefault();

      // サインアウト処理
      const auth = getAuth(app);
      try {
        const result = await signOut(auth);
        console.log(result);
        alert('ログアウトしました');
        history.push("/login");

      }catch(error){
        alert('ログアウトに失敗しました');
      }
    };

    // トップページに戻る
    const backTopPage = () =>{
        history.push('/')
    }

  return (
    <div className='userAuthPage'>
      <div className='userAuth_title'>
        <h1>MyPage</h1>
      </div>
      <div className='userAuth_menu'>
        <div className='userId'>
            <h1>Id</h1>
            <p className='userId_value'>{userName}</p>
        </div>

        <div className='userEmail'>
            <h1>Email</h1>
            <p className='userEmail_value'>{userEmail}</p>
        </div>
        
        <form className='userAuth_form' onSubmit={signout}>
          <Button type='submit' className='signOutButton'>ログアウト</Button>
          <Button className='backTopPageButton' onClick={backTopPage}>戻る</Button>
        </form>  

      </div>
    </div>
  )
  
}

export default MyPage
