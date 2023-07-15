import { useEffect, useState } from "react";
import './PageContent.css'
import PageContentTasksComponent from "../../component/TasksPageComponents/PageContentTasksComponent/PageContentTasksComponent";
import TopNavComponent from "../../component/TopNavComponent/TopNavComponent";
import AddCategoryPopUpComponent from "../../component/PopUpComponents/AddCategoryPopUpComponent/AddCategoryPopUpComponent";
import { getCategoriesByUserId , getTasksByCategoryId } from "../../utils/ApiHandlers";

function PageContent({theme,currentUser,categoryList,setCategoryList,taskList,setTaskList,reportList,setReportList}) {
    useEffect(()=>{
        console.log("categories list at page content final : ");
    },[categoryList])
    
    return (
    <div className="pageContentWrapper">
        <TopNavComponent currPage={"Tasks"} theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList}/>
       {categoryList!=null && <PageContentTasksComponent categoryList={categoryList} taskList={taskList} setTaskList={setTaskList} theme={theme} currentUser={currentUser} setCategoryList={setCategoryList} reportList={reportList} setReportList={setReportList}/> }
    </div>
    );
}

export default PageContent;




    // ["Task Reporter","Placement"]
    // [
    //     {key : 0,taskName  : "Front End", TaskDescription : "Finish the front end" , category : "Task Reporter" ,completed : false},
    //     {key: 1,taskName  : "Back End", TaskDescription : "Complete the back end" ,category : "Task Reporter" ,completed : false},
    //     {key : 2,taskName  : "Aptitude", TaskDescription : "Learn aptitude through india bix!" , category : "Placement" , completed : false},
    //     {key : 3 , taskName  : "Algorithms", TaskDescription : "learn the most important algorithms!" ,category : "Placement", completed : false},
    // ] 