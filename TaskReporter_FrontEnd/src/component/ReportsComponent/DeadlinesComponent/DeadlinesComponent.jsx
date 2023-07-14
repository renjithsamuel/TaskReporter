import './DeadlinesComponent.css';

function DeadlinesComponent({theme}) {

    const overAllDeadline = {taskName : "Task reporter" , endDate  : "04-Sep-2023"};

    const deadlineArray = [
                            {taskName  : "frontEnd" , endDate : '03-Oct-2023'},
                            {taskName  : "BackEnd" , endDate : '03-Nov-2023'}
                        ];
                        
    return ( <>
                <div className="deadlinesComponentWrapper">
                    <div className="overallDeadlineWrapper">
                        <div className="overallDeadlineName">
                            Overall Deadline 
                        </div>
                        <div className="overallDeadlineCard">
                                <DeadlineSingleCardComponent  taskName={overAllDeadline.taskName} endDate={overAllDeadline.endDate} daysMore={calculateRemainingDays(overAllDeadline.endDate)}/>
                        </div>
                    </div>
                    <div className="tasksDeadlinesWrapper">
                        <div className="tasksDeadlineName">
                            Tasks Deadline
                        </div>
                        <div className="tasksDeadlineCardsWrapper">
                            {
                                deadlineArray.map((deadlineElement,index)=>{
                                    return <DeadlineSingleCardComponent key={index} taskName={deadlineElement.taskName} endDate={deadlineElement.endDate}  daysMore={calculateRemainingDays(deadlineElement.endDate)}/>
                                })
                            }
                        </div>
                    </div>
                </div>
        </> );
}

export default DeadlinesComponent;


function DeadlineSingleCardComponent({taskName,endDate,daysMore}) {
    let daysMoreDisplay;
    if (daysMore < 0) {
      daysMoreDisplay = 'Expired';
    } else {
      daysMoreDisplay = `${daysMore} ${daysMore === 1 ? 'day' : 'days'} remaining`;
    }
    
    return ( 
    <>
        <div className="deadlineSingleCardComponentWrapper">
            <div className="deadlineTaskName">
                    {taskName}
            </div>
            <div className="deadlineEndDate">
                    {endDate}
            </div>
            <div className="deadlineDaysMore">
                    {daysMoreDisplay}
            </div>
        </div>
    </> );
}


function calculateRemainingDays(endDate) {
    const end = new Date(endDate);
    const today = new Date();
    const timeDifference = end.getTime() - today.getTime();
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return remainingDays;
  }