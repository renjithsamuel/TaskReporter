import './ChatPageContent.css'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent.jsx'
import ChatPageGroupLeft from '../../component/ChatComponents/ChatPageGroupLeft/ChatPageGroupLeft';
import ChatPageGroupContent from '../../component/ChatComponents/ChatPageGroupContent/ChatPageGroupContent';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';


function ChatPageContent({theme,currentUser,categoryList,setCategoryList}) {

    const {screenSize} = useContext(UserContext);

    const [ tempCategoryList , setTempCategoryList ] = useState([]);
    const [currentCategory , setCurrentCategory] = useState({});
    const [searchText , setSearchText ] = useState('');
    const [chatNavOpen , setChatNavOpen] = useState(false);

    useEffect(()=>{
        setTempCategoryList(categoryList);
        if(categoryList && categoryList.length > 0 && categoryList[0]._id != undefined ){
            setCurrentCategory(categoryList[0]);
        }
    },[categoryList]);




    useEffect(()=>{
        console.log(window.innerWidth);
        if(categoryList && categoryList.length > 0 && categoryList[0]._id != undefined ) {
            let tempTempCategoryList = categoryList.filter(category => category.categoryName.trim().toLowerCase().includes(searchText));
            setTempCategoryList(tempTempCategoryList);
        }

    },[searchText])

    return ( <>
        <div className="chatPageContentWrapper">
            <TopNavComponent currPage={"Chat"} theme={theme}  currentUser={currentUser} setCategoryList={setCategoryList} setSearchText={setSearchText}/>
            <div className="chatPageMainContent">
                <div className="chatPageGroupsLeft" style={{display: (chatNavOpen || screenSize.width > '600')? 'block' : 'none'}}>
                    <ChatPageGroupLeft chatNavOpen={chatNavOpen} setChatNavOpen={setChatNavOpen} categoryList={tempCategoryList} theme={theme} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}/>
                </div>
                <div className="chatPageSingleChatContent">
                    <ChatPageGroupContent theme={theme} currentUser={currentUser} currentCategory={currentCategory} chatNavOpen={chatNavOpen} setChatNavOpen={setChatNavOpen} />
                </div>
            </div>
        </div>
    </> );
}

export default ChatPageContent;