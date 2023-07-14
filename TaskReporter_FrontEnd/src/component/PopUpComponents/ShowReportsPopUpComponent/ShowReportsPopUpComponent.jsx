import { useEffect, useState } from 'react';
import './ShowReportsPopUpComponent.css';
import CategoryDetailsComponent from '../../ReportsComponent/CategoryDetailsComponent/CategoryDetailsComponent'
import CategoryReportsComponent from '../../ReportsComponent/CategoryReportsComponent/CategoryReportsComponent'
import ContributionsComponent from '../../ReportsComponent/ContributionsComponent/ContributionsComponent'
import DeadlinesComponent from '../../ReportsComponent/DeadlinesComponent/DeadlinesComponent'
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'

function ShowReportsPopUpComponent({theme,defaultReportPage = 'categoryDetails',categoryList,setIsReportObjectOpen,fromPage}) {

    const [currentReportTab , setCurrentReportTab] = useState(`${defaultReportPage}`);
    const [currentSelectedCategoryId, setCurrentSelectedCategoryId] = useState(0);

    useEffect(()=>{
        if(categoryList!=null && categoryList[0] && categoryList[0]._id!=undefined){
                setCurrentSelectedCategoryId(categoryList[0]._id);
        }
    },[])
    
//     handle category selection
    const handleCategorySelectionClick = (categoryId) =>{
        setCurrentSelectedCategoryId(categoryId);
    }

    return ( <>
                    <div className="showReportContentWrapper" >
                                <div className="showReportContentLeftWrapper">
                                        <div className="showReportContentLeftName">
                                                        Categories
                                        </div>
                                        <div className="showReportContentCategoriesListSelector">
                                                {
                                                        categoryList.map((category,categoryIndex)=>{
                                                                return (
                                                                        <div className="showReportContentEachCategory" 
                                                                        key={categoryIndex} onClick={()=>handleCategorySelectionClick(category._id)} 
                                                                        style={{backgroundColor:(currentSelectedCategoryId == category._id) ? 'var(--secondary-color)':'var(--secondary-light-color)'}}>
                                                                                {category.categoryName}
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
                                                        onClick={()=>{setIsReportObjectOpen((prevState)=>{return {...prevState,isOpen:false}})}}
                                                        style={{display:(fromPage=='reportsContent')?'none':'flex'}}
                                                        >
                                                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
                                                </div>
                                        </div>
                                        <div className="reportContentWrapper">
                                                <div className="reportContentBar">
                                                        {(currentReportTab=='categoryDetails')?
                                                                <CategoryDetailsComponent theme={theme}/>
                                                                : (currentReportTab=='reports')?
                                                                <CategoryReportsComponent theme={theme}/>
                                        
                                                                : (currentReportTab == 'contributions')?
                                                                <ContributionsComponent theme={theme}/>
                                                                : (currentReportTab == 'deadlines')?
                                                                <DeadlinesComponent theme={theme}/>
                                                                : ''
                                                        }
                                                </div>
                                        </div>
                                </div>
                    </div>
            </> );
}

export default ShowReportsPopUpComponent;