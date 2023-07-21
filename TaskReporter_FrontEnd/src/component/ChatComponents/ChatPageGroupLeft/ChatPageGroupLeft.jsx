import './ChatPageGroupLeft.css'
import groupIconLight from '../../../assets/group-light.svg'
import groupIconDark from '../../../assets/group-dark.svg'

function chatPageGroupLeft({categoryList,setCurrentCategory,currentCategory,theme}) {




    return (
    <>
        <div className="chatPageGroupLeftWrapper">
            <div className="chatTitle">Chats</div>
            <div className="chatPageSingleGroupsWrapper">
                    {(categoryList && categoryList.length > 0 &&  categoryList[0]._id!=undefined)?    
                    categoryList.map((category,index)=>{
                        return <SingleGroup key={index}  theme={theme} category={category} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory}/> 
                    })
                    :
                    <h3> No Chats</h3> 
                    }    
            </div>
        </div>
    </> );
}

export default chatPageGroupLeft;


function SingleGroup({category,setCurrentCategory,currentCategory,theme}) {
    return ( 
    <>  
        <div className="singleGroupWrapper" onClick={()=>{setCurrentCategory(category)}}   style={{backgroundColor:(currentCategory._id == category._id) ? 'var(--secondary-color)':'var(--secondary-light-color)',
                                                                                 borderColor:(currentCategory._id == category._id)?'var(--text-color)':'transparent'}}>
            <div className="groupPictureLeft">
                <img src={(theme=='light')?groupIconLight : groupIconDark } alt="group" height={30} width={30}/>
            </div>
            <div className="groupNameRight">
                {(category && category._id)? category.categoryName : 'error'}
            </div>
        </div>  
    </> );
}
