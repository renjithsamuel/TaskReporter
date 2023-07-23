import './PageContent.css'
import PageContentTasksComponent from "../../component/TasksPageComponents/PageContentTasksComponent/PageContentTasksComponent";
import TopNavComponent from "../../component/TopNavComponent/TopNavComponent";
import { useState , useEffect } from 'react';

function PageContent({theme,currentUser,categoryList,setCategoryList,taskList,setTaskList,reportList,setReportList}) {
    const [ tempCategoryList , setTempCategoryList ] = useState([]);
    const [searchText , setSearchText ] = useState('');


    useEffect(()=>{
        setTempCategoryList(categoryList);
    },[categoryList]);


    useEffect(()=>{
        console.log(searchText);
        if(categoryList && categoryList.length > 0 && categoryList[0]._id != undefined ) {
            let tempTempCategoryList = categoryList.filter(category => category.categoryName.includes(searchText));
            setTempCategoryList(tempTempCategoryList);
        }
    },[searchText])

    return (
    <div className="pageContentWrapper">
        <TopNavComponent currPage={"Tasks"} theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList} setSearchText={setSearchText}/>
       {tempCategoryList!=null && <PageContentTasksComponent categoryList={tempCategoryList} taskList={taskList} setTaskList={setTaskList} theme={theme} currentUser={currentUser} setCategoryList={setCategoryList} reportList={reportList} setReportList={setReportList}/> }
    </div>
    );
}

export default PageContent;