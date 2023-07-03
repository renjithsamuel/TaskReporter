import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import './SettingsPageContent.css'

function SettingsPageContent({theme}) {

    const toggleTheme = ()=>{
        let newTheme = (theme[0]=='dark')? 'light' : 'dark';
        theme[1](newTheme);
        document.documentElement.setAttribute('data-theme',newTheme);
    }

    return ( 
    <>
        <div className="settingsPageWrapper">
            <TopNavComponent currPage={"Settings"} theme={theme[0]}/>
            <div className="themeSwitcher" onClick={toggleTheme}>
                   Theme :  {theme[0]}
            </div>
        </div>
    </> );
}

export default SettingsPageContent;