import './RemoveReportPopUpComponent.css';

import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { patchTask, deleteReport } from '../../../utils/ApiHandlers';

function RemoveReportPopUpComponent({theme,taskName,taskId,setAddReportEffectObj,setTaskList}) {

    const handleSubmitRemoveReport = ()=>{
        deleteReport(taskId);
        patchTask(taskId,{completed : false},setTaskList);
        setAddReportEffectObj((prev)=>{return {...prev,isOpen : false,success : true}});
    }

    return ( 
    <>
        <div className="removeReportPopUpBackDrop" >
            <div className="removeReportContentWrapper">
                <div className="titleRemoveReport">
                    <div className="removeReportName">
                        {taskName}
                    </div>
                    <div className="closeRemoveReportBtn" onClick={()=>{setAddReportEffectObj((prev)=>{return {...prev,isOpen : false}})}}>
                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
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