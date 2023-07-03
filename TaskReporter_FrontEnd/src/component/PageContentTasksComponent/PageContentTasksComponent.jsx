import './PageContentTasksComponent.css'
import TaskComponent from "../TaskComponent/TaskComponent.jsx";
import downArrowLight from '../../assets/down-light.svg';
import downArrowDark from '../../assets/down-dark.svg';
import { useEffect, useState } from 'react';

function PageContentTasksComponent({taskList,categoryList,setTaskList,theme}) {

    useEffect(()=>{
        console.log("task list : ",taskList);
    },[taskList])



    return ( 
    <div className="PageContentTaskWrapper">
            <div className="projectContentTop">
                <div className="projectContentName">
                        Projects
                </div>
                <div className="sortByTime">
                    This week <img src={(theme=='light')?downArrowLight:downArrowDark} alt="^" height={30} width={30} id='downArrow' />
                </div>
            </div>
            <div className="tasksCategoryWise">
                {categoryList.map((category ,cateindex)=>{
                
                        return (<div className='singleCategoryWrapper' key={cateindex}> 
                                <div className="categoryName">{category}</div>
                            <div className="tasklists">
                            {
                                taskList.map((elem,index)=>{
                                    if(category == elem.category){
                                    return <TaskComponent  key={elem.key} taskName={elem.taskName} taskDescription={elem.TaskDescription} elem={elem} setTaskList={setTaskList} taskList={taskList}/>}
                                })
                            }
                            </div>
                        </div>)
                        }
                    )
                }
            </div>
            
        
    </div> 
    );
}

export default PageContentTasksComponent;