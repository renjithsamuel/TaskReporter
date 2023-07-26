import './AddReportPopUpComponent.css';
import { patchTask, postReport ,patchCategoryOnTaskCompletion, enableScroll, disableScroll ,patchUserWithPoints } from '../../../utils/ApiHandlers';
import { useEffect, useState } from 'react';
import {UserContext} from '../../../App'
import { useContext } from 'react';

function AddReportPopUpComponent({theme,currentUser,setAddReportEffectObj,setTaskList,addReportEffectObj,setCategoryList,reportList,setReportList}) {

    const [addReportElementsInput,setAddReportElementsInput ] = useState([]);
    const [addReportObject,setAddReportObject] = useState({category : addReportEffectObj.categoryId,taskCompleted: addReportEffectObj.taskId,reportedBy : currentUser._id,reportedDate : new Date()});
    const {setCurrentUser} = useContext(UserContext);

    useEffect(()=>{
        const newArr = [
                        {keyForDB : 'reportStatement',inputLabel : "Report Statement : " , inputPlaceHolder : " Type Report  " , inputType : "textarea",id : "reportStatementId"},
                        ];
        setAddReportElementsInput(newArr);
    },[]);

    useEffect(()=>{
        disableScroll();
        return ()=>{enableScroll()}
    },[])


    const handleAddReportInputChange = (keyForDB,value) => {
        let updatedAddReportObj = {...addReportObject}
        updatedAddReportObj[keyForDB] = value ;
        setAddReportObject(updatedAddReportObj);
    }

    const handleSubmitAddReport = ()=>{
        if(addReportObject.category == null || addReportObject.taskCompleted == null || addReportObject.reportedBy==null || addReportObject.reportedDate==null || addReportObject.reportStatement ==null){
            alert('send valid details!');
            console.log("send valid details!");
            return;
        }
        postReport(addReportObject,setReportList);
        patchUserWithPoints("complete",addReportEffectObj.weight,currentUser,setCurrentUser);
        patchTask(addReportEffectObj.taskId,{completed : true},setTaskList);
        patchCategoryOnTaskCompletion('completed',currentUser.emailId,addReportEffectObj.weight,addReportEffectObj.categoryId,setCategoryList);
        setAddReportEffectObj((prev)=>{return {...prev,isOpen : false,success : true}});
    }

    return ( 
    <>
        <div className="addReportPopUpBackDrop" >
            <div className="addReportContentWrapper">
                <div className="titleAddReport">
                    <div className="addReportName">
                        Mark "{addReportEffectObj.taskName}" as complete
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