import { useEffect, useState } from "react";
import './PageContent.css'
import PageContentTasksComponent from "../../component/TasksPageComponents/PageContentTasksComponent/PageContentTasksComponent";
import TopNavComponent from "../../component/TopNavComponent/TopNavComponent";
import AddCategoryPopUpComponent from "../../component/PopUpComponents/AddCategoryPopUpComponent/AddCategoryPopUpComponent";


function PageContent({theme}) {
    const [categoryList,setCategoryList] = useState(["Task Reporter","Placement"]);
    const [taskList , setTaskList] = useState([
        {key : 0,taskName  : "Front End", TaskDescription : "Finish the front end" , category : "Task Reporter" ,completed : false},
        {key: 1,taskName  : "Back End", TaskDescription : "Complete the back end" ,category : "Task Reporter" ,completed : false},
        {key : 2,taskName  : "Aptitude", TaskDescription : "Learn aptitude through india bix!" , category : "Placement" , completed : false},
        {key : 3 , taskName  : "Algorithms", TaskDescription : "learn the most important algorithms!" ,category : "Placement", completed : false},
    ]); 

    
    return (
    <div className="pageContentWrapper">
        <TopNavComponent currPage={"Tasks"} theme={theme}/>
        <PageContentTasksComponent categoryList={categoryList} taskList={taskList} setTaskList={setTaskList} theme={theme}/> 
        <AddCategoryPopUpComponent theme={theme}/>
    </div>
    );
}

export default PageContent;



