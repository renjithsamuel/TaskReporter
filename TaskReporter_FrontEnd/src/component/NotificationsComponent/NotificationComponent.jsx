import './NotificationComponent.css'
import clearAllLight from '../../assets/clear-all-light.svg';
import clearAllDark from '../../assets/clear-all-dark.svg';
import rejectLight from '../../assets/reject-light.svg'
import rejectDark from '../../assets/reject-dark.svg'
import acceptLight from '../../assets/accept-light.svg'
import acceptDark from '../../assets/accept-dark.svg'



function NotificationComponent({theme}) {
    return ( <>
        <div className="notificationsWrapper">
            <div className="notificationsTitleWrapper">Notifications</div>
            <div className="notificationControlElems">
                <div className="clearAllButton">
                    <img src={(theme=='light')?clearAllLight:clearAllDark} alt="clear" height={30}  width={30}/>
                </div>
            </div>
            <div className="allNotifications">
                <SingleNotificationComponent  theme={theme}/>
            </div>
        </div>
    </> );
}

export default NotificationComponent;


function SingleNotificationComponent({theme}) {
    return ( <>
        <div className="singleNotificationWrapper">
            <div className="notificationDetails">
                <div className="notificationSender">
                    Renjith Samuel
                </div>
                <div className="notificationCategoryName">
                    SIH Project
                </div>
            </div>
            <div className="singleNotificaitonControlElem">
                <div className="notificationAcceptBtn">
                    <img src={(theme=='light')?acceptLight:acceptDark} alt="accept" height={30} width={30} />
                </div>
                <div className="notificationRejectBtn">
                    <img src={(theme=='light')?rejectLight:rejectDark} alt="reject" height={30} width={30} />
                </div>      
            </div>
        </div>
    </> );
}
