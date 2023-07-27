import { createContext, useEffect, useMemo, useState } from 'react';
import './App.css'
// router dom
import {  Routes, Route , useLocation} from "react-router-dom";
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
import { loginCurrentUser , connectToServerFunc , toggleTheme , getCategoriesByUserId , getTasksByCategoryId ,executeQueuedRequests, getReportsByCategoryId, throttle, getStreakOfUser} from './utils/ApiHandlers';


export let isOnline = false;
export const UserContext = createContext(null);

function App(){
  const [connectedToServer,setConnectedToServer] = useState(false);
  const [selectedNavElem , setSelectedNavElem] = useState('none');
  const [theme , setTheme ] = useState("light");

  // login states
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [gotUser,setGotUser] = useState(false);

  const location = useLocation();


  useEffect(()=>{
    const queuedRequests = JSON.parse(localStorage.getItem('queuedRequests')) || [];

    if ((isOnline && queuedRequests.length > 0)) {
      executeQueuedRequests();
    }
  },[isOnline]);
  


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
  const [reportList , setReportList] = useState([]);
  const [streak , setStreak ] = useState({});

  useMemo(()=>{
      console.log("current user" , currentUser);
      console.log("current user At tasks, ",currentUser);
      if(currentUser && currentUser._id!=undefined){
          getCategoriesByUserId(currentUser._id , setCategoryList);
          getStreakOfUser(currentUser._id , setStreak);
      }
      return [];
  },[currentUser]);

  useMemo(()=>{
      console.log("category list at tasks" , categoryList);
      if(categoryList && categoryList.some((elem)=>!elem || elem._id===undefined)){
        let tempCategoryList = categoryList.filter((elem)=>elem && elem._id!==undefined);
        console.log("sorted category!",tempCategoryList);
        setCategoryList(tempCategoryList);
      }
      else if(categoryList!=null){
          categoryList.map((category) => {
                 getTasksByCategoryId(category._id,setTaskList);  
                 getReportsByCategoryId(category._id,setReportList);
          });
      }
  },[categoryList]);

  useEffect(()=>{
    if(taskList && taskList.some((elem)=>!elem || elem._id===undefined)){
        let tempTaskList = taskList.filter((elem)=>elem && elem._id!==undefined);
        // tempTaskList = tempTaskList.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        setTaskList(tempTaskList);
      }
     else if(taskList!=null){
          console.log("tasklist : " ,taskList);
      }
  },[taskList]);

  useEffect(()=>{
    if(reportList && reportList.some((elem)=>!elem || elem._id===undefined)){
        let tempReportList = reportList.filter((elem)=> elem && elem._id!==undefined);
        // tempReportList = tempReportList.sort((a,b) => new Date(b.reportedDate) - new Date(a.reportedDate));
        setReportList(tempReportList);
      }
      if(reportList!=null){
          console.log("reportlist : " ,reportList);
      }
  },[reportList]);

  useEffect(()=>{
    setSelectedNavElem(location.pathname);
  },[location.pathname])


  useEffect(()=>{
    // listen with socket
    // categoryList.forEach((category)=>{
    //   socketListeningSystemFunction(setCategoryList , setTaskList , setReportList , category );
    // });
    const func = throttle(()=>{console.log("throttling resize");}, 2000)
    window.addEventListener('resize', func)
    return ()=>{
      window.removeEventListener('resize',func);
    }
  },[])
    
    //   to check current online status
      isOnline = useOnlineStatus();
      function useOnlineStatus() {
          const [isOnline, setIsOnline] = useState(true);
          useEffect(() => {
            const handleOnline = () => {
              setIsOnline(true);
            }
            
            const handleOffline = () => {
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
    <UserContext.Provider value={{setCurrentUser,currentUser}}>
      <div className='AppWrapper'>
            <LeftNavBar selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem} theme={theme} setCurrentUser={setCurrentUser}/>
            <Routes >
                <Route path='/' element={<PageContent theme={theme} currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList} taskList={taskList} setTaskList={setTaskList} setIsLoggedIn={setIsLoggedIn} reportList={reportList} setReportList={setReportList}/>}/>
                <Route path='/chat' element={<ChatPageContent theme={theme}  currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList}/>}/>
                <Route path='/dashboard' element={<DashBoardPageContent theme={theme}  currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList} taskList={taskList} reportList={reportList}/>}/>
                <Route path='/settings' element={<SettingsPageContent theme={[theme,setTheme]}  currentUser={currentUser} setCurrentUser={setCurrentUser} setCategoryList={setCategoryList} reportList={reportList} streak={streak}/>}/>
                <Route path='/reports' element={(currentUser._id!=undefined && categoryList!=null)?<ReportsPageContent theme={theme} currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList} reportList={reportList} taskList={taskList} />:<DashBoardPageContent theme={theme}  currentUser={currentUser} categoryList={categoryList} setCategoryList={setCategoryList} reportList={reportList} taskList={taskList} />}/>
            </Routes>
      </div>
    </UserContext.Provider>
    </>
    // <ShowReportsPopUpComponent theme={theme} />
  );
}

export default App;