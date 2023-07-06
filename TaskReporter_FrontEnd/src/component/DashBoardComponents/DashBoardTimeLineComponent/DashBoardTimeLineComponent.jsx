import './DashBoardTimeLineComponent.css'
import LineGraphComponent from './LineGraphComponent/LineGraphComponent';

function DashBoardTimeLineComponent({}) {
    return ( <>
        <div className="timeLineComponentWrapper">
            <div className="timeLineTopNav">
                <div className="timeLineTopNavLeft">
                        Task Done
                </div>
                <div className="timeLineTopNavRight">
                    Monthly
                </div>
            </div>
            <div className="timeLineContentWrapper">
                    <LineGraphComponent />
            </div>
        </div>
    </> );
}

export default DashBoardTimeLineComponent;