import './ReportsPageContent.css';
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import ShowReportsPopUpComponent from '../../component/PopUpComponents/ShowReportsPopUpComponent/ShowReportsPopUpComponent';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function ReportsPageContent({theme,currentUser,categoryList,taskList,reportList}) {
        // const navigate = useNavigate();
        // const redirectToHome = () => navigate('/tasks')
        const [isReportObjectOpen,setIsReportObjectOpen ]  = useState({categoryList : categoryList , taskList:  taskList,reportList: reportList}); 

        useEffect(()=>{
                if(categoryList && categoryList[0] && categoryList[0]._id){
                        setIsReportObjectOpen((prevState) => { return {...prevState,categoryId : categoryList[0]._id} })
                }
        },[categoryList])

    return ( <> 
                        <div className="ReportsPageWrapper">
                                <TopNavComponent currPage={"Reports"} theme={theme}  currentUser={currentUser}/>
                                <div className="reportsPageMiddleContent">
                                        <ShowReportsPopUpComponent theme={theme} defaultReportPage='categoryDetails' categoryList={categoryList} reportList={reportList} taskList={taskList} fromPage={'reportsContent'} reportObject={isReportObjectOpen} setIsReportObjectOpen={setIsReportObjectOpen}/>
                                </div>
                        </div>
             </> );
}

export default ReportsPageContent;