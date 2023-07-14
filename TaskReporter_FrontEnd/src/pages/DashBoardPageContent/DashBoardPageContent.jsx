import './DashBoardPageContent.css'
import DashBoardTimeLineComponent from '../../component/DashBoardComponents/DashBoardTimeLineComponent/DashBoardTimeLineComponent'
import DashBoardTaskElement from '../../component/DashBoardComponents/DashBoardTaskElement/DashBoardTaskElement'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import NotificationComponent from '../../component/NotificationsComponent/NotificationComponent';
import { useState } from 'react';
import ShowReportsPopUpComponent from '../../component/PopUpComponents/ShowReportsPopUpComponent/ShowReportsPopUpComponent';

function DashBoardPageContent({theme,currentUser,categoryList,setCategoryList}) {
    const [addShowReportsComponentFromDashBoard,setAddShowReportsComponentFromDashBoard] = useState({isOpen : false , category : '',categoryId:''});

    return ( <>
         {(addShowReportsComponentFromDashBoard.isOpen==true)?<div className='showReportsPopUpBackDropFromDashBoard'><ShowReportsPopUpComponent theme={theme} defaultReportPage='categoryDetails' categoryList={categoryList} setIsReportObjectOpen={setAddShowReportsComponentFromDashBoard}/></div>:''}
        <div className="dashBoardComponentWrapper">
            <TopNavComponent currPage={"Dashboard"} theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList}/>
            <div className="dashBoardContentWrapper">
                <div className="dashBoardContentLeft">
                    <div className="dashBoardTimeLineElement">
                        <DashBoardTimeLineComponent />
                    </div>
                    <div className="dashBoardReportsLabel">Reports</div>
                    <div className="DashBoardTaskElements">
                        {/* map */}
                        <DashBoardTaskElement theme={theme} setReportObject={setAddShowReportsComponentFromDashBoard} reportObject={addShowReportsComponentFromDashBoard} />
                    </div>
                </div>
                <div className="dashBoardContentRight">
                    <NotificationComponent theme={theme} fromPage={"Dashboard"} currentUser={currentUser} setCategoryList={setCategoryList}/>
                </div>
            </div>
        </div>
    </> );
}

export default DashBoardPageContent;