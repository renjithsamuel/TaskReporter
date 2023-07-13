import './AddTaskPopUpComponent.css'
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { postTask } from '../../../utils/ApiHandlers';
import { useEffect, useState } from 'react';

function AddTaskPopUpComponent({category,theme,setIsAddTaskPopUpOpen,categoryId,setTaskList,setCategoryList}) {

    const [addTaskElementsInput,setAddTaskElementsInput ] = useState([]);
    const [addTaskObject,setAddTaskObject] = useState({category : categoryId,completed: false});

    useState(()=>{
        const newArr = [
                        {keyForDB : 'taskName',inputLabel : "Task Name : " , inputPlaceHolder : " Enter task Name " , inputType : "text",id : "taskNameInput"},
                        {keyForDB : 'description',inputLabel : "Description : " , inputPlaceHolder : " Enter Description " , inputType : "text",id:"taskDescriptionInput"},
                        {keyForDB : 'weight',inputLabel : "Weight/Importance Of Task : " , inputPlaceHolder : " Enter task Weight " , inputType : "text",id:"taskStartDateInput"},
                        {keyForDB : 'endDate',inputLabel : "End Date : " , inputPlaceHolder : " Enter task End Date " , inputType : "Date" , id:"taskEndDateInput"},
                        ];
        setAddTaskElementsInput(newArr);
    },[]);

    const handleAddTaskInputChange = (keyForDB,value) => {
        let updatedAddTaskObj = {...addTaskObject}
        updatedAddTaskObj[keyForDB] = value ;
        setAddTaskObject(updatedAddTaskObj);
        console.log(addTaskObject);
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

    useEffect(()=>{   console.log(addTaskObject);},[addTaskObject])

    return ( 
    <>
        <div className="addTaskPopUpBackDrop" >
            <div className="addTaskContentWrapper">
                <div className="titleAddTask">
                    <div className="addTaskName">
                        {category}
                    </div>
                    {/* <div className="closeAddTaskBtn" onClick={()=>{setIsAddTaskPopUpOpen({category:category,isOpen:false})}}>
                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
                    </div> */}
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
                                        <input type={elem.inputType} placeholder={elem.inputPlaceHolder} id={elem.id}  className='addTaskInputs' onChange={(e)=>{handleAddTaskInputChange(elem.keyForDB,e.target.value)}}/>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <div className="addTaskControlElem">
                    <div className="submitAddTaskBtn" onClick={()=>{handleSubmitAddtask()}}>
                        Add Task
                    </div>
                    <div className="cancelAddTaskBtn" onClick={()=>{setIsAddTaskPopUpOpen({category:category,isOpen:false})}}>
                        Cancel
                    </div>
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
                 return <SelectWeightElem key={index} handleWeightChange={handleWeightChange} num={index+1} addTaskObject={addTaskObject}/>})
            }
        </div>
    </> );
}



function SelectWeightElem({handleWeightChange,num,addTaskObject}) {

    return ( <>
        <div className="selectWeight" onClick={()=>{handleWeightChange(num)}}
         style={{backgroundColor:(addTaskObject.weight==num)?
            'var(--secondary-light-color)':'var(--secondary-color)' ,
                borderRadius : (addTaskObject.weight==num)?'50%' : ''}}>{num}</div>   
    </> );
}