import './TaskComponent.css'
import deleteIconDark from '../../../assets/delete-dark.svg'
import deleteIconLight from '../../../assets/delete-light.svg'
import { deleteTask } from '../../../utils/ApiHandlers';

const TaskComponent = ({theme,taskName,taskDescription,category,elem,setTaskList,taskList,addReportEffectObj,setCategoryList,setAddReportEffectObj,currentUser,popUpComponentTaskPage}) => {


    const handleTaskCompletion = ()=>{
        if(elem.completed==false){
            popUpComponentTaskPage.current.scrollIntoView();
            setAddReportEffectObj({toOpen : 'addReport',isOpen : true , success : false,categoryId:elem.category._id,taskId:elem._id,taskName:taskName,weight:elem.weight,emailId : currentUser.emailId});
        }
        else if(elem.completed==true){
            popUpComponentTaskPage.current.scrollIntoView();
            setAddReportEffectObj({toOpen : 'removeReport',isOpen : true , success : false,categoryId:elem.category._id,taskId:elem._id,taskName:taskName,weight : elem.weight,emailId : currentUser.emailId})
        }
    }


    return ( 
        <>
        <div className="taskComponent">
            <div className="topOfTaskComp" style={{textDecoration:(elem.completed)?'line-through':''}}>
                <input type="checkbox" id='taskCheckBox' tabIndex={0} onChange={()=>handleTaskCompletion()} checked={(elem.completed)? true:false}/>
                <div className="taskName" style={{textDecoration:(elem.completed)?'line-through':''}} onClick={()=>{handleTaskCompletion()}}>
                    {taskName}
                </div>
                <button className="deleteTaskIcon" tabIndex={0} style={{display : (elem.completed==true)?'none':'flex'}} onClick={()=>{deleteTask(elem._id,elem.weight,setTaskList,category._id,setCategoryList)}}>
                    <img src={(theme=='light')?deleteIconLight:deleteIconDark} alt="delete" height={30} width={30} />
                </button>
            </div>
            <div className="taskDescription" style={{textDecoration:(elem.completed)?'line-through':''}} onClick={()=>{handleTaskCompletion()}}>
                {taskDescription}
            </div>
        </div>
        </>
     );
}

export default TaskComponent;