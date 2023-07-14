import { useEffect } from 'react';
import './ContributionsComponent.css';
import { Line } from 'rc-progress';

function ContributionsComponent({theme}) {
    const weightsCompleted = 50;
    const overallWeights  = 70 ; 
    let overallTasksCompleted = 0;
    const overallTasks = 7;
    const individualContributionsArr = 
                            [
                                {emailId : "balasuriya@gmail.com" , weightsCompleted : 30 , tasksCompleted : 5},
                                {emailId : "renjithsamuel@gmail.com" , weightsCompleted : 20 , tasksCompleted : 3},

                            ];
                
    useEffect(()=>{
        individualContributionsArr.map((contribution)=>{
            overallTasksCompleted += contribution.tasksCompleted;
        })
    },[])

    return ( <>
        <div className="contributionsComponentWrapper">
                <div className="overallCompletionWrapper">
                    <div className="overallCompletionName">
                            Overall Completion
                    </div>
                    <ContributionCardComponent cardName={"Overall Completion "} percentage={(weightsCompleted/overallWeights)*100} tasksCompleted={overallTasksCompleted} overallTasks={overallTasks} theme={theme}/>
                </div>
                <div className="individualContributionsWrapper">
                    <div className="individualContributionName">
                        Individual Contributions
                    </div>
                        <div className="individualContributionIndicator">
                            {
                                individualContributionsArr.map((contribution,index)=>{
                                   return <ContributionCardComponent key={index} cardName={contribution.emailId } percentage={(contribution.weightsCompleted/overallWeights)*100} tasksCompleted={contribution.tasksCompleted} overallTasks={overallTasks} theme={theme}/>
                                })
                            }
                        </div>
                </div>
        </div>
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
                            <Line percent={Math.floor(percentage)} strokeWidth={3} strokeColor={(theme=='light')?'#000000':"var(--secondary-color)"} />
                    </div>
                    <div className="contributionCardPercentName">
                        {Math.floor(percentage)}%
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
