import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import TopPage_CentArea from './TopPage/centArea/TopPage_CentArea';
import TopPage_leftArea from './TopPage/leftArea/TopPage_leftArea';
import TopPage_rightArea from './TopPage/rightArea/TopPage_rightArea';
import CreateRoomPage from './SubPage/CreateRoomPage';
import Login from './UserAuth/Login';
import UserRegister from './UserAuth/UserRegister';
import Home from './TopPage/Home';
import Room from './TopPage/centArea/Room';
import MyPage from './UserAuth/MyPage';


function App() {

  return (
    <div className="App">

      {/* leftArea */}
      <BrowserRouter>
      <Switch>
        <Route exact path="/topPage" component={TopPage_leftArea} />
      </Switch>
      
      {/* centArea */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/userRegister" component={UserRegister} />
        <Route exact path="/topPage" component={TopPage_CentArea} />
        <Route exact path="/room" component={Room}/>
        <Route exact path="/create" component={CreateRoomPage} />
        <Route exact path="/mypage" component={MyPage} />
      </Switch>

      {/* rightArea */}
      <Switch>
        <Route exact path="/topPage" component={TopPage_rightArea} />
      </Switch>
      </BrowserRouter>
    </div>
  );
  
}

export default App;
