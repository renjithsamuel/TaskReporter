import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import './SettingsPageContent.css'

function SettingsPageContent({theme,currentUser}) {

    const toggleTheme = (newTheme,newPallete)=>{
        theme[1](newTheme);
        document.documentElement.setAttribute('data-theme',newTheme);
        document.documentElement.setAttribute('data-pallete',newPallete);
    }

    return ( 
    <>
        <div className="settingsPageWrapper">
            <TopNavComponent currPage={"Settings"} theme={theme[0]}  currentUser={currentUser}/>
                    <div className="themeSwitcher">
                        <div className="themeName">
                            Themes : 
                        </div>
                        <div className="themeSelectorsRight" onClick={()=>{toggleTheme('light','default')}} style={{backgroundColor:'#ffffff'}}>
                                
                        </div>
                        <div className="themeSelectorsRight"  onClick={()=>{toggleTheme('dark','orange')}} style={{backgroundColor:'#fe8040'}}>

                        </div>
                        <div className="themeSelectorsRight"  onClick={()=>{toggleTheme('dark','inkBlue')}} style={{backgroundColor:'#27374D'}}>

                        </div>
                        <div className="themeSelectorsRight"   onClick={()=>{toggleTheme('dark','neon')}} style={{backgroundColor:'#00ADB5'}}>

                        </div>
                    </div>
        </div>
    </> );
}

export default SettingsPageContent;