import { Button, Grid } from '@mui/material';
import { Link, useHistory } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import app from '../Firebase';
import './UserAuth.css';
import { useState } from 'react';

function Login() {
   
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // サインイン(ログイン)
  const signIn = async (event) => {

    setEmailErrorMessage("");
    setPasswordErrorMessage("");

    // ツイートボタン押下時にリロードされるのを防ぐ
    event.preventDefault();

    let errorCnt = IsValid();
    if(errorCnt > 0){
      history.push("/login");
      return;
    }
    
    //サインイン処理
    const {email,password} = event.target.elements;
    const auth = getAuth(app);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      console.log('user',user);
      alert('ログインに成功しました');
      history.push("/topPage");
    }catch(error){
      alert('ログインに失敗しました');
    }
  };
  
  // バリデーションチェック
  const IsValid = () => {

    let errorCnt = 0;

    if(Email.length <= 0) {
      errorCnt++;
      setEmailErrorMessage("※メールアドレスを入力してください");
    }

    if(Password.length == 0){
      errorCnt++;
      setPasswordErrorMessage("※パスワードを入力してください");
    }

    return errorCnt;
  }

  return (
    <div className='userAuthPage'>
      <div className='userAuth_title'>
        <h1>LOGIN</h1>
      </div>

     {/* エラーメッセージ */}
     <p className='errorMessage'>{emailErrorMessage}</p>
      <p className='errorMessage'>{passwordErrorMessage}</p>


      <div className='userAuth_menu'>
      <Grid container alignItems='center' justifyContent='center' direction="column">
        <Grid item xs={3}>
          <AccountCircleIcon className='accountIcon' />
        </Grid>
      </Grid>
        <form className='userAuth_form' onSubmit={signIn}>

          <div className='userLoginEmail'>
            <input type="email" 
            name='email' 
            className='email' 
            maxlength="20" 
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className='userLoginPassword'>
            <input type="password" 
            name='password' 
            className='password' 
            maxlength="12" 
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <Button type='submit' className='signInButton'>ログインする</Button>
          <br />
          <div className='jumpUserRegisterPage'>
            <Link to="/userRegister">新規ユーザー登録はこちら</Link>
          </div>
        </form>
      </div>  
    </div>
  )
  
}

export default Login
