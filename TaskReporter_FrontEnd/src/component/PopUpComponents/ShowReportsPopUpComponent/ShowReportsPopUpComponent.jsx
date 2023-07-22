import { useEffect, useState } from 'react';
import './ShowReportsPopUpComponent.css';
import CategoryDetailsComponent from '../../ReportsComponent/CategoryDetailsComponent/CategoryDetailsComponent'
import CategoryReportsComponent from '../../ReportsComponent/CategoryReportsComponent/CategoryReportsComponent'
import ContributionsComponent from '../../ReportsComponent/ContributionsComponent/ContributionsComponent'
import DeadlinesComponent from '../../ReportsComponent/DeadlinesComponent/DeadlinesComponent'
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { disableScroll, enableScroll } from '../../../utils/ApiHandlers';
import React from 'react';

const ShowReportsPopUpComponent = React.memo(({theme,defaultReportPage = 'categoryDetails',categoryList,taskList,reportList,reportObject,setIsReportObjectOpen,fromPage}) =>  {

    const [currentReportTab , setCurrentReportTab] = useState(`${defaultReportPage}`);

        useEffect(()=>{
                disableScroll();
                return ()=>{enableScroll()}
        },[])

    
//     handle category selection
    const handleCategorySelectionClick = (categoryId) =>{
        setIsReportObjectOpen((prevState)=>{ return {...prevState,categoryId : categoryId}});
    }   

    const [currentCategory , setCurrentCategory] = useState({});
    const [currentReports , setCurrentReports] = useState([]);
    const [currentTasks , setCurrentTasks] = useState([]);


    useEffect(()=>{
        let tempReportList = [];
        let tempTaskList = [];
                if(reportObject &&  reportObject.categoryId!=null){
                        categoryList.map((category)=>{
                                if( category &&  category._id ==  reportObject.categoryId){
                                    setCurrentCategory(category);
                                }
                        });
                        
                        // report list filtering
                        tempReportList = reportList.map((report)=>{
                                if(report && report.category &&  report.category._id ==  reportObject.categoryId){
                                        return report;
                                } 
                        });
                        
                        tempReportList = tempReportList.filter((elem) => elem!=undefined);

                        tempReportList = removeDuplicates(tempReportList);

                        tempReportList = tempReportList.sort((a,b) => new Date(b.reportedDate) - new Date(a.reportedDate));

                        // task list filtering
                        tempTaskList = taskList.map((task)=>{
                                if( task && task.category && task.category._id == reportObject.categoryId){
                                        return task;
                                }       
                        })

                        tempTaskList = tempTaskList.filter((elem) => elem!=undefined);

                        tempTaskList = tempTaskList.sort((a,b) => new Date(b.endDate) - new Date(a.endDate));
                        
                }
        setCurrentReports(tempReportList);
        setCurrentTasks(tempTaskList);
    },[reportObject]);


    function removeDuplicates(arr) {
        const ids = new Set();
        let newArr = [];
        for (const elem of arr) {
          if (!(elem._id && ids.has(elem._id))) {
                  ids.add(elem._id);
                   newArr.push(elem);     
                }
        }
        return newArr;
      }

    return ( <>
                    <div className="showReportContentWrapper" >
                                <div className="showReportContentLeftWrapper">
                                        <div className="showReportContentLeftName">
                                                        Categories
                                        </div>
                                        <div className="showReportContentCategoriesListSelector">
                                                {   (categoryList && categoryList.length > 0 && categoryList[0]._id!=undefined)?
                                                        categoryList.map((category,categoryIndex)=>{
                                                                return (
                                                                        <div className="showReportContentEachCategory" 
                                                                        key={categoryIndex} onClick={()=>handleCategorySelectionClick(category._id)} 
                                                                        style={{backgroundColor:(reportObject.categoryId == category._id) ? 'var(--secondary-color)':'var(--secondary-light-color)',
                                                                                 borderColor:(reportObject.categoryId == category._id)?'var(--text-color)':'transparent'}}>
                                                                                {category.categoryName}
                                                                        </div>
                                                                )
                                                        })
                                                        :
                                                        <h3>No Data</h3>
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
                                                                <CategoryDetailsComponent theme={theme} currentCategory={currentCategory}/>
                                                                : (currentReportTab=='reports')?
                                                                <CategoryReportsComponent theme={theme} reportObject={reportObject} currentReports={currentReports} />
                                        
                                                                : (currentReportTab == 'contributions')?
                                                                <ContributionsComponent theme={theme} reportObject={reportObject} currentCategory={currentCategory}/>
                                                                : (currentReportTab == 'deadlines')?
                                                                <DeadlinesComponent theme={theme} reportObject={reportObject} currentCategory={currentCategory} currentTasks={currentTasks}/>
                                                                : ''
                                                        }
                                                </div>
                                        </div>
                                </div>
                    </div>
            </> );
})

export default ShowReportsPopUpComponent;