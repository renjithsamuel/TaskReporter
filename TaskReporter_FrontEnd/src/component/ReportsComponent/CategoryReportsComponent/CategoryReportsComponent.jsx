
import './CategoryReportsComponent.css';


function CategoryReportsComponent({theme,currentReports=[]}) {

    return ( 
        <>
            <div className="categoryReportContentWrapper">
                {   
                 (currentReports.length < 1 || (currentReports.length === 1 && currentReports[0] === undefined)) ? (
                             <h3>No Reports Yet</h3>
                        ) :
                    currentReports.map((categoryReportCardElement,index)=>{
                        return (<div className="categoryReportCardSingleCardElement" key={index}>
                                        <div className="categoryReportCardDetais">
                                            <div className="categoryReportCardReportedBy">
                                                <div className="categoryReportCardReportedByName">Reported By  </div>
                                               
                                                <div className="categoryReportCardReportedByNameValue">{(categoryReportCardElement && categoryReportCardElement.reportedBy && categoryReportCardElement.reportedBy.emailId)?"  " + categoryReportCardElement.reportedBy.emailId:''}</div>
                                            </div>
                                            <div className="categoryReportCardReportedDate">
                                                <div className="categoryReportCardReportedByDate">Reported Date  </div>
                                                <div className="categoryReportCardReportedByDateValue">{(categoryReportCardElement && categoryReportCardElement.reportedDate)?" " + new Date(categoryReportCardElement.reportedDate).toLocaleDateString('en-US',{day : 'numeric' , month : 'short',year : 'numeric'}) : ''}</div>
                                            </div>
                                        </div>
                                        <div className="categoryReportCardStatement">
                                            <div className="categoryReportCardReportStatementFor">
                                                <div className="reportStatementForName">
                                                    Completed Task
                                                </div>
                                                <div className="reportStatementTaskName">
                                                    {(categoryReportCardElement && categoryReportCardElement.taskCompleted && categoryReportCardElement.taskCompleted.taskName)?categoryReportCardElement.taskCompleted.taskName:''}
                                                </div>
                                            </div>
                                            <div className="categoryReportCardStatementContent">
                                                {(categoryReportCardElement && categoryReportCardElement.reportStatement)?categoryReportCardElement.reportStatement:''}
                                            </div>
                                        </div>
                                 </div>)
                    })
                }
            </div>
        </> );
}

export default CategoryReportsComponent;