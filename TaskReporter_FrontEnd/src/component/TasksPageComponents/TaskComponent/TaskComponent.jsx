import { useEffect, useState } from 'react';
import './TaskComponent.css'
import { patchTask } from '../../../utils/ApiHandlers';
import AddReportPopUpComponent from '../../PopUpComponents/AddReportPopUpComponent/AddReportPopUpComponent';
import RemoveReportPopUpComponent from '../../PopUpComponents/RemoveReportPopUpComponent/RemoveReportPopUpComponent';

function TaskComponent({taskName,taskDescription,elem,setTaskList,taskList,addReportEffectObj,setAddReportEffectObj,currentUser}) {
    // const [taskCompleted , setTaskCompleted] = useState(elem.completed);
    // useEffect(()=>{
    //     console.log(addReportEffectObj);
    //     if(addReportEffectObj.toOpen == 'addReport' && addReportEffectObj.success==true){
    //         setTaskCompleted(true);
    //         // let tempElem = {...elem,completed:true};
    //         // let tempTaskList =  taskList.map((task)=>{
    //         //     if(task._id!=tempElem._id){
    //         //         return task;
    //         //     }
    //         //     else{
    //         //         return tempElem;
    //         //     }
    //         // })
    //         // console.log("temptask elem" , tempTaskList);
    //         // setTaskList(tempTaskList);
    //     }else if(addReportEffectObj.toOpen == 'removeReport' && addReportEffectObj.success==true){
    //         setTaskCompleted(false);
    //         // let tempElem = {...elem,completed:false};
    //         // let tempTaskList =  taskList.map((task)=>{
    //         //     if(task._id!=tempElem._id){
    //         //         return task;
    //         //     }
    //         //     else{
    //         //         return tempElem;
    //         //     }
    //         // });
    //         // setTaskList(tempTaskList);
    //     }
    // },[addReportEffectObj])

    const handleTaskCompletion = ()=>{
        console.log(elem , "taks component");
        if(elem.completed==false){
            setAddReportEffectObj({toOpen : 'addReport',isOpen : true , success : false,categoryId:elem.category._id,taskId:elem._id,taskName:taskName,weight:elem.weight,emailId : currentUser.emailId});
            // patchTask(elem._id,{completed : true},setTaskList);
        }
        else if(elem.completed==true){
            setAddReportEffectObj({toOpen : 'removeReport',isOpen : true , success : false,categoryId:elem.category._id,taskId:elem._id,taskName:taskName,weight : elem.weight,emailId : currentUser.emailId})
            // patchTask(elem._id,{completed : false},setTaskList);
        }
    }


    return ( 
        <>
        <div className="taskComponent" onClick={()=>{handleTaskCompletion()}}>
            <div className="topOfTaskComp" style={{textDecoration:(elem.completed)?'line-through':''}}>
                <input type="checkbox" onChange={()=>handleTaskCompletion()} checked={(elem.completed)? true:false}/>
                <div className="taskName" style={{textDecoration:(elem.completed)?'line-through':''}}>
                    {taskName}
                </div>
            </div>
            <div className="taskDescription" style={{textDecoration:(elem.completed)?'line-through':''}}>
                {taskDescription}
            </div>
        </div>
        </>
     );
}

export default TaskComponent;