import searchIcon from '../../assets/search-light.svg';
import notificationIcon from '../../assets/notification-light.svg'
import userIcon from '../../assets/user-light.svg'
import './TopNavComponent.css';
// lottie
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
defineElement(lottie.loadAnimation);    

function TopNavComponent({currPage,theme}) {
    return ( 
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
                <input type="text"  id='searchBarInp' placeholder='search' style={{color:'var(--text-color)'}}/>
            </div>
        </div>
        <div className="topNavMiddle">
            {currPage}
        </div>
        <div className="topNavRight">
            <div className="notifications">
                <lord-icon
                    src='https://cdn.lordicon.com/psnhyobz.json'
                    trigger="hover"
                    colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                    style={{width:30,height:30  }}
                >
                </lord-icon>
            </div>
            <div className="userNameTop">
                Renjith samuel
            </div>
            <div className="userNameIcon">
                <lord-icon
                    src="https://cdn.lordicon.com/bhfjfgqz.json"
                    trigger="hover"
                    colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                    style={{width:30,height:30  }}
                >
                </lord-icon>
            </div>
        </div>
    </div> );
}

export default TopNavComponent;