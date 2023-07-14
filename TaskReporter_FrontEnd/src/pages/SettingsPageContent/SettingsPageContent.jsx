import { useEffect } from 'react';
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import './SettingsPageContent.css'
import BannerCoverComponent from './BannerCoverComponent/BannerCoverComponent';
import { toggleTheme } from '../../utils/ApiHandlers';

function SettingsPageContent({theme,currentUser,setCategoryList}) {




    return ( 
    <>
        <div className="settingsPageWrapper">
            <TopNavComponent currPage={"Settings"} theme={theme[0]}  currentUser={currentUser} setCategoryList={setCategoryList}/>

                <div className="userBanners">
                    <div className="userBannerCoverImage">
                        <BannerCoverComponent />
                    </div>
                    <div className="insideBannerCover">
                        <div className="userBannerUserImage">
                            <img src={localStorage.getItem("userImageLink")} alt="user" height={102} width={102} />
                        </div>
                        <div className="userDetailsInsideBanner">
                            <div className="usernameDisplay">
                                    {currentUser.username}
                            </div>
                            <div className="userEmailDisplay">
                                    {currentUser.emailId}
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="themeSwitcher">
                        <div className="themeName">
                            Themes  
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


