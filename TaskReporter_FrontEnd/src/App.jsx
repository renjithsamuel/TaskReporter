import { useEffect, useState } from 'react';
import './App.css'
// router dom
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// redux
// import { Provider } from 'react-redux';
// import store from './redux/store';

import LeftNavBar from "./pages/LeftNavBar/LeftNavBar";
import PageContent from './pages/PageContent/PageContent';
import SettingsPageContent from './pages/SettingsPageContent/SettingsPageContent';
import DashBoardPageContent from './pages/DashBoardPageContent/DashBoardPageContent';
import ChatPageContent from './pages/ChatPageContent/ChatPageContent';
import LoginWithGooglePopUpComponent from './component/PopUpComponents/LoginWithGooglePopUpComponent/LoginWithGooglePopUpComponent';

// importing functions from utils.js
import { loginCurrentUser , connectToServerFunc} from './utils/ApiHandlers';



function App(){
  const [connectedToServer,setConnectedToServer] = useState(false);
  const [selectedNavElem , setSelectedNavElem] = useState('none');
  const [theme , setTheme ] = useState("light");

  // login states
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [gotUser,setGotUser] = useState(false);



  useEffect(()=>{
      connectToServerFunc(setConnectedToServer);
      if(connectedToServer==true && localStorage.getItem('emailId').toString()!='undefined'){
        console.log("inside default useEffect");
        console.log(isLoggedIn);
        setIsLoggedIn(true);
      }
  },[connectedToServer]);
  
  useEffect(()=>{
    if(localStorage.getItem('emailId').toString() !='undefined' && isLoggedIn==true){
          console.log("inside logged in useEffect");
          const tempCurrentUserData = {username : localStorage.getItem('username') , emailId : localStorage.getItem('emailId')};
          loginCurrentUser(tempCurrentUserData,setCurrentUser,setGotUser);
      }
  },[isLoggedIn]);

  useEffect(()=>{
    console.log("current user" , currentUser);
  },[currentUser])


  return (
    <>
    {(!gotUser)?<LoginWithGooglePopUpComponent theme={theme} setIsLoggedIn={setIsLoggedIn} connectedToServer={connectedToServer}/>:''}
    <div className='AppWrapper'>
          <LeftNavBar selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem} theme={theme}/>
          {(selectedNavElem=='tasks')?    
            <PageContent theme={theme} currentUser={currentUser}/>
            :(selectedNavElem=='chat')?
            <ChatPageContent theme={theme}  currentUser={currentUser}/>
            :(selectedNavElem=='dashboard')?
            <DashBoardPageContent theme={theme}  currentUser={currentUser}/>
            :(selectedNavElem=='settings')?
            <SettingsPageContent theme={[theme,setTheme]}  currentUser={currentUser}/>
            :'Logging out!'
          }
    </div>
    </>
  );
}

export default App;



    // <Provider store={store}>
    // </Provider>
    // <BrowserRouter>
    //     <Routes>
    //       <Route exact path='/' element={<DashBoardPageContent theme={theme}/>}/>
    //       <Route path='/myProjects' element={<MyProjects/>}/>
    //       <Route path='/newproject' element={<NewProject/>}/>

    //       <Route path='/counter' element={<Counter />}/>   
 
    //     </Routes>
    // </BrowserRouter>