import './ChatPageGroupContent.css'
import { useState } from "react";
import sendLight from '../../../assets/send-light.svg'
import sendDark from '../../../assets/send-dark.svg'

function ChatPageGroupContent({theme}) {
    const [currentUser,setCurrentUser] = useState({email : "renjith@gmail.com"})
    const [messages,setMessages] = useState([{senderEmail : 'renjith@gmail.com', senderName : "renjith", message : 'Hello everyone!'},
                                            {senderEmail : 'arun@gmail.com', senderName : "arun", message : 'hi renjith!'},  
                                            {senderEmail : 'bala@gmail.com', senderName : "bala", message : 'hi arun!'},
                                        ]);

    return ( 
    <>
        <div className="chatPageGroupContentWrapper">
                <div className="currentChatsWrapper">
                <div className="UnderDevelopment">Under Development</div>
                     
                    {messages.map((message,index)=>{
                        return <MessageElement key={index} senderName={message.senderName} message={message.message} senderEmail={message.senderEmail} currentUserEmail={currentUser.email}/>
                    })}
                </div>
                <div className="sendMessageBar">
                   
                    <div className="messageInputBox">
                        <input type="text"  placeholder='type message' id='messageBoxInput'/>
                    </div>
                    <div className="messageSendButton">
                            <img src={(theme=='light')?sendLight:sendDark} alt="send" height={30}  width={30}/>
                    </div>
                </div>
        </div>
    </> );
}

export default ChatPageGroupContent;


function MessageElement({senderName,message,senderEmail,currentUserEmail}) {
    return ( 
    <>
        <div className="messageElementWrapper" style={{marginLeft:(senderEmail==currentUserEmail)?'39vw':'0vw',borderColor:(senderEmail==currentUserEmail)?'var(--border-color)':'transparent',backgroundColor:(senderEmail==currentUserEmail)?'var(--secondary-light-color)':'var(--hover-color)'}}>
            <div className="senderName">
                {senderName}
            </div>
            <div className="message">
                {message}
            </div>
        </div>
    </> );
}   

