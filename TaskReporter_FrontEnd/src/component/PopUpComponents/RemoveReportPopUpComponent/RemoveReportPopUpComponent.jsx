import './RemoveReportPopUpComponent.css';
import { patchTask, deleteReport , patchCategoryOnTaskCompletion } from '../../../utils/ApiHandlers';

function RemoveReportPopUpComponent({theme,setAddReportEffectObj,setTaskList,addReportEffectObj,setCategoryList,reportList,setReportList}) {

    const handleSubmitRemoveReport = async ()=>{
        await patchCategoryOnTaskCompletion('incomplete',null,addReportEffectObj.weight,addReportEffectObj.categoryId,setCategoryList,addReportEffectObj.taskId);
        patchTask(addReportEffectObj.taskId,{completed : false},setTaskList);
        deleteReport(addReportEffectObj.taskId,setReportList);
        setAddReportEffectObj((prev)=>{return {...prev,isOpen : false,success : true}});
        console.log("atRemoveReports",'incomplete',addReportEffectObj.emailId,addReportEffectObj.weight,addReportEffectObj.categoryId);
    }

    return ( 
     <>
        <div className="removeReportPopUpBackDrop" >
            <div className="removeReportContentWrapper">
                <div className="titleRemoveReport">
                    <div className="removeReportName">
                       Mark  "{addReportEffectObj.taskName}" as incomplete
                    </div>
                </div>
                    <div className="areYouSureToRemoveReport" >
                            Are you sure want to mark this as incomplete and remove the report associated with it?
                    </div>
                <div className="removeReportControlElem">
                    <div className="submitRemoveReportBtn" onClick={()=>{handleSubmitRemoveReport()}}>
                        Remove Report
                    </div>
                    <div className="cancelRemoveReportBtn" onClick={()=>{setAddReportEffectObj((prev)=>{return {...prev,isOpen : false}})}}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    </> );
}

export default RemoveReportPopUpComponent;