import './ChatPageContent.css'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent.jsx'

function ChatPageContent({theme}) {
    return ( <>
        <TopNavComponent currPage={"Chat"} theme={theme}/>
    </> );
}

export default ChatPageContent;