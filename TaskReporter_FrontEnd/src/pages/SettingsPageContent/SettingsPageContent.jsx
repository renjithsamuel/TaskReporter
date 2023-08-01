import TopNavComponent from '../../component/TopNavComponent/TopNavComponent';
import './SettingsPageContent.css'
import BannerCoverComponent from './BannerCoverComponent/BannerCoverComponent';
import { deleteUser, toggleTheme } from '../../utils/ApiHandlers';
import { useEffect, useState } from 'react';
import coinImage from '../../assets/coin.svg'
import fireImage from '../../assets/fire.svg'
import deleteIconDark from '../../assets/delete-dark.svg'
import deleteIconLight from '../../assets/delete-light.svg'

function SettingsPageContent({theme,currentUser,setCategoryList,streak,setCurrentUser}) {
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
        console.log(streak);
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
                {/* top banner */}
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

                {/* user achievements */}

                <div className="userAcheivements">
                    <div className="userAcheivementsName">
                        Acheivements
                    </div>
                    <div className="userStreaks">
                            <div className="userCurrentStreak">
                                <div className="userCurrentStreakName">
                                        Current Streak 
                                </div>
                                <div className="userCurrentStreakDisplay">
                                            {(JSON.stringify(streak)!='{}')?streak.currentStreak:  0}
                                          <div className="userCurrentStreakIcon">
                                                <img src={fireImage} alt="points" height={30} width={30} />
                                        </div>
                                </div>

                            </div>
                            <div className="userLongestStreak">
                                <div className="userLongestStreakName">
                                        Longest Streak 
                                </div>
                                <div className="userLongestStreakDisplay">
                                        {(JSON.stringify(streak)!='{}')?streak.longestStreak:  0}
                                </div>
                            </div>
                    </div>
                    <div className="userProductivityPoints">
                        <div className="productivityPointsName">
                                Productivity Points
                        </div>
                        <div className="productivityPointsDisplay">
                                {currentUser && currentUser.productivityPoints? currentUser.productivityPoints : 0}
                            <div className="productivityPointsIcon">
                                <img src={coinImage} alt="points" height={20} width={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* theme switcher */}
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

                    {/* delete user */}
                    <div className="deleteUserWrapper">
                        <div className="deleteUserName">
                            Delete User 
                        </div>
                        <div className="deleteUserButtonWrapper" onClick={()=>{deleteUser(currentUser._id,setCategoryList,setCurrentUser);}}>
                            <div className="deleteButton">
                                delete Account 
                            </div>
                            <div className="deleteIcon">
                                 <img src={(theme[0]=='light')?deleteIconLight:deleteIconDark} alt="points" height={20} width={20} />
                            </div>
                        </div>
                    </div>
        </div>
    </> );
}

export default SettingsPageContent;


function ThemeRightElement({theme,pallete,setTheme,displayColor,setPallete,currentPallete}) {
    return (   
    <div className="themeSelectorsRight"   tabIndex={0} onClick={()=>{toggleTheme(theme,pallete,setTheme);setPallete(pallete);}} style={{backgroundColor:displayColor , borderRadius: (currentPallete==pallete)?'50%':'10px'}}>                     
    </div>
);
}


