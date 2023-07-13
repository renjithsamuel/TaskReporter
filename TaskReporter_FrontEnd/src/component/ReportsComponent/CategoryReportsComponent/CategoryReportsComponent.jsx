import './CategoryReportsComponent.css';


function CategoryReportsComponent({theme,}) {

    const categoryReportCardElements = [
        {key : 1 ,  reportedBy : "renjithsamuel@gmail.com", reportedOn : "20-Oct-2023" ,taskCompleted : "frontEnd" ,reportStatement : "The front end of the task management application has been successfully completed. The user interface is intuitive and visually appealing, allowing users to easily navigate and interact with their tasks. The application's responsive design ensures a seamless experience across different devices."},
        {key : 2 ,  reportedBy : "balasuriya@gmail.com", reportedOn : "20-Oct-2023" , taskCompleted : "backend",reportStatement : "The front end of the task management application has been successfully completed. The user interface is intuitive and visually appealing, allowing users to easily navigate and interact with their tasks. The application's responsive design ensures a seamless experience across different devices."},
        {key : 2 ,  reportedBy : "balasuriya@gmail.com", reportedOn : "20-Oct-2023" , taskCompleted : "backend",reportStatement : "The front end of the task management application has been successfully completed. The user interface is intuitive and visually appealing, allowing users to easily navigate and interact with their tasks. The application's responsive design ensures a seamless experience across different devices."},
    ]

    return ( 
        <>
            <div className="categoryReportContentWrapper">
                {
                    categoryReportCardElements.map((categoryReportCardElement,index)=>{
                        return (<div className="categoryReportCardSingleCardElement" key={index}>
                                        <div className="categoryReportCardDetais">
                                            <div className="categoryReportCardReportedBy">
                                                <div className="categoryReportCardReportedByName">Reported By  </div>
                                               
                                                <div className="categoryReportCardReportedByNameValue">{"  " + categoryReportCardElement.reportedBy}</div>
                                            </div>
                                            <div className="categoryReportCardReportedDate">
                                                <div className="categoryReportCardReportedByDate">Reported Date  </div>
                                                <div className="categoryReportCardReportedByDateValue">{" " + categoryReportCardElement.reportedOn}</div>
                                            </div>
                                        </div>
                                        <div className="categoryReportCardStatement">
                                            <div className="categoryReportCardReportStatementFor">
                                                <div className="reportStatementForName">
                                                    Completed Task
                                                </div>
                                                <div className="reportStatementTaskName">
                                                    {categoryReportCardElement.taskCompleted}
                                                </div>
                                            </div>
                                            <div className="categoryReportCardStatementContent">
                                                {categoryReportCardElement.reportStatement}
                                            </div>
                                        </div>
                                 </div>)
                    })
                }
            </div>
        </> );
}

export default CategoryReportsComponent;