import { useEffect, useState } from "react";
import './PageContent.css'
import PageContentTasksComponent from "../../component/PageContentTasksComponent/PageContentTasksComponent";
import TopNavComponent from "../../component/TopNavComponent/TopNavComponent";

function PageContent({theme}) {


    const [categoryList,setCategoryList] = useState(["My Tasks","Office","completed"]);
    const [taskList , setTaskList] = useState([
        {key : 0,taskName  : "Design", TaskDescription : "We need 2 different design concepts!" , category : "My Tasks" , prevCategory:'My Tasks',completed : false},
        {key: 1,taskName  : "Design2", TaskDescription : "We need 4 different design concepts!" ,category : "My Tasks" , prevCategory:'My Tasks', completed : false},
        {key : 2,taskName  : "Design", TaskDescription : "We need 2 different design concepts!" , category : "Office" , prevCategory:'Office', completed : false},
        {key : 3 , taskName  : "Design2", TaskDescription : "We need 4 different design concepts!" ,category : "Office", prevCategory:'Office' , completed : false},
    ]); 

    
    return (
    <div className="pageContentWrapper">
        <TopNavComponent currPage={"Tasks"} theme={theme}/>
        <PageContentTasksComponent categoryList={categoryList} taskList={taskList} setTaskList={setTaskList}/> 
        <div className="taskAddButton">
                    <lord-icon
                    src="https://cdn.lordicon.com/ynwbvguu.json"
                    trigger="hover"
                    colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                    style={{width:30,height:30  }}
                    >
                </lord-icon>
            </div>
    </div>
    );
}

export default PageContent;