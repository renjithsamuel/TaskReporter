import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import './SettingsPageContent.css'
import BannerCoverComponent from './BannerCoverComponent/BannerCoverComponent';
import { toggleTheme } from '../../utils/ApiHandlers';
import { useEffect, useState } from 'react';

function SettingsPageContent({theme,currentUser,setCategoryList}) {
    const [searchText , setSearchText ] = useState('');
    const [pallete , setPallete ] = useState(''); 

    const themeArray = [
        { key : 1 , theme : 'light',pallete : "default",setTheme : theme[1],displayColor : '#ffffff'},
        { key : 2 , theme : 'dark',pallete : "orange",setTheme : theme[1],displayColor : '#fe8040'},
        { key : 3 , theme : 'dark',pallete : "killMachine",setTheme : theme[1],displayColor : '#922f2f'},
        { key : 4 , theme : 'dark', pallete : "cyberpunkRed" ,setTheme : theme[1]  , displayColor : '#522546'},
        { key : 5 , theme : 'dark',pallete : "inkBlue",setTheme : theme[1],displayColor : '#27374D'},
        { key : 6 , theme : 'dark',pallete : "neon",setTheme : theme[1],displayColor : '#222831'},
        { key : 7 , theme : 'dark',pallete : "neonGreen",setTheme : theme[1],displayColor : '#4ECCA3'},
        { key : 8 , theme : 'light',pallete : "palePink",setTheme : theme[1],displayColor : '#F2BED1'},
        { key : 9 , theme : 'light', pallete : "peaceBlue" ,setTheme : theme[1]  , displayColor : '#71C9CE'},
        { key : 10 , theme : 'light',pallete : "peaceGreen",setTheme : theme[1],displayColor : '#9ED5C5'},
        { key : 11 , theme : 'light',pallete : "blueTimber",setTheme : theme[1],displayColor : '#19A7CE'},
        { key : 12 , theme : 'light',pallete : "desertSand",setTheme : theme[1],displayColor : '#f1dfaa'},
        { key : 13 , theme : 'light',pallete : "diaryMilk",setTheme : theme[1],displayColor : '#1E56A0'},
    ]

    useEffect(()=>{
        if(localStorage.getItem('data-pallete')!=null){
            setPallete(localStorage.getItem('data-pallete'));
        }else{
            setPallete('default')
        }
    },[])


    return ( 
    <>
        <div className="settingsPageWrapper">
            <TopNavComponent currPage={"Settings"} theme={theme[0]}  currentUser={currentUser} setCategoryList={setCategoryList} setSearchText={setSearchText}/>

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
                        <div className="themeSwitcherRight">
                            <div className="themesLight">
                                <div className="themesLightName">
                                    Light 
                                </div>
                                <div className="themesDisplayLight">
                                    {
                                        themeArray.map((themeElement,index)=>{
                                            if(themeElement.theme=='light')
                                            return <ThemeRightElement key={index} currentPallete={pallete} setPallete={setPallete} theme={themeElement.theme} pallete={themeElement.pallete} setTheme={themeElement.setTheme} displayColor={themeElement.displayColor}/>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="themesDark">
                                <div className="themesDarkName">
                                    Dark 
                                </div>
                                <div className="themesDisplayDark">
                                    {
                                        themeArray.map((themeElement,index)=>{
                                            if(themeElement.theme=='dark')
                                            return <ThemeRightElement key={index} currentPallete={pallete} setPallete={setPallete} theme={themeElement.theme} pallete={themeElement.pallete} setTheme={themeElement.setTheme} displayColor={themeElement.displayColor}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </> );
}

export default SettingsPageContent;


function ThemeRightElement({theme,pallete,setTheme,displayColor,setPallete,currentPallete}) {
    return (   
    <div className="themeSelectorsRight" onClick={()=>{toggleTheme(theme,pallete,setTheme);setPallete(pallete);}} style={{backgroundColor:displayColor , borderRadius: (currentPallete==pallete)?'50%':'10px'}}>                     
    </div>
);
}


