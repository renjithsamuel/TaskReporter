import './AddReportPopUpComponent.css';
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { patchTask, postReport } from '../../../utils/ApiHandlers';
import { useState } from 'react';

function AddReportPopUpComponent({theme,categoryId,currentUser,taskId,taskName,setAddReportEffectObj,setTaskList}) {

    const [addReportElementsInput,setAddReportElementsInput ] = useState([]);
    const [addReportObject,setAddReportObject] = useState({category : categoryId,taskCompleted: taskId,reportedBy : currentUser._id,reportedDate : new Date()});

    useState(()=>{
        const newArr = [
                        {keyForDB : 'reportStatement',inputLabel : "Report Statement : " , inputPlaceHolder : " Type Report  " , inputType : "textarea",id : "reportStatementId"},
                        ];
        setAddReportElementsInput(newArr);
    },[]);

    const handleAddReportInputChange = (keyForDB,value) => {
        let updatedAddReportObj = {...addReportObject}
        updatedAddReportObj[keyForDB] = value ;
        setAddReportObject(updatedAddReportObj);
        console.log(addReportObject);
    }

    const handleSubmitAddReport = ()=>{
        postReport(addReportObject);
        patchTask(taskId,{completed : true},setTaskList);
        setAddReportEffectObj((prev)=>{return {...prev,isOpen : false,success : true}});
    }

    return ( 
    <>
        <div className="addReportPopUpBackDrop" >
            <div className="addReportContentWrapper">
                <div className="titleAddReport">
                    <div className="addReportName">
                        {taskName}
                    </div>
                    <div className="closeAddReportBtn" onClick={()=>{setAddReportEffectObj((prev)=>{return {...prev,isOpen : false}})}}>
                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
                    </div>
                </div>
                {
                    addReportElementsInput.map((elem,index)=>{
                        return (
                            <div className="addReportInputWrapper" key={index} >
                                <div className="addReportLabelLeft">
                                    {elem.inputLabel}
                                </div>
                                <div className="addReportInputRight">
                                    <textarea type={elem.inputType} placeholder={elem.placeholder} id={elem.id}  className='addReportInputs' onChange={(e)=>{handleAddReportInputChange(elem.keyForDB,e.target.value)}}/>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="addReportControlElem">
                    <div className="submitAddReportBtn" onClick={()=>{handleSubmitAddReport()}}>
                        Add Report
                    </div>
                    <div className="cancelAddReportBtn" onClick={()=>{setAddReportEffectObj((prev)=>{return {...prev,isOpen : false}})}}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default AddReportPopUpComponent;