import './PageContent.css'
import PageContentTasksComponent from "../../component/TasksPageComponents/PageContentTasksComponent/PageContentTasksComponent";
import TopNavComponent from "../../component/TopNavComponent/TopNavComponent";

function PageContent({theme,currentUser,categoryList,setCategoryList,taskList,setTaskList,reportList,setReportList}) {

    return (
    <div className="pageContentWrapper">
        <TopNavComponent currPage={"Tasks"} theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList}/>
       {categoryList!=null && <PageContentTasksComponent categoryList={categoryList} taskList={taskList} setTaskList={setTaskList} theme={theme} currentUser={currentUser} setCategoryList={setCategoryList} reportList={reportList} setReportList={setReportList}/> }
    </div>
    );
}

export default PageContent;