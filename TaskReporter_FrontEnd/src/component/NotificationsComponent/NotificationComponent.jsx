import './NotificationComponent.css'
import clearAllLight from '../../assets/clear-all-light.svg';
import clearAllDark from '../../assets/clear-all-dark.svg';
import rejectLight from '../../assets/reject-light.svg'
import rejectDark from '../../assets/reject-dark.svg'
import acceptLight from '../../assets/accept-light.svg'
import acceptDark from '../../assets/accept-dark.svg'
import closeLight from '../../assets/close-light.svg'
import closeDark from '../../assets/close-dark.svg'
import { useContext } from 'react';
import { acceptInvite,rejectInvite ,enableScroll, clearNotifications} from '../../utils/ApiHandlers';
import {UserContext} from '../../App'

function NotificationComponent({theme,currentUser,setIsNotificationOpen,fromPage,setCategoryList}) {

    const {setCurrentUser} = useContext(UserContext);

    return ( <>
        <div className="notificationsWrapper">
            <div className="notificationsTopNav">
                <div className="notificationsTitleWrapper">Notifications</div>
                <div className="notificationControlElems">
                    <div className="closeShowNotoficationsBtn"
                        onClick={()=>{setIsNotificationOpen(false);enableScroll()}}
                        style={{visibility:(fromPage=='Dashboard')?'hidden':'none'}}
                        >
                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
                    </div>
                    <div className="clearAllButton" onClick={()=>{clearNotifications(currentUser,setCurrentUser)}}>
                        <img src={(theme=='light')?clearAllLight:clearAllDark} alt="clear" height={30}  width={30}/>
                    </div>
                </div>
            </div>
            <div className="allNotifications">
                {
                    (currentUser && (Array.isArray(currentUser.invites) && currentUser.invites.length > 0))?(
                        currentUser.invites.map((invite,index)=>{
                           return <SingleNotificationComponent key={index} setCurrentUser={setCurrentUser} theme={theme} currentUser={currentUser} invitedCategoryId={invite._id} invitedBy={invite.createdBy.username} categoryName={invite.categoryName} setCategoryList={setCategoryList}/>
                        })
                    ):(<h3>No Notifications</h3>)
                }
            </div>
        </div>
    </> );
}

export default NotificationComponent;


function SingleNotificationComponent({theme,invitedBy,categoryName,invitedCategoryId,currentUser,setCategoryList,setCurrentUser}) {


    return ( <>
        <div className="singleNotificationWrapper">
            <div className="notificationDetails">
                <div className="notificationSender">
                    {invitedBy}
                </div>
                <div className="notificationCategoryName">
                    {categoryName}
                </div>
            </div>
            <div className="singleNotificaitonControlElem">
                <div className="notificationAcceptBtn" onClick={()=>{acceptInvite(currentUser,invitedCategoryId,setCategoryList,setCurrentUser)}}>
                    <img src={(theme=='light')?acceptLight:acceptDark} alt="accept" height={30} width={30} />
                </div>
                <div className="notificationRejectBtn" onClick={()=>{rejectInvite(currentUser,invitedCategoryId,setCurrentUser)}}>
                    <img src={(theme=='light')?rejectLight:rejectDark} alt="reject" height={30} width={30} />
                </div>      
            </div>
        </div>
    </> );
}
