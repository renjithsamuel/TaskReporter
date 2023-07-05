import './DashBoardTaskElement.css'
import playLight from '../../assets/play-light.svg';
import playDark from '../../assets/play-dark.svg';
import { Line } from 'rc-progress';
import { useState } from 'react';

function DashBoardTaskElement({theme}) {
    const [progress , setProgress] = useState(80);

    return ( <>
        <div className="dashBoardTaskElementWrapper">
            <div className="categoryDetails">
                <div className="categoryTitle">
                    Task Reporter App
                </div>
                <div className="categoryDescription">
                    Finish the project as soon and best as possible
                </div>
            </div>
            <div className="progressIndicator">
                <div className="progressInPercent">{progress}% complete</div>
                 <div className="progressInBar">
                     <Line percent={progress} strokeWidth={4} strokeColor={(theme=='light')?'#000000':"#fe8040"} /> 
                 </div>
            </div>
            <div className="CategoryRemainder">
                <div className="resumeButton">
                    <img src={(theme=='light')?playLight:playDark} alt="play" height={30} width={30} />
                </div>
            </div>
        </div>
    </> );
}

export default DashBoardTaskElement;