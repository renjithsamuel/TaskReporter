import './ChatPageContent.css'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent.jsx'
import ChatPageGroupLeft from '../../component/ChatComponents/ChatPageGroupLeft/ChatPageGroupLeft';
import ChatPageGroupContent from '../../component/ChatComponents/ChatPageGroupContent/ChatPageGroupContent';


function ChatPageContent({theme}) {
    return ( <>
        <div className="chatPageContentWrapper">
            <TopNavComponent currPage={"Chat"} theme={theme}/>
            <div className="chatPageMainContent">
                <div className="chatPageGroupsLeft">
                    <ChatPageGroupLeft/>
                </div>
                <div className="chatPageSingleChatContent">
                    <ChatPageGroupContent theme={theme} />
                </div>
            </div>
        </div>
    </> );
}

export default ChatPageContent;