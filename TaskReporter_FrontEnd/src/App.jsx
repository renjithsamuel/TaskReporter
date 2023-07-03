import { useState } from 'react';
import './App.css'
import LeftNavBar from "./pages/LeftNavBar/LeftNavBar";
import PageContent from './pages/PageContent/PageContent';
import SettingsPageContent from './pages/SettingsPageContent/SettingsPageContent';
import DashBoardPageContent from './pages/DashBoardPageContent/DashBoardPageContent';
import ChatPageContent from './pages/ChatPageContent/ChatPageContent';

function App(){
  const [selectedNavElem , setSelectedNavElem] = useState('none');
  const [theme , setTheme ] = useState("light");



  return (
    <div className='AppWrapper'>
      <LeftNavBar selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem} theme={theme}/>
      {(selectedNavElem=='tasks')?
        <PageContent theme={theme}/>
        :(selectedNavElem=='chat')?
        <ChatPageContent theme={theme}/>
        :(selectedNavElem=='dashboard')?
        <DashBoardPageContent theme={theme}/>
        :(selectedNavElem=='settings')?
        <SettingsPageContent theme={[theme,setTheme]}/>
        :'Logging out!'
      }
    </div>
  );
}

export default App;