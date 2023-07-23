import './ReportsPageContent.css';
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import ShowReportsPopUpComponent from '../../component/PopUpComponents/ShowReportsPopUpComponent/ShowReportsPopUpComponent';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function ReportsPageContent({theme,currentUser,categoryList,taskList,reportList}) {
        // const navigate = useNavigate();
        // const redirectToHome = () => navigate('/tasks')
        const [isReportObjectOpen,setIsReportObjectOpen ]  = useState({categoryList : categoryList , taskList:  taskList,reportList: reportList}); 
        const [ tempCategoryList , setTempCategoryList ] = useState([]);
        const [searchText , setSearchText ] = useState('');
    
    
        useEffect(()=>{
            setTempCategoryList(categoryList);
            if(categoryList && categoryList[0] && categoryList[0]._id){
                setIsReportObjectOpen((prevState) => { return {...prevState,categoryId : categoryList[0]._id} })
                }
        },[categoryList]);
    
    
        useEffect(()=>{
            console.log(searchText);
            if(categoryList && categoryList.length > 0 && categoryList[0]._id != undefined ) {
                let tempTempCategoryList = categoryList.filter(category => category.categoryName.trim().toLowerCase().includes(searchText));
                setTempCategoryList(tempTempCategoryList);
            }
        },[searchText])

    return ( <> 
                        <div className="ReportsPageWrapper">
                                <TopNavComponent currPage={"Reports"} theme={theme}  currentUser={currentUser} setSearchText={setSearchText}/>
                                <div className="reportsPageMiddleContent">
                                        <ShowReportsPopUpComponent theme={theme} defaultReportPage='categoryDetails' categoryList={tempCategoryList} reportList={reportList} taskList={taskList} fromPage={'reportsContent'} reportObject={isReportObjectOpen} setIsReportObjectOpen={setIsReportObjectOpen}/>
                                </div>
                        </div>
             </> );
}

export default ReportsPageContent;