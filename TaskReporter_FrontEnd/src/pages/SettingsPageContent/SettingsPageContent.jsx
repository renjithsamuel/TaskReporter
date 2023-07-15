import { useEffect } from 'react';
import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import './SettingsPageContent.css'
import BannerCoverComponent from './BannerCoverComponent/BannerCoverComponent';
import { toggleTheme } from '../../utils/ApiHandlers';

function SettingsPageContent({theme,currentUser,setCategoryList}) {

    const themeArray = [
        { key : 1 , theme : 'light',pallete : "default",setTheme : theme[1],displayColor : '#ffffff'},
        { key : 2 , theme : 'dark',pallete : "orange",setTheme : theme[1],displayColor : '#fe8040'},
        { key : 3 , theme : 'dark',pallete : "inkBlue",setTheme : theme[1],displayColor : '#27374D'},
        { key : 4 , theme : 'dark',pallete : "neon",setTheme : theme[1],displayColor : '#222831'},
        { key : 5 , theme : 'light',pallete : "blueTimber",setTheme : theme[1],displayColor : '#19A7CE'},
        { key : 6 , theme : 'dark',pallete : "brownTimber",setTheme : theme[1],displayColor : '#5a3309'},
        { key : 7 , theme : 'light',pallete : "palePink",setTheme : theme[1],displayColor : '#F2BED1'},
        { key : 8 , theme : 'dark',pallete : "killMachine",setTheme : theme[1],displayColor : '#922f2f'},
        { key : 9 , theme : 'light',pallete : "desertSand",setTheme : theme[1],displayColor : '#f1dfaa'},
        { key : 10 , theme : 'dark',pallete : "cyberpunkRed",setTheme : theme[1],displayColor : '#522546'},
    ]


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
                        {
                            themeArray.map((themeElement)=>{
                                return <ThemeRightElement theme={themeElement.theme} pallete={themeElement.pallete} setTheme={themeElement.setTheme} displayColor={themeElement.displayColor}/>
                            })
                        }
                    </div>
        </div>
    </> );
}

export default SettingsPageContent;


function ThemeRightElement({theme,pallete,setTheme,displayColor}) {
    return (   
    <div className="themeSelectorsRight" onClick={()=>{toggleTheme(theme,pallete,setTheme)}} style={{backgroundColor:displayColor , borderRadius: (localStorage.getItem('data-pallete')==pallete)?'15px':'10px'}}>
                                
    </div>
);
}


