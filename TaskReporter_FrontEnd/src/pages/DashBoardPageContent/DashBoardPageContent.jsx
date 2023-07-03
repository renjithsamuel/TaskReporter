import './DashBoardPageContent.css'
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';

function DashBoardPageContent({theme}) {
    return ( <>
        <TopNavComponent currPage={"Dashboard"} theme={theme}/>
    </> );
}

export default DashBoardPageContent;