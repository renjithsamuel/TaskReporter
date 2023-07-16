import { useEffect, useState } from 'react';
import './ContributionsComponent.css';
import { Line } from 'rc-progress';

function ContributionsComponent({theme,reportObject,currentCategory}) {
    const [contributionsState , setContributionsState ] = useState({weightsCompleted : 0 , overAllWeight : 0 
                                                                , overallTasksCompleted : 0 , overallTasks : 0 
                                                                ,individualContributionsArr : [] });
    const [updatedContributionvals,setUpdatedContributionvals] = useState(false);
    // [
    //     {emailId : "balasuriya@gmail.com" , weightsCompleted : 30 , tasksCompleted : 5},
    //     {emailId : "renjithsamuel@gmail.com" , weightsCompleted : 20 , tasksCompleted : 3},
    // ];
    
    useEffect(()=>{
        console.log("current category " , currentCategory);
       if(currentCategory!=null){
            let tempContributionsState = {};
            tempContributionsState.weightsCompleted = currentCategory.weightsCompleted;
            tempContributionsState.overAllWeight  = currentCategory.overAllWeight ; 
            tempContributionsState.overallTasks = currentCategory.tasksCount;
            tempContributionsState.individualContributionsArr = currentCategory.contributions;
            setContributionsState(tempContributionsState);
            setUpdatedContributionvals(true);
       }

    },[currentCategory])

    useEffect(()=>{
       if(contributionsState && contributionsState.individualContributionsArr && contributionsState.individualContributionsArr.length > 0) {
            let tempOverAllTasksCompleted = 0;
            contributionsState.individualContributionsArr.map((contribution)=>{
                tempOverAllTasksCompleted += contribution.numberOfTasksCompleted;
            })
            setContributionsState((prevState)=>{ return {...prevState , overallTasksCompleted : tempOverAllTasksCompleted }})
       }
    },[updatedContributionvals]);

    useEffect(()=>{
        console.log(contributionsState);
    },[contributionsState])

    return ( <>
    
      {  
       (currentCategory && currentCategory._id)?
        <div className="contributionsComponentWrapper">
                <div className="overallCompletionWrapper">
                    <div className="overallCompletionName">
                            Overall Completion
                    </div>
                    <ContributionCardComponent cardName={"Overall Completion "} percentage={(contributionsState.weightsCompleted/contributionsState.overAllWeight)*100} tasksCompleted={contributionsState.overallTasksCompleted} overallTasks={contributionsState.overallTasks} theme={theme}/>
                </div>
                <div className="individualContributionsWrapper">
                    <div className="individualContributionName">
                        Individual Contributions
                    </div>
                        <div className="individualContributionIndicator">
                            {   
                                (contributionsState &&  contributionsState.individualContributionsArr && contributionsState.individualContributionsArr.length >  0 && contributionsState.individualContributionsArr[0] != null) ?
                                    contributionsState.individualContributionsArr.map((contribution,index)=>{
                                    return <ContributionCardComponent key={index} cardName={contribution.emailId } percentage={(contribution.weightContributed/contributionsState.overAllWeight)*100} tasksCompleted={contribution.numberOfTasksCompleted} overallTasks={contributionsState.overallTasks} theme={theme}/>
                                    })

                                    :

                                    <h3 style={{marginLeft:'40%'}}>No Data to Show</h3>
                            }
                        </div>
                </div>
        </div>
            : 
            <h3 style={{marginLeft:'40%'}}>No Data to Show</h3>
        }
    </> );
}

export default ContributionsComponent;



function ContributionCardComponent({theme,cardName , percentage , tasksCompleted,overallTasks  }) {


    return ( 
    <>
        <div className="contributionCardComponentWrapper">
                <div className="contributionCardName">
                        {cardName}
                </div>
                <div className="contributionCardPercentIndicator">
                    <div className="contributionCardPercentBar">
                            <Line percent={(percentage.toString()!="NaN")?Math.floor(percentage):0} strokeWidth={3} strokeColor={(theme=='light')?'#000000':"var(--secondary-color)"} />
                    </div>
                    <div className="contributionCardPercentName">
                        {(percentage.toString()!="NaN")?Math.floor(percentage):0}%
                    </div>
                </div>
                <div className="contributionCardTasksCountIndicator">
                    <div className="contributionCardTasksCountName">
                        Tasks Completed 
                    </div>
                    <div className="contributionCardTasksCountDisplay">
                        {tasksCompleted}/{overallTasks}
                    </div>
                </div>
            </div>     
    </> );
}
