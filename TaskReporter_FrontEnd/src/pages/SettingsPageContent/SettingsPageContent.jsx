import { useEffect } from 'react';
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import './SettingsPageContent.css'
import { toggleTheme } from '../../utils/ApiHandlers';

function SettingsPageContent({theme,currentUser}) {




    return ( 
    <>
        <div className="settingsPageWrapper">
            <TopNavComponent currPage={"Settings"} theme={theme[0]}  currentUser={currentUser}/>
                    <div className="themeSwitcher">
                        <div className="themeName">
                            Themes : 
                        </div>
                        <div className="themeSelectorsRight" onClick={()=>{toggleTheme('light','default',theme[1])}} style={{backgroundColor:'#ffffff'}}>
                                
                        </div>
                        <div className="themeSelectorsRight"  onClick={()=>{toggleTheme('dark','orange',theme[1])}} style={{backgroundColor:'#fe8040'}}>

                        </div>
                        <div className="themeSelectorsRight"  onClick={()=>{toggleTheme('dark','inkBlue',theme[1])}} style={{backgroundColor:'#27374D'}}>

                        </div>
                        <div className="themeSelectorsRight"   onClick={()=>{toggleTheme('dark','neon',theme[1])}} style={{backgroundColor:'#222831'}}>

                        </div>
                        <div className="themeSelectorsRight"   onClick={()=>{toggleTheme('light','blueTimber',theme[1]  )}} style={{backgroundColor:'#19A7CE'}}>

                        </div>
                        <div className="themeSelectorsRight"   onClick={()=>{toggleTheme('dark','brownTimber',theme[1]  )}} style={{backgroundColor:'#5a3309'}}>

                        </div>
                    </div>
        </div>
    </> );
}

export default SettingsPageContent;