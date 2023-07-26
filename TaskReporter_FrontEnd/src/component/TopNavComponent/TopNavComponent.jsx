import searchIcon from '../../assets/search-light.svg';
import notificationIcon from '../../assets/notification-light.svg'
import userIcon from '../../assets/user-light.svg'
import noInternetLight from '../../assets/noInternet-light.svg'
import noInternetDark from '../../assets/noInternet-dark.svg'
import coinImage from '../../assets/coin.svg'
import './TopNavComponent.css';
import {  Link } from "react-router-dom";
// lottie
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { useEffect, useRef, useState } from 'react';
import { isOnline  } from '../../App';
import { disableScroll ,enableScroll , debounce } from '../../utils/ApiHandlers';
import NotificationComponent from '../NotificationsComponent/NotificationComponent';

defineElement(lottie.loadAnimation);    

function TopNavComponent({currPage,theme,currentUser,fromPage,setCategoryList,setSearchText}) {

    const [isNotificationOpen , setIsNotificationOpen] = useState(false);

    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            left : 0,
            behavior : 'smooth'
        })
    }

    const handleSearchText = debounce((searchValue) => {
        setSearchText(searchValue.trim().toLowerCase());
    })

    return ( 
            <>  
                {
                    (isNotificationOpen)?
                    <div className="notificationsPopUpBackDrop" >
                        <div className="notificationsWrapperFromTopNav" >
                            <NotificationComponent theme={theme} currentUser={currentUser} setIsNotificationOpen={setIsNotificationOpen} fromPage={currPage} setCategoryList={setCategoryList}/>
                        </div>
                    </div> : ''
                }
                <div className="TopNavComponent">
                    <div className="topNavLeft">
                        <div className="searchBox">
                            <div className="searchIconLeft">
                                <lord-icon
                                    src="https://cdn.lordicon.com/xfftupfv.json"
                                    trigger="hover"
                                    colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                                    style={{width:30,height:30  }}
                                >
                                </lord-icon>
                            </div>
                            <input type="text"  id='searchBarInp' placeholder='search' onChange={(e)=>{handleSearchText(e.target.value)}} style={{color:'var(--text-color)'}}/>
                        </div>
                    </div>
                    <div className="topNavMiddle">
                        {currPage}
                    </div>
                    <div className="topNavRight">
                        <div className="productivityPoints">
                            <div className="pointsName"> {currentUser? currentUser.productivityPoints : 0}</div>
                            <img src={coinImage} alt="points" height={20} width={20} />
                        </div>
                        <div className="noInternetIndicator" style={{display:(isOnline)?'none':'flex'}}>
                            <img src={(theme=='light')?noInternetLight: noInternetDark} alt="user" height={30} width={30} />
                        </div>
                        <div className="notifications" onClick={()=>{setIsNotificationOpen(true);disableScroll();scrollToTop()}} 
                                              style={{display:(fromPage=='Dashboard' || currPage=='Dashboard')?'none':'flex'}}
                                            >
                            <lord-icon
                                src='https://cdn.lordicon.com/psnhyobz.json'
                                trigger="hover"
                                colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                                style={{width:30,height:30  }}
                            >
                            </lord-icon>
                        </div>
                        <div className="userNameTop">
                            {(currentUser.username==null)?'user':currentUser.username}
                        </div>
                            <Link to={'/settings'} style={{textDecoration:'none',color:'var(--text-color)'}}>
                                <div className="userNameIcon"  >
                                    {
                                        (currentUser._id==null )?
                                            <lord-icon
                                                src="https://cdn.lordicon.com/bhfjfgqz.json"
                                                trigger="hover"
                                                colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                                                style={{width:30,height:30  }}
                                            >
                                            </lord-icon>
                                        :
                                            <img src={localStorage.getItem('userImageLink')} alt="user" height={40} width={40} />
                                    }
                                </div>
                            </Link>
                    </div>
                </div>
            </>
     );
}

export default TopNavComponent;