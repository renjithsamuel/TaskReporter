import { useState , useEffect } from 'react';
import './DashBoardTimeLineComponent.css'
import LineGraphComponent from './LineGraphComponent/LineGraphComponent';
import { getGraphData } from '../../../utils/ApiHandlers';


function DashBoardTimeLineComponent({theme,currentUser}) {

    const [graphData , setGraphData ] = useState([]);

    useEffect(()=>{
        getGraphData(currentUser._id,setGraphData);
    },[currentUser])


    return ( <>
        <div className="timeLineComponentWrapper">
            <div className="timeLineTopNav">
                <div className="timeLineTopNavLeft">
                        Tasks Done
                </div>
                <div className="timeLineTopNavRight">
                        Daily
                </div>
            </div>
            <div className="timeLineContentWrapper">
                    <LineGraphComponent theme={theme} graphData={graphData}/>
            </div>
        </div>
    </> );
}

export default DashBoardTimeLineComponent;