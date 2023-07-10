import { useEffect, useState } from "react";
import './PageContent.css'
import PageContentTasksComponent from "../../component/TasksPageComponents/PageContentTasksComponent/PageContentTasksComponent";
import TopNavComponent from "../../component/TopNavComponent/TopNavComponent";
import AddCategoryPopUpComponent from "../../component/PopUpComponents/AddCategoryPopUpComponent/AddCategoryPopUpComponent";
import { getCategoriesByUserId , getTasksByCategoryId } from "../../utils/ApiHandlers";

function PageContent({theme,currentUser}) {
    // tasks states
    const [categoryList,setCategoryList] = useState([]);
    const [taskList , setTaskList] = useState([]);

    useEffect(()=>{
        console.log("current user At tasks, ",currentUser);
        if(currentUser!=null){
            getCategoriesByUserId(currentUser._id , setCategoryList);
        }
    },[]);

    useEffect(()=>{
        console.log("category list at tasks" , categoryList);
        if(categoryList!=null){
            categoryList.map((category) => {
                   getTasksByCategoryId(category._id,setTaskList);
            })
        }
    },[categoryList])

    useEffect(()=>{
        if(taskList!=null){
            console.log("tasklist : " ,taskList);
        }
    },[taskList])
    
    return (
    <div className="pageContentWrapper">
        <TopNavComponent currPage={"Tasks"} theme={theme}  currentUser={currentUser}/>
        <PageContentTasksComponent categoryList={categoryList} taskList={taskList} setTaskList={setTaskList} theme={theme} currentUser={currentUser} setCategoryList={setCategoryList}/> 
        
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