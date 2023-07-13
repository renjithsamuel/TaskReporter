import { useState } from 'react';
import './ShowReportsPopUpComponent.css';
import CategoryDetailsComponent from '../../ReportsComponent/CategoryDetailsComponent/CategoryDetailsComponent'
import CategoryReportsComponent from '../../ReportsComponent/CategoryReportsComponent/CategoryReportsComponent'
import ContributionsComponent from '../../ReportsComponent/ContributionsComponent/ContributionsComponent'
import DeadlinesComponent from '../../ReportsComponent/DeadlinesComponent/DeadlinesComponent'
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'

function ShowReportsPopUpComponent({theme,defaultReportPage = 'categoryDetails',categoryList}) {

    const [currentReportTab , setCurrentReportTab] = useState(`${defaultReportPage}`);


    return ( <>
                    <div className="showReportContentWrapper" >
                                <div className="showReportContentLeftWrapper">
                                        <div className="showReportContentLeftName">
                                                {
                                                        categoryList.map((category,categoryIndex)=>{
                                                                return (
                                                                        <div className="showReportContentEachCategory" key={categoryIndex}>
                                                                                {category}
                                                                        </div>
                                                                )
                                                        })
                                                }
                                        </div>     
                                </div> 
                                <div className="showReportContentRightWrapper">
                                        <div className="reportTopNavWrapper">
                                                <div className="reportTopNavBar">
                                                        <div className={`reportTabSwitch ${(currentReportTab=='categoryDetails')?'activeReportNavTab':''}` } onClick={(e)=>{setCurrentReportTab('categoryDetails');}}>
                                                                Category Details
                                                        </div>
                                                        <div className={`reportTabSwitch ${(currentReportTab=='reports')?'activeReportNavTab':''}` } onClick={(e)=>{setCurrentReportTab('reports')}}>
                                                                Reports
                                                        </div>
                                                        <div className={`reportTabSwitch ${(currentReportTab=='contributions')?'activeReportNavTab':''}` } onClick={(e)=>{setCurrentReportTab('contributions')}}>
                                                                Contributions
                                                        </div>
                                                        <div className={`reportTabSwitch ${(currentReportTab=='deadlines')?'activeReportNavTab':''}` } onClick={(e)=>{setCurrentReportTab('deadlines');}}>
                                                                Deadlines
                                                        </div>
                                                </div>
                                                <div className="closeShowReportsBtn"
                                                        // onClick={()=>{setShowReportPopUpOpen(false)}}
                                                        >
                                                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
                                                </div>
                                        </div>
                                        <div className="reportContentWrapper">
                                                <div className="reportContentBar">
                                                        {(currentReportTab=='categoryDetails')?
                                                                <CategoryDetailsComponent />
                                                                : (currentReportTab=='reports')?
                                                                <CategoryReportsComponent />
                                        
                                                                : (currentReportTab == 'contributions')?
                                                                <ContributionsComponent />
                                                                : (currentReportTab == 'deadlines')?
                                                                <DeadlinesComponent />
                                                                : ''
                                                        }
                                                </div>
                                        </div>
                                </div>
                    </div>
            </> );
}

export default ShowReportsPopUpComponent;