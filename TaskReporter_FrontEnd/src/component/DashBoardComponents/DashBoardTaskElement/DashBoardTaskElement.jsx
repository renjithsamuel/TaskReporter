import './DashBoardTaskElement.css'
import playLight from '../../../assets/play-light.svg';
import playDark from '../../../assets/play-dark.svg';
import { Line } from 'rc-progress';
import { useEffect, useState } from 'react';

function DashBoardTaskElement({theme,category,setReportObject,reportObject}) {
    let tempProgress = 0;
    const [progress , setProgress] = useState();

    useEffect(()=>{

            console.log(category);
            tempProgress = Math.floor((category.weightsCompleted/category.overAllWeight)*100);
            console.log(tempProgress);
            if(tempProgress.toString()==='NaN'){
                setProgress(0);
            }else{
                setProgress(tempProgress)
            }
    },[])
    
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            left : 0,
            behavior : 'smooth'
        })
    }

    return ( <>
        <div className="dashBoardTaskElementWrapper">
            <div className="categoryDetails">
                <div className="categoryTitle">
                    {category.categoryName}
                </div>
                <div className="categoryDescription">
                    {category.description}
                </div>
            </div>
            <div className="progressIndicator">
                <div className="progressInPercent">{progress}% complete</div>
                 <div className="progressInBar">
                     <Line percent={progress} strokeWidth={4} strokeColor={'var(--text-color)'} /> 
                 </div>
            </div>
            <div className="CategoryRemainder">
                <div className="resumeButton" tabIndex={0} onClick={()=>{scrollToTop(); setReportObject((prevState)=>{return {...prevState,categoryId:category._id,isOpen:true}})}}>
                    <img src={(theme=='light')?playLight:playDark} alt="play" height={30} width={30} />
                </div>
            </div>
        </div>
    </> );
}

export default DashBoardTaskElement;