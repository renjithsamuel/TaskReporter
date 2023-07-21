import React, { useEffect, useState } from 'react';
import './TaskComponent.css'
import deleteIconDark from '../../../assets/delete-dark.svg'
import deleteIconLight from '../../../assets/delete-light.svg'
import { deleteTask, patchTask } from '../../../utils/ApiHandlers';
import AddReportPopUpComponent from '../../PopUpComponents/AddReportPopUpComponent/AddReportPopUpComponent';
import RemoveReportPopUpComponent from '../../PopUpComponents/RemoveReportPopUpComponent/RemoveReportPopUpComponent';

const TaskComponent = React.memo(({theme,taskName,taskDescription,category,elem,setTaskList,taskList,addReportEffectObj,setCategoryList,setAddReportEffectObj,currentUser}) => {


    const handleTaskCompletion = ()=>{
        if(elem.completed==false){
            setAddReportEffectObj({toOpen : 'addReport',isOpen : true , success : false,categoryId:elem.category._id,taskId:elem._id,taskName:taskName,weight:elem.weight,emailId : currentUser.emailId});
        }
        else if(elem.completed==true){
            setAddReportEffectObj({toOpen : 'removeReport',isOpen : true , success : false,categoryId:elem.category._id,taskId:elem._id,taskName:taskName,weight : elem.weight,emailId : currentUser.emailId})
        }
    }


    return ( 
        <>
        <div className="taskComponent">
            <div className="topOfTaskComp" style={{textDecoration:(elem.completed)?'line-through':''}}>
                <input type="checkbox" id='taskCheckBox' onChange={()=>handleTaskCompletion()} checked={(elem.completed)? true:false}/>
                <div className="taskName" style={{textDecoration:(elem.completed)?'line-through':''}} onClick={()=>{handleTaskCompletion()}}>
                    {taskName}
                </div>
                <div className="deleteTaskIcon" style={{display : (elem.completed==true)?'none':'flex'}} onClick={()=>{deleteTask(elem._id,elem.weight,setTaskList,category._id,setCategoryList)}}>
                    <img src={(theme=='light')?deleteIconLight:deleteIconDark} alt="delete" height={30} width={30} />
                </div>
            </div>
            <div className="taskDescription" style={{textDecoration:(elem.completed)?'line-through':''}} onClick={()=>{handleTaskCompletion()}}>
                {taskDescription}
            </div>
        </div>
        </>
     );
})

export default TaskComponent;