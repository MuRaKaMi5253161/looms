import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import app, { auth } from '../Firebase';

function Home() {

  const history = useHistory();

  //ログイン情報有無で遷移ページを分岐
  onAuthStateChanged(auth,(user) =>{
    if(!user) {
      history.push("/login");
    } else {
      history.push("/topPage");
    }
  });
  
  //ログイン情報の取得
  useHistory(() =>{
    const auth = getAuth(app);
    onAuthStateChanged(auth);
  },[]); 
  
}

export default Home
