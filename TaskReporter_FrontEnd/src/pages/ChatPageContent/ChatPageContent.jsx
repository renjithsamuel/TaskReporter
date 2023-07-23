import './ChatPageContent.css'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent.jsx'
import ChatPageGroupLeft from '../../component/ChatComponents/ChatPageGroupLeft/ChatPageGroupLeft';
import ChatPageGroupContent from '../../component/ChatComponents/ChatPageGroupContent/ChatPageGroupContent';
import { useEffect, useState } from 'react';


function ChatPageContent({theme,currentUser,categoryList,setCategoryList}) {

    const [ tempCategoryList , setTempCategoryList ] = useState([]);
    const [currentCategory , setCurrentCategory] = useState({});
    const [searchText , setSearchText ] = useState('');

    useEffect(()=>{
        setTempCategoryList(categoryList);
        if(categoryList && categoryList.length > 0 && categoryList[0]._id != undefined ){
            setCurrentCategory(categoryList[0]);
        }
    },[categoryList]);




    useEffect(()=>{
        console.log(searchText);
        if(categoryList && categoryList.length > 0 && categoryList[0]._id != undefined ) {
            let tempTempCategoryList = categoryList.filter(category => category.categoryName.includes(searchText));
            setTempCategoryList(tempTempCategoryList);
        }
    },[searchText])

    return ( <>
        <div className="chatPageContentWrapper">
            <TopNavComponent currPage={"Chat"} theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList} setSearchText={setSearchText}/>
            <div className="chatPageMainContent">
                <div className="chatPageGroupsLeft">
                    <ChatPageGroupLeft categoryList={tempCategoryList} theme={theme} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
                </div>
                <div className="chatPageSingleChatContent">
                    <ChatPageGroupContent theme={theme} currentUser={currentUser} currentCategory={currentCategory}/>
                </div>
            </div>
        </div>
    </> );
}

export default ChatPageContent;