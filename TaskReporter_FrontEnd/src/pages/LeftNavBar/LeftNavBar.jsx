import './LeftNavBar.css';
import LeftNavComponent from "../../component/LeftNavComponent/LeftNavComponent";
import taskReporterIconLight from '../../assets/taskReporter-light.svg';
import taskReporterIconDark from '../../assets/taskReporter-dark.svg';
import dashBoardIcon from '../../assets/dashboard-light.svg';
import tasksIcon from '../../assets/tasks-light.svg';
import chatIcon from '../../assets/chat-light.svg';
// import settingsIcon from '../../assets/settings-light.svg';
import logoutIconLight from '../../assets/logout-light.svg'
import logoutIconDark from '../../assets/logout-dark.svg'
import { useEffect, useState } from 'react';

function LeftNavBar({selectedNavElem,setSelectedNavElem,theme}) {
    let LeftNavCompList = [
        {compName : "dashboard" , compIcon : `https://cdn.lordicon.com/usxfmtjg.json`},
        {compName : "tasks" , compIcon : `https://cdn.lordicon.com/egiwmiit.json`},
        {compName : "reports" , compIcon :`https://cdn.lordicon.com/iiixgoqp.json`},
        {compName : "chat" , compIcon :`https://cdn.lordicon.com/hpivxauj.json`},
    ];

    const settingsIcon = `https://cdn.lordicon.com/hwuyodym.json`;
    // const logoutIcon = `https://cdn.lordicon.com/moscwhoj.json`;



    useEffect(()=>{
        console.log(selectedNavElem);
        
    },[selectedNavElem]);

    return ( 
    <>
    <div className="LeftNavWrapper">
        <div className="topOfLeftNav">
            <div className="titleBar" style={{fontSize:'large',fontWeight:'600'}}>
               <img src={(theme=='light')?taskReporterIconLight:taskReporterIconDark} alt="taskReporter" height={25} width={25}/> Task Reporter
            </div>
            {
                LeftNavCompList.map((elem,index)=>{
                   return <LeftNavComponent key={index} compName = {elem.compName} compIcon={elem.compIcon} selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem} theme={theme}/>
                })
            }
        </div>
        <div className="bottomOfLeftNav"> 
                <LeftNavComponent key={LeftNavCompList.length+1} theme={theme} compName={"settings"} compIcon={settingsIcon} selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem}/>
                <LeftNavComponent key={LeftNavCompList.length+2} theme={theme} compName={"logout"} compIcon={'null'} svgIcon={(theme=='light')?logoutIconLight:logoutIconDark} selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem}/>
        </div>
    </div>
    
    </> );
}

export default LeftNavBar;


// const count = useSelector((state) => state.count);
// const dispatcher = useDispatch();
// return (
//   <div>
//     <p>Count: {count}</p>
//     <button onClick={() => dispatcher({ type: 'INCREMENT' })}>Increment</button>
//     <button onClick={() => dispatcher({ type: 'DECREMENT' })}>Decrement</button>