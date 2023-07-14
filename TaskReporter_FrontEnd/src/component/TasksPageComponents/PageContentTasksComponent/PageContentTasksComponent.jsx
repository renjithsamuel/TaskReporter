import './PageContentTasksComponent.css'
import TaskComponent from "../TaskComponent/TaskComponent.jsx";
import addIconLight from '../../../assets/add-light.svg';
import addIconDark from '../../../assets/add-dark.svg';
import arrowRightLight from '../../../assets/arrow-right-light.svg'
import arrowRightDark from '../../../assets/arrow-right-dark.svg'
import { useEffect, useState } from 'react';
import AddTaskPopUpComponent from '../../PopUpComponents/AddTaskPopUpComponent/AddTaskPopUpComponent';
import AddCategoryPopUpComponent from '../../PopUpComponents/AddCategoryPopUpComponent/AddCategoryPopUpComponent'
import RemoveReportPopUpComponent from '../../PopUpComponents/RemoveReportPopUpComponent/RemoveReportPopUpComponent';
import AddReportPopUpComponent from '../../PopUpComponents/AddReportPopUpComponent/AddReportPopUpComponent';
import ShowReportsPopUpComponent from '../../PopUpComponents/ShowReportsPopUpComponent/ShowReportsPopUpComponent';

function PageContentTasksComponent({taskList,categoryList,setTaskList,theme,currentUser,setCategoryList}) {
    
    const [showCompleted,setShowCompleted] = useState([]);
    const [isAddTaskPopUpOpen,setIsAddTaskPopUpOpen] = useState({isOpen : false , category : '',categoryId:''});
    const [isOpened,setIsOpened] = useState(false);
    const [addReportEffectObj , setAddReportEffectObj ] = useState({toOpen : '', isOpen : false,success : false,categoryId : null  , taskId : '' ,taskName : '',weight : 0,emailId : '' });
    const [addShowReportsComponent,setAddShowReportsComponent] = useState({isOpen : false , category : '',categoryId:''});

    useEffect(() => {
        setShowCompleted(Array(categoryList.length).fill(false));
        console.log("category list at page content task",categoryList);
      }, [categoryList]);

    useEffect(()=>{
        console.log(isAddTaskPopUpOpen);
        console.log("taskList at page content task component",taskList);
    },[isAddTaskPopUpOpen])

    useEffect(()=>{
        console.log("task list at page content task",taskList);

    },[taskList]);
    
      const handleSwitchCompleted = (status,cateindex) => {
        setShowCompleted(prevState => {
          const updatedCompleted = [...prevState];
          updatedCompleted[cateindex] = (status=='completed')?true:false;
          return updatedCompleted;
        });
      };
    


    return ( 
    <>  
        <div className="popUpTasksPage">
            {(isAddTaskPopUpOpen.isOpen)?<AddTaskPopUpComponent theme={theme} setIsAddTaskPopUpOpen={setIsAddTaskPopUpOpen} category={isAddTaskPopUpOpen.category} categoryId={isAddTaskPopUpOpen.categoryId} setTaskList={setTaskList} setCategoryList={setCategoryList}/>:''}
            {(isOpened==true)?<AddCategoryPopUpComponent theme={theme} setIsOpened={setIsOpened} currentUser={currentUser} setCategoryList={setCategoryList}/>:''}
            {(addReportEffectObj.toOpen=='addReport' && addReportEffectObj.isOpen == true)?<AddReportPopUpComponent  currentUser={currentUser} setAddReportEffectObj={setAddReportEffectObj} addReportEffectObj={addReportEffectObj} theme={theme} setTaskList={setTaskList} setCategoryList={setCategoryList}/>:''}
            {(addReportEffectObj.toOpen=='removeReport' && addReportEffectObj.isOpen == true)?<RemoveReportPopUpComponent setAddReportEffectObj={setAddReportEffectObj} addReportEffectObj={addReportEffectObj} theme={theme} setTaskList={setTaskList} setCategoryList={setCategoryList}/>:''}
            {(addShowReportsComponent.isOpen==true)?<div className='showReportsPopUpBackDrop'><ShowReportsPopUpComponent theme={theme} defaultReportPage='categoryDetails' categoryList={categoryList} setIsReportObjectOpen={setAddShowReportsComponent} reportObject={addShowReportsComponent}/></div>:''}
        </div>
        <div className="PageContentTaskWrapper">
                <div className="projectContentTop">
                    <div className="projectContentName">
                            Projects
                    </div>
                    <div className="sortByTime">
                        <div className="taskAddButton" onClick={()=>{setIsOpened(true)}}>
                                <div className="AddCategoryName">
                                    Add Category
                                </div>
                                <lord-icon
                                    src="https://cdn.lordicon.com/ynwbvguu.json"
                                    trigger="hover"
                                    colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                                    style={{width:30,height:30  }}
                                    >
                                </lord-icon>
                        </div>
                    </div>
                </div>
                <div className="tasksCategoryWise">
                    {(categoryList && categoryList.length>0)?'':(<div style={{width:'100%',height:'100%'}}><h1 style={{display:'flex',justifyContent:'center',alignItems:'center'}}>No Categories</h1></div>)}
                    {categoryList.map((category ,cateindex)=>{
                            return (
                            <div className='singleCategoryWrapper' key={cateindex}>
                                    <div className="categoryTopNav">
                                            <div className="categoryName">{category.categoryName}</div>
                                            <div className="taskBottomElems">
                                                 <div className="addTaskButton" onClick={()=>{setIsAddTaskPopUpOpen({category:category.categoryName,isOpen:true,categoryId:category._id});}}>
                                                    <img src={(theme=='light')?addIconLight:addIconDark} alt="add" height={30} width={30} />
                                                </div>
                                                 <div className="goToReportPageFromTask" onClick={()=>{setAddShowReportsComponent((prevState)=>{return {...prevState,isOpen:true,categoryId:category._id}})}} >
                                                    <img src={(theme=='light')?arrowRightLight:arrowRightDark} alt="projectView" height={30} /></div>
                                            </div>
        
                                    </div>
                                    <div className="switchCompletedOrPending">
                                        <div className="switchPending" onClick={()=>{handleSwitchCompleted('pending',cateindex)}} style={{backgroundColor:(showCompleted[cateindex]!=true)?'var(--hover-color)':'var(--secondary-light-color)'}}>
                                            Pending
                                        </div>
                                        <div className="switchSeparator">
                                        </div>
                                        <div className="switchCompleted" onClick={()=>{handleSwitchCompleted('completed',cateindex)}}    style={{backgroundColor:(showCompleted[cateindex]==true)?'var(--hover-color)':'var(--secondary-light-color)'}}>
                                            Completed
                                        </div>
                                    </div>
                                    <div className="tasklists">
                                    {taskList.some(elem => elem.category && elem.category.categoryName === category.categoryName) ? '' : (<h3>No Tasks</h3>) }
                                    {   
                                        (taskList && (Array.isArray(taskList) && taskList.length > 0))?
                                            taskList.map((elem)=>{
                                                if(elem && elem.category && category && category.categoryName == elem.category.categoryName && ((showCompleted[cateindex]==false && elem.completed==false) || (showCompleted[cateindex]==true && elem.completed==true))){
                                                return <TaskComponent  key={elem._id}
                                                            taskName={elem.taskName}
                                                            taskDescription={elem.description}
                                                            elem={elem} setTaskList={setTaskList}
                                                                taskList={taskList} theme={theme}
                                                                currentUser={currentUser} 
                                                                addReportEffectObj={addReportEffectObj} 
                                                                setAddReportEffectObj={setAddReportEffectObj}/>}
                                            })
                                            :
                                            ''
                                    }
                                    </div>
                            </div>)
                            }
                        )
                    }
                </div>
        
        
        </div>
    </>
    );
}

export default PageContentTasksComponent;