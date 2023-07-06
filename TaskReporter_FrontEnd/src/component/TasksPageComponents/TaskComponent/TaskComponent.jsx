import { useEffect, useState } from 'react';
import './TaskComponent.css'

function TaskComponent({taskName,taskDescription,elem,setTaskList,taskList}) {
    
    const [taskCompleted , setTaskCompleted] = useState(elem.completed);

    const handleTaskCompletion = ()=>{
        console.log(taskCompleted);
        if(taskCompleted==false){
            setTaskCompleted(true);
            let tempElem = {...elem,completed:true};
            let tempTaskList =  taskList.map((task)=>{
                if(task.key!=tempElem.key){
                    return task;
                }
                else{
                    return tempElem;
                }
            })
            setTaskList(tempTaskList);
        }
        else if(taskCompleted==true){
            setTaskCompleted(false);
            let tempElem = {...elem,completed:false};
            let tempTaskList =  taskList.map((task)=>{
                if(task.key!=tempElem.key){
                    return task;
                }
                else{
                    return tempElem;
                }
            })
            setTaskList(tempTaskList);
        }
    }


    return ( 
        <div className="taskComponent" onClick={()=>{handleTaskCompletion()}}>
            <div className="topOfTaskComp" style={{textDecoration:(elem.completed)?'line-through':''}}>
                <input type="checkbox" onChange={()=>handleTaskCompletion()} checked={(elem.completed)? true:false}/>
                <div className="taskName" style={{textDecoration:(elem.completed)?'line-through':''}}>
                    {taskName}
                </div>
            </div>
            <div className="taskDescription" style={{textDecoration:(elem.completed)?'line-through':''}}>
                <ul>
                    <li>{taskDescription}</li>
                </ul>
            </div>
        </div>
     );
}

export default TaskComponent;