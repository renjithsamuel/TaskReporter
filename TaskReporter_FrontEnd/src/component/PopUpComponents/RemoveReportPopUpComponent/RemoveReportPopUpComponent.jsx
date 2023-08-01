import './RemoveReportPopUpComponent.css';
import { patchTask, deleteReport , patchCategoryOnTaskCompletion , patchUserWithPoints} from '../../../utils/ApiHandlers';
import { useContext } from 'react';
import { UserContext } from '../../../App';

function RemoveReportPopUpComponent({theme,setAddReportEffectObj,setTaskList,addReportEffectObj,setCategoryList,reportList,setReportList}) {
    const {setCurrentUser , currentUser } = useContext(UserContext); 

    const handleSubmitRemoveReport = async ()=>{
        await patchCategoryOnTaskCompletion('incomplete',null,addReportEffectObj.weight,addReportEffectObj.categoryId,setCategoryList,addReportEffectObj.taskId);
        patchUserWithPoints("incomplete",addReportEffectObj.weight,currentUser,setCurrentUser);
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
                    <button className="submitRemoveReportBtn" tabIndex={0} onClick={()=>{handleSubmitRemoveReport()}}>
                        Remove Report
                    </button>
                    <button className="cancelRemoveReportBtn" tabIndex={0} onClick={()=>{setAddReportEffectObj((prev)=>{return {...prev,isOpen : false}})}}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </> );
}

export default RemoveReportPopUpComponent;