import { useEffect, useState } from 'react';
import './App.css'
// router dom
import {  Routes, Route } from "react-router-dom";
// redux
// import { Provider } from 'react-redux';
// import store from './redux/store';

import LeftNavBar from "./pages/LeftNavBar/LeftNavBar";
import PageContent from './pages/PageContent/PageContent';
import SettingsPageContent from './pages/SettingsPageContent/SettingsPageContent';
import DashBoardPageContent from './pages/DashBoardPageContent/DashBoardPageContent';
import ChatPageContent from './pages/ChatPageContent/ChatPageContent';
import ReportsPageContent from './pages/ReportsPageContent/ReportsPageContent';
import LoginWithGooglePopUpComponent from './component/PopUpComponents/LoginWithGooglePopUpComponent/LoginWithGooglePopUpComponent';

// importing functions from utils.js
import { loginCurrentUser , connectToServerFunc , toggleTheme , getCategoriesByUserId , getTasksByCategoryId ,executeQueuedRequests} from './utils/ApiHandlers';


import ShowReportsPopUpComponent from './component/PopUpComponents/ShowReportsPopUpComponent/ShowReportsPopUpComponent';

export let isOnline = false;


function App(){
  const [connectedToServer,setConnectedToServer] = useState(false);
  const [selectedNavElem , setSelectedNavElem] = useState('none');
  const [theme , setTheme ] = useState("light");

  // login states
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [gotUser,setGotUser] = useState(false);


  useEffect(()=>{
    const queuedRequests = JSON.parse(localStorage.getItem('queuedRequests')) || [];

    if ((isOnline && queuedRequests.length > 0)) {
      executeQueuedRequests();
    }
  },[isOnline])

  useEffect(()=>{
      connectToServerFunc(setConnectedToServer);
      if(localStorage.getItem('data-theme') != undefined && localStorage.getItem('data-pallete')!=undefined) {
         toggleTheme(localStorage.getItem('data-theme'),localStorage.getItem('data-pallete'),setTheme);}
      if(connectedToServer==true && localStorage.getItem('emailId')!= undefined ){
        console.log("inside default useEffect");
        console.log(isLoggedIn);
        setIsLoggedIn(true);
      }
  },[connectedToServer]);
  
  useEffect(()=>{
    if(localStorage.getItem('emailId') !=undefined && isLoggedIn==true){
          console.log("inside logged in useEffect");
          const tempCurrentUserData = {username : localStorage.getItem('username') , emailId : localStorage.getItem('emailId')};
          loginCurrentUser(tempCurrentUserData,setCurrentUser,setGotUser);
      }
  },[isLoggedIn]);



  // tasks states
  const [categoryList,setCategoryList] = useState([]);
  const [taskList , setTaskList] = useState([]);

  useEffect(()=>{

      console.log("current user" , currentUser);
      console.log("current user At tasks, ",currentUser);
      if(currentUser && currentUser._id!=undefined){
          getCategoriesByUserId(currentUser._id , setCategoryList);
      }
  },[currentUser]);

  useEffect(()=>{
      console.log("category list at tasks" , categoryList);
      if(categoryList!=null){
          categoryList.map((category) => {
                 getTasksByCategoryId(category._id,setTaskList);
          })
      }
  },[categoryList])

  useEffect(()=>{
      if(taskList!=null){
          console.log("tasklist : " ,taskList);
      }
  },[taskList]);
    
    //   to check current online status
    isOnline = useOnlineStatus();
    // isOnline = false ;
    function useOnlineStatus() {
        const [isOnline, setIsOnline] = useState(true);
        useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }
        function handleOffline() {
            setIsOnline(false);
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
        }, []);
        return isOnline;
    };


  return (
    <>
    {(!gotUser  )?<LoginWithGooglePopUpComponent theme={theme} setIsLoggedIn={setIsLoggedIn} connectedToServer={connectedToServer}/>:''}
    <div className='AppWrapper'>
          <LeftNavBar selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem} theme={theme} setCurrentUser={setCurrentUser}/>
          {/* {(selectedNavElem=='tasks')?    
            <PageContent theme={theme} currentUser={currentUser}/>
            :(selectedNavElem=='chat')?
            <ChatPageContent theme={theme}  currentUser={currentUser}/>
            :(selectedNavElem=='dashboard')?
            <DashBoardPageContent theme={theme}  currentUser={currentUser}/>
            :(selectedNavElem=='settings')?
            <SettingsPageContent theme={[theme,setTheme]}  currentUser={currentUser}/>
            :'Logging out!'
          } */}
          <Routes>
              <Route path='/' element={<PageContent theme={theme} currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList} taskList={taskList} setTaskList={setTaskList} setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route path='/chat' element={<ChatPageContent theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList}/>}/>
              <Route path='/dashboard' element={<DashBoardPageContent theme={theme}  currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList}/>}/>
              <Route path='/settings' element={<SettingsPageContent theme={[theme,setTheme]}  currentUser={currentUser} setCategoryList={setCategoryList}/>}/>
              <Route path='/reports' element={(currentUser._id!=undefined && categoryList!=null)?<ReportsPageContent theme={theme} currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList}/>:<DashBoardPageContent theme={theme}  currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList} />}/>
          </Routes>
    </div>


    </>
    // <ShowReportsPopUpComponent theme={theme} />
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