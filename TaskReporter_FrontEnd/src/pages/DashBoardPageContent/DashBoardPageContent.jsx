import './DashBoardPageContent.css'
import DashBoardTimeLineComponent from '../../component/DashBoardTimeLineComponent/DashBoardTimeLineComponent'
import DashBoardTaskElement from '../../component/DashBoardTaskElement/DashBoardTaskElement'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import NotificationComponent from '../../component/DashBoardNotifications/NotificationComponent';

function DashBoardPageContent({theme}) {
    return ( <>
        <div className="dashBoardComponentWrapper">
            <TopNavComponent currPage={"Dashboard"} theme={theme}/>
            <div className="dashBoardContentWrapper">
                <div className="dashBoardContentLeft">
                    <div className="dashBoardTimeLineElement">
                        <DashBoardTimeLineComponent />
                    </div>
                    <div className="dashBoardReportsLabel">Reports</div>
                    <div className="DashBoardTaskElements">
                        <DashBoardTaskElement theme={theme}/>
                    </div>
                </div>
                <div className="dashBoardContentRight">
                    <NotificationComponent theme={theme} />
                </div>
            </div>
        </div>
    </> );
}

export default DashBoardPageContent;