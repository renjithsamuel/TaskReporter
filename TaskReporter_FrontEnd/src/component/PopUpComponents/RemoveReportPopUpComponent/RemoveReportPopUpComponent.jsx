import './RemoveReportPopUpComponent.css';
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { patchTask, deleteReport , patchCategoryOnTaskCompletion } from '../../../utils/ApiHandlers';

function RemoveReportPopUpComponent({theme,setAddReportEffectObj,setTaskList,addReportEffectObj,setCategoryList,reportList,setReportList}) {

    const handleSubmitRemoveReport = ()=>{
        deleteReport(addReportEffectObj.taskId,setReportList);
        patchTask(addReportEffectObj.taskId,{completed : false},setTaskList);
        setAddReportEffectObj((prev)=>{return {...prev,isOpen : false,success : true}});
        console.log("atRemoveReports",'incomplete',addReportEffectObj.emailId,addReportEffectObj.weight,addReportEffectObj.categoryId);
        patchCategoryOnTaskCompletion('incomplete',addReportEffectObj.emailId,addReportEffectObj.weight,addReportEffectObj.categoryId,setCategoryList);
    }

    return ( 
     <>
        <div className="removeReportPopUpBackDrop" >
            <div className="removeReportContentWrapper">
                <div className="titleRemoveReport">
                    <div className="removeReportName">
                        {addReportEffectObj.taskName}
                    </div>
                    {/* <div className="closeRemoveReportBtn" onClick={()=>{setAddReportEffectObj((prev)=>{return {...prev,isOpen : false}})}}>
                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
                    </div> */}
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