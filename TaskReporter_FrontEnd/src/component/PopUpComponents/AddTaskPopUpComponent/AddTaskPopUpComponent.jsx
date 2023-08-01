import './AddTaskPopUpComponent.css'
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { disableScroll, enableScroll, postTask } from '../../../utils/ApiHandlers';
import { useEffect, useState } from 'react';

function AddTaskPopUpComponent({category,categoryStartDate,categoryEndDate,theme,setIsAddTaskPopUpOpen,categoryId,setTaskList,setCategoryList}) {

    const [addTaskElementsInput,setAddTaskElementsInput ] = useState([]);
    const [addTaskObject,setAddTaskObject] = useState({category : categoryId,completed: false});
    const startDate = new Date(categoryStartDate).toISOString().split('T')[0];
    const endDate = new Date(categoryEndDate).toISOString().split('T')[0]; 
    
    useEffect(()=>{
        const newArr = [
                        {keyForDB : 'taskName',inputLabel : "Task Name : " , inputPlaceHolder : " Enter task Name " , inputType : "text",id : "taskNameInput"},
                        {keyForDB : 'description',inputLabel : "Description : " , inputPlaceHolder : " Enter Description " , inputType : "text",id:"taskDescriptionInput"},
                        {keyForDB : 'weight',inputLabel : "Weight/Importance Of Task : " , inputPlaceHolder : " Enter task Weight " , inputType : "text",id:"taskStartDateInput"},
                        {keyForDB : 'endDate',inputLabel : "End Date : " , inputPlaceHolder : " Enter task End Date " , inputType : "Date" , id:"taskEndDateInput"},
                        ];
        setAddTaskElementsInput(newArr);
    },[]);

    useEffect(()=>{
        disableScroll();
        return ()=>{enableScroll()}
    },[])



    const handleAddTaskInputChange = (keyForDB,value) => {
        let updatedAddTaskObj = {...addTaskObject}
        updatedAddTaskObj[keyForDB] = value ;
        setAddTaskObject(updatedAddTaskObj);
        // console.log(addTaskObject);
    }

    const handleSubmitAddtask = ()=>{
        if(addTaskObject.taskName == null || addTaskObject.category == null || addTaskObject.description==null || addTaskObject.endDate==null || addTaskObject.weight ==null || addTaskObject.completed == null){
            alert('send valid details!');
            console.log("send valid details!");
            return;
        }
        postTask(addTaskObject,setTaskList,setCategoryList);
        setIsAddTaskPopUpOpen(false);
    }


    return ( 
    <>
        <div className="addTaskPopUpBackDrop" >
            <div className="addTaskContentWrapper">
                <div className="titleAddTask">
                    <div className="addTaskName">
                        Add task to   {category}
                    </div>
                </div>
                {
                    addTaskElementsInput.map((elem,index)=>{
                        return (
                            <div className="addTaskInputWrapper" key={index} >
                                <div className="addTaskLabelLeft">
                                    {elem.inputLabel}
                                </div>
                                <div className="addTaskInputRight">
                                    {(elem.keyForDB=='weight')?
                                        <WeightSelector setAddTaskObject={setAddTaskObject} addTaskObject={addTaskObject}/>
                                        :
                                        (elem.keyForDB=='endDate')?
                                        <input type={elem.inputType} tabIndex={0} placeholder={elem.inputPlaceHolder}  min={startDate} id={elem.id} 
                                            max={endDate}  className='addTaskInputs' onChange={(e)=>{handleAddTaskInputChange(elem.keyForDB,e.target.value)}}/>
                                        :
                                        <input type={elem.inputType}  tabIndex={0} placeholder={elem.inputPlaceHolder} id={elem.id}  className='addTaskInputs' onChange={(e)=>{handleAddTaskInputChange(elem.keyForDB,e.target.value)}}/>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className="addTaskControlElem">
                    <button className="submitAddTaskBtn"  tabIndex={0} onClick={()=>{handleSubmitAddtask()}}>
                        Add Task
                    </button>
                    <button className="cancelAddTaskBtn"   tabIndex={0} onClick={()=>{setIsAddTaskPopUpOpen({category:category,isOpen:false})}}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </> );
}

export default AddTaskPopUpComponent;


function WeightSelector({setAddTaskObject,addTaskObject}) {

    const handleWeightChange = (weight) =>{
        setAddTaskObject((prevAddTaskObj)=>{
            const updatedAddTaskObj= {...prevAddTaskObj,weight : weight};
            return updatedAddTaskObj;
        })
    }

    return ( <>
        <div className="selectWeightWrapper">
            {
                Array.from({length : 10} , ( _ , index) => {
                 return <SelectWeightElem key={index}   handleWeightChange={handleWeightChange} num={index+1} addTaskObject={addTaskObject}/>})
            }
        </div>
    </> );
}



function SelectWeightElem({handleWeightChange,num,addTaskObject}) {

    return ( <>
        <div className="selectWeight"  tabIndex={0} onClick={()=>{handleWeightChange(num)}}
         style={{backgroundColor:(addTaskObject.weight==num)?
            'var(--secondary-light-color)':'var(--secondary-color)' ,
                borderRadius : (addTaskObject.weight==num)?'50%' : ''}}>{num}</div>   
    </> );
}