import './ReportsPageContent.css';
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import ShowReportsPopUpComponent from '../../component/PopUpComponents/ShowReportsPopUpComponent/ShowReportsPopUpComponent';
// import { useNavigate } from 'react-router-dom';

function ReportsPageContent({theme,currentUser,categoryList}) {
        // const navigate = useNavigate();
        // const redirectToHome = () => navigate('/tasks')
    return ( <> 
                        <div className="ReportsPageWrapper">
                                <TopNavComponent currPage={"Reports"} theme={theme}  currentUser={currentUser}/>
                                <div className="reportsPageMiddleContent">
                                        <ShowReportsPopUpComponent theme={theme} defaultReportPage='categoryDetails' categoryList={categoryList} fromPage={'reportsContent'}/>
                                </div>
                        </div>
             </> );
}

export default ReportsPageContent;