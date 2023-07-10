import './PageContentTasksComponent.css'
import TaskComponent from "../TaskComponent/TaskComponent.jsx";
import downArrowLight from '../../../assets/down-light.svg';
import downArrowDark from '../../../assets/down-dark.svg';
import addIconLight from '../../../assets/add-light.svg';
import addIconDark from '../../../assets/add-dark.svg';
import arrowRightLight from '../../../assets/arrow-right-light.svg'
import arrowRightDark from '../../../assets/arrow-right-dark.svg'
import { useEffect, useState } from 'react';
import AddTaskPopUpComponent from '../../PopUpComponents/AddTaskPopUpComponent/AddTaskPopUpComponent';
import AddCategoryPopUpComponent from '../../PopUpComponents/AddCategoryPopUpComponent/AddCategoryPopUpComponent'

function PageContentTasksComponent({taskList,categoryList,setTaskList,theme,currentUser,setCategoryList}) {
    
    const [showCompleted,setShowCompleted] = useState([]);
    const [isAddTaskPopUpOpen,setIsAddTaskPopUpOpen] = useState({isOpen : false , category : '',categoryId:''});
    const [isOpened,setIsOpened] = useState(false);

    useEffect(() => {
        setShowCompleted(Array(categoryList.length).fill(false));
        console.log("category list at page content task",categoryList);
        console.log("task list at page content task",taskList);
      }, [categoryList,taskList]);

    useEffect(()=>{
        console.log(isAddTaskPopUpOpen);
        console.log("taskList at page content task component",taskList);
    },[isAddTaskPopUpOpen])
    
      const handleSwitchCompleted = (cateindex) => {
        setShowCompleted(prevState => {
          const updatedCompleted = [...prevState];
          updatedCompleted[cateindex] = !updatedCompleted[cateindex];
          return updatedCompleted;
        });
      };
    


    return ( 
    <>  
        {(isAddTaskPopUpOpen.isOpen)?<AddTaskPopUpComponent theme={theme} setIsAddTaskPopUpOpen={setIsAddTaskPopUpOpen} category={isAddTaskPopUpOpen.category} categoryId={isAddTaskPopUpOpen.categoryId} setTaskList={setTaskList}/>:''}
        {(isOpened==true)?<AddCategoryPopUpComponent theme={theme} setIsOpened={setIsOpened} currentUser={currentUser} setCategoryList={setCategoryList}/>:''}
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
                    {categoryList.map((category ,cateindex)=>{
                            return (
                            <div className='singleCategoryWrapper' key={cateindex}>
                                    <div className="categoryTopNav">
                                            <div className="categoryName">{category.categoryName}</div>
                                            <div className="taskBottomElems">
                                                 <div className="addTaskButton" onClick={()=>{setIsAddTaskPopUpOpen({category:category.categoryName,isOpen:true,categoryId:category._id});}}>
                                                    <img src={(theme=='light')?addIconLight:addIconDark} alt="add" height={30} width={30} />
                                                </div>
                                                 <div className="goToReportPageFromTask"><img src={(theme=='light')?arrowRightLight:arrowRightDark} alt="projectView" height={30} /></div>
                                            </div>
        
                                    </div>
                                    <div className="switchCompletedOrPending">
                                        <div className="switchPending" onClick={()=>{handleSwitchCompleted(cateindex)}} style={{backgroundColor:(showCompleted[cateindex]!=true)?'var(--hover-color)':'var(--secondary-light-color)'}}>
                                            Pending
                                        </div>
                                        <div className="switchSeparator">
                                        </div>
                                        <div className="switchCompleted" onClick={()=>{handleSwitchCompleted(cateindex)}}    style={{backgroundColor:(showCompleted[cateindex]==true)?'var(--hover-color)':'var(--secondary-light-color)'}}>
                                            Completed
                                        </div>
                                    </div>
                                    <div className="tasklists">
                                    {(taskList!=null)?
                                        taskList.map((elem,index)=>{
                                            console.log(elem,"elem at page content");
                                            if(elem && elem.category && category && category.categoryName == elem.category.categoryName && ((showCompleted[cateindex]==false && elem.completed==false) || (showCompleted[cateindex]==true && elem.completed==true))){
                                            return <TaskComponent  key={elem._id} taskName={elem.taskName} taskDescription={elem.description} elem={elem} setTaskList={setTaskList} taskList={taskList} theme={theme} currentUser={currentUser}/>}
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