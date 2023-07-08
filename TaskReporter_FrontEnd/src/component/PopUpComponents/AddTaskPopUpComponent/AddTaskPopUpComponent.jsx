import './AddTaskPopUpComponent.css'
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { useState } from 'react';

function AddTaskPopUpComponent({category,theme,setIsAddTaskPopUpOpen}) {

    const [addTaskElementsInput,setAddTaskElementsInput ] = useState([]);

    useState(()=>{
        const newArr = [
                        {inputLabel : "Task Name : " , inputPlaceHolder : " Enter task Name : " , inputType : "text",id : "taskNameInput"},
                        {inputLabel : "Description : " , inputPlaceHolder : " Enter Description : " , inputType : "text",id:"taskDescriptionInput"},
                        {inputLabel : "Weight/Importance Of Task : " , inputPlaceHolder : " Enter task Weight : " , inputType : "text",id:"taskStartDateInput"},
                        {inputLabel : "End Date : " , inputPlaceHolder : " Enter task End Date : " , inputType : "Date" , id:"taskEndDateInput"},
                        ];
        setAddTaskElementsInput (newArr);
    },[]);

    return ( 
    <>
        <div className="addTaskPopUpBackDrop" >
            <div className="addTaskContentWrapper">
                <div className="titleAddTask">
                    <div className="addTaskName">
                        {category}
                    </div>
                    <div className="closeAddTaskBtn" onClick={()=>{setIsAddTaskPopUpOpen({category:category,isOpen:false})}}>
                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
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
                                    <input type={elem.inputType} placeholder={elem.placeholder} id={elem.id}  className='addTaskInputs' />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="addTaskControlElem">
                    <div className="submitAddTaskBtn">
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