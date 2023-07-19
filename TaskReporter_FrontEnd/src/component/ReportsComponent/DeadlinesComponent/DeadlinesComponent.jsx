import { useEffect } from 'react';
import './DeadlinesComponent.css';

function DeadlinesComponent({theme,currentCategory,currentTasks}) {
                        
    useEffect(()=>{
            console.log("deadline", currentCategory );
            console.log(currentTasks.some((elem)=>elem.completed==false));
    },[])

    return ( <>
               {
            (currentCategory && currentCategory._id)?
                <div className="deadlinesComponentWrapper">
                    <div className="overallDeadlineWrapper">
                        <div className="overallDeadlineName">
                            Overall Deadline 
                        </div>
                        <div className="overallDeadlineCard">
                            {
                            (currentCategory)?
                                <DeadlineSingleCardComponent  taskName={currentCategory.categoryName} endDate={currentCategory.endDate} daysMore={calculateRemainingDays(currentCategory.endDate)}/>
                                :
                                <h3 style={{marginLeft:'40%'}}>No Data</h3>
                            } 
                        </div>
                    </div>
                    <div className="tasksDeadlinesWrapper">
                        <div className="tasksDeadlineName">
                            Tasks Deadline
                        </div>
                        <div className="tasksDeadlineCardsWrapper">
                            {   (currentTasks && currentTasks.length > 0 && (currentTasks.some((elem)=>elem.completed!=true)))?
                                currentTasks.map((deadlineElement,index)=>{
                                    if(deadlineElement.completed == false){
                                             return <DeadlineSingleCardComponent key={index} taskName={deadlineElement.taskName} endDate={deadlineElement.endDate}  daysMore={calculateRemainingDays(deadlineElement.endDate)}/>
                                    }
                                })
                                :<h3 style={{marginLeft:'35%'}}>No Incomplete Tasks</h3>
                            }
                        </div>
                    </div>
                </div>
                : 
                <h3 style={{marginLeft:'40%'}}>No Data to Show</h3>
                
                }
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