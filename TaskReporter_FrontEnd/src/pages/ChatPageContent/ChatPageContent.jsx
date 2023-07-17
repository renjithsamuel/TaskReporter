import './ChatPageContent.css'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent.jsx'
import ChatPageGroupLeft from '../../component/ChatComponents/ChatPageGroupLeft/ChatPageGroupLeft';
import ChatPageGroupContent from '../../component/ChatComponents/ChatPageGroupContent/ChatPageGroupContent';
import { useEffect, useState } from 'react';


function ChatPageContent({theme,currentUser,categoryList,setCategoryList}) {

    const [currentCategory , setCurrentCategory] = useState({});

    useEffect(()=>{
        console.log("current category for chat ", currentCategory);
    },[currentCategory])


    useEffect(()=>{
        if(categoryList && categoryList.length > 0 && categoryList[0]._id != undefined ){
            setCurrentCategory(categoryList[0]);
        }
    },[categoryList])

    return ( <>
        <div className="chatPageContentWrapper">
            <TopNavComponent currPage={"Chat"} theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList} />
            <div className="chatPageMainContent">
                <div className="chatPageGroupsLeft">
                    <ChatPageGroupLeft categoryList={categoryList} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
                </div>
                <div className="chatPageSingleChatContent">
                    <ChatPageGroupContent theme={theme} currentUser={currentUser} currentCategory={currentCategory}/>
                </div>
            </div>
        </div>
    </> );
}

export default ChatPageContent;