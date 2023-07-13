import './ReportsPageContent.css';
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import ShowReportsPopUpComponent from '../../component/PopUpComponents/ShowReportsPopUpComponent/ShowReportsPopUpComponent';

function ReportsPageContent({theme,currentUser}) {
    return ( <>
                <div className="ReportsPageWrapper">
                        <TopNavComponent currPage={"Reports"} theme={theme}  currentUser={currentUser}/>
                        <div className="reportsPageMiddleContent">
                            {/* <div className="showReportsPopUpBackDrop"> */}
                                    <ShowReportsPopUpComponent theme={theme} />
                            {/* </div> */}
                        </div>
                </div>
             </> );
}

export default ReportsPageContent;