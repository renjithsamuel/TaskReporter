import './LoginWithGooglePopUpComponent.css'
import { LoginSocialGoogle} from "reactjs-social-login";
import googleImg from "../../../assets/google.png" ;
import taskReporterIconLight from '../../../assets/taskReporter-light.svg';
import taskReporterIconDark from '../../../assets/taskReporter-dark.svg';
// import noInternetLight from '../../../assets/noInternet-light.svg';
// import noInternetDark from '../../../assets/noInternet-dark.svg';
import { useEffect, useState } from 'react';
import { disableScroll, enableScroll } from '../../../utils/ApiHandlers';
import { isOnline } from '../../../App';


function LoginWithGooglePopUpComponent({theme,setIsLoggedIn,connectedToServer}) {
    const [oauthData , setOauthData] = useState({});
    useEffect(()=>{
        if(connectedToServer && JSON.stringify(oauthData)!='{}'){
            localStorage.setItem('emailId',oauthData.email);
            localStorage.setItem('username',oauthData.name);
            localStorage.setItem('userImageLink',oauthData.picture);
            setIsLoggedIn(true);
            console.log("local storage print" , localStorage.getItem('emailId'));
        }
    },[oauthData])


    useEffect(()=>{
        disableScroll();
        return ()=>{enableScroll()}
    },[])



    return ( 
    <>
        <div className="loginWithGoogleBackDrop" >
            <div className="loginWithGoogleWrapper">
                <div className="taskReporterAppDetails">
                    <div className="taskReporterIcon">
                             <img src={(theme=='light')?taskReporterIconLight:taskReporterIconDark} alt="taskReporter" height={25} width={25} /> 
                    </div>
                    <div className="taskReporterAppName">
                            Task Reporter
                    </div>
                </div>
                {
                // (!isOnline)?
                //  <div className="connectingToServerElement">
                //     <div className="ConnectingToServerName">
                //         Not Connected to the Internet!
                //     </div>
                //     <div className="loadingToServerConnection">
                //         <div className="noInternetIndicator">
                //             <img src={(theme=='light')?noInternetLight: noInternetDark} alt="user" height={30} width={30} />
                //         </div>
                //     </div>
                //  </div>
                // :
                (!connectedToServer)?
                <div className="connectingToServerElement">
                        <div className="ConnectingToServerName">
                            Connecting to Server!
                        </div>
                        <div className="loadingToServerConnection">
                            <lord-icon
                                src="https://cdn.lordicon.com/xjovhxra.json"
                                trigger="loop"
                                colors={(theme=='light')?'primary:#000000' : "primary:#ffffff"}
                                style={{width:40 , height:40,marginLeft:5}}>
                            </lord-icon>
                        </div>
                </div>
                    :
                <>
                    <div className="loginTitle">Login with google to continue!</div>
                    <div className="loginWithGoogle"   >
                        <LoginSocialGoogle 
                                   
                                    client_id={import.meta.env.VITE_TASKREPORTER_CLIENTID}
                                    scope="openid profile email"
                                    discoveryDocs="claims_supported"
                                    access_type="offline"
                                    onResolve={({ provider, data }) => {
                                        // console.log(provider);
                                        console.log(data);
                                        setOauthData(data);
                                    }}
                                    onReject={(err) => {
                                        console.log(err);
                                    }}
                                >
                            <button className="googleBtn"  tabIndex={0}><img src={googleImg} alt="google" height={30} width={30}/><span id="loginWord">Login</span></button>
                        </LoginSocialGoogle>
                    </div>
                </>}
            </div>
        </div>
    </> );
}

export default LoginWithGooglePopUpComponent;