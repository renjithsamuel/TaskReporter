import './LeftNavBar.css';
import LeftNavComponent from "../../component/LeftNavComponent/LeftNavComponent";
import taskReporterIconLight from '../../assets/taskReporter-light.svg';
import taskReporterIconDark from '../../assets/taskReporter-dark.svg';
import logoutIconLight from '../../assets/logout-light.svg'
import logoutIconDark from '../../assets/logout-dark.svg'

function LeftNavBar({selectedNavElem,setSelectedNavElem,theme,setCurrentUser,setIsLoggedIn}) {
    let LeftNavCompList = [
        {compName : "dashboard" , compIcon : `https://cdn.lordicon.com/usxfmtjg.json` , pathname : '/dashboard'},
        {compName : "tasks" , compIcon : `https://cdn.lordicon.com/egiwmiit.json` , pathname : '/'},
        {compName : "reports" , compIcon :`https://cdn.lordicon.com/iiixgoqp.json` , pathname : '/reports'},
        {compName : "chat" , compIcon :`https://cdn.lordicon.com/hpivxauj.json` , pathname : '/chat'},
    ];

    const settingsIcon = `https://cdn.lordicon.com/hwuyodym.json`;

    return ( 
    <>
    <div className="LeftNavWrapper">
        <div className="topOfLeftNav">
            <div className="titleBar" style={{fontSize:'large',fontWeight:'600'}}>
               <img src={(theme=='light')?taskReporterIconLight:taskReporterIconDark} alt="taskReporter" height={25} width={25}/> Task Reporter
            </div>
            {
                LeftNavCompList.map((elem,index)=>{
                   return <LeftNavComponent key={index} compName = {elem.compName} pathname={elem.pathname} compIcon={elem.compIcon} selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem} theme={theme}/>
                })
            }
        </div>
        <div className="bottomOfLeftNav"> 
                <LeftNavComponent key={LeftNavCompList.length+1} theme={theme} compName={"settings"} pathname={'/settings'} compIcon={settingsIcon} selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem}/>
                <LeftNavComponent key={LeftNavCompList.length+2} theme={theme} compName={"logout"} compIcon={'null'} svgIcon={(theme=='light')?logoutIconLight:logoutIconDark} selectedNavElem={selectedNavElem} setSelectedNavElem={setSelectedNavElem} setCurrentUser={setCurrentUser} setIsLoggedIn={setIsLoggedIn}/>
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