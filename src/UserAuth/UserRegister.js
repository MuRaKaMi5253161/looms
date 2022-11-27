import { Button, Grid } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import app from '../Firebase';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import './UserAuth.css'

function UserRegister() {

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // サインアップ
  const signup = async (event) => {

    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    // ツイートボタン押下時にリロードされるのを防ぐ
    event.preventDefault();

    let errorCount = IsValid();
    if(errorCount > 0){
      history.push('/userRegister');
      return;
    }

    // サインアップ処理
    const { email, password } = event.target.elements;
    const auth = getAuth(app);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      console.log('user',user);
      alert('ユーザー登録が完了しました');
      history.push("/login");
    }catch(error){
      alert('ユーザー登録に失敗しました');
    }
  };

  // バリデーションチェック
  const IsValid = (e) => {

    let errorCnt = 0;

    if(email.length <= 0) {
      errorCnt++;
      setEmailErrorMessage("※メールアドレスを入力してください");
    }

    if(password.length <= 0){
      errorCnt++;
      setPasswordErrorMessage("※パスワードを入力してください");
    }

    return errorCnt;
  }

  const moveLoginPage = () => {
    history.push("/login");
  }

  return (
    <div className='userAuthPage'>
      <div className='userAuth_title'>
        <h1>SignUp</h1>
      </div>

           {/* エラーメッセージ */}
      <p className='errorMessage'>{emailErrorMessage}</p>
      <p className='errorMessage'>{passwordErrorMessage}</p>

      <div className='userAuth_menu'>
        <Grid container alignItems='center' justifyContent='center' direction="column">
          <Grid item xs={3}>
            <PersonAddIcon className='addAcountIcon' />
          </Grid>
        </Grid>
        <form className='userAuth_form' onSubmit={signup}>

          <div className='userRegisterEmail'>
            <input type="email" 
            name='email' 
            className='email' 
            maxlength="20" 
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className='userRegisterPassword'>
            <input type="password" 
            name='password' 
            className='password' 
            maxlength="12" 
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <Button type='submit' className='signUpButton'>登録する</Button>
          <button className='backLoginButton' onClick={moveLoginPage}>ログインページへ</button> 
        </form>  
      </div>
    </div>
  )
  
}

export default UserRegister
