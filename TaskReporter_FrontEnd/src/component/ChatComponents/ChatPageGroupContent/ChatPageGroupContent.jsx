import './ChatPageGroupContent.css'
import { useEffect, useState } from "react";
import sendLight from '../../../assets/send-light.svg'
import sendDark from '../../../assets/send-dark.svg'
// socket
import io from 'socket.io-client';
import { getPreviousChats, postChatByDate } from '../../../utils/ApiHandlers';
let socket;

function ChatPageGroupContent({theme,currentUser , currentCategory}) {
    const [messages,setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [currentMessageDate , setCurrentMessageDate] = useState('');

    useEffect(() => {
        if (currentCategory._id) {
            getPreviousChats(currentCategory._id,setMessages);
          // Join the room when the category ID is available
          socket = io('https://taskreporternode.onrender.com/');
        //   socket = io('http://localhost:3001');
          socket.emit('joinRoom', currentCategory._id);
          socket.on("connect",()=>{
              console.log(`you have connected with the server with socket id : ${socket.id}`);
          })
          
          // Listen to 'message' event from the server
          socket.on('message', (data) => {
            setMessages((prevMessages) =>
                {
                    let tempMessages =[...prevMessages,data];
                    tempMessages = tempMessages.sort((a,b)=> new Date(a.chatDate) - new Date(b.chatDate));
                    return tempMessages;
                }

            );
          });

          return () => {
            socket.disconnect();
          };
        }
      }, [currentCategory._id]);

        // Function to send a message to the server
        const sendMessage = () => {
            if (currentCategory._id) {
                const chatObject = { 
                                    room : currentCategory._id,
                                    text: inputMessage,
                                    senderEmail: currentUser.emailId,
                                    senderName: currentUser.username,
                                    category : currentCategory._id,
                                    chatDate : new Date()
                                    // .toLocaleDateString('en-US',{day : 'numeric',month : 'short',year : 'numeric'}),
                                      }
                socket.emit('message', chatObject);
                postChatByDate(chatObject);
                setInputMessage('');
              } else {
                console.log("Category ID is null, cannot send message.");
            }
        };

    return ( 
    <>
        <div className="chatPageGroupContentWrapper">
                <div className="currentChatsWrapper">
                <div className="currentChatsTopContent">
                    <div className="ChatContentName">{currentCategory.categoryName}</div>
                    <div className="ChatContentDate">{currentMessageDate}</div>
                </div>
                    <div className="chatContentChats">
                        {
                           (messages && messages.length > 0)?
                            messages.map((message,index)=>{
                                return <MessageElement key={index} 
                                senderName={message.senderName} chatTime={new Date(message.chatDate).getHours() + ":" + new Date(message.chatDate).getHours()} 
                                chatDate={new Date(message.chatDate).toLocaleDateString('en-US',{day : 'numeric',month : 'short',year : 'numeric'})} 
                                message={message.text} senderEmail={message.senderEmail} currentUserEmail={currentUser.emailId}/>
                            })
                            :
                            <h3 style={{marginLeft:'45%',marginTop:'30%'}}>No Data</h3>
                        }
                    </div>
                </div>
                <div className="sendMessageBar">
                   
                    <div className="messageInputBox">
                        <input type="text"  placeholder='type message' id='messageBoxInput' 
                             value={inputMessage}
                           onChange={(e) => setInputMessage(e.target.value)}/>
                    </div>
                    <div className="messageSendButton"  onClick={sendMessage}>
                            <img src={(theme=='light')?sendLight:sendDark} alt="send" height={30}  width={30}/>
                    </div>
                </div>
        </div>
    </> );
}

export default ChatPageGroupContent;


function MessageElement({senderName,message,senderEmail,currentUserEmail,chatDate,chatTime}) {
    return ( 
    <>
        <div className="messageElementWrapper" style={{alignSelf:(senderEmail==currentUserEmail)?'end':'start',borderColor:(senderEmail==currentUserEmail)?'var(--border-color)':'var(--border-color)',backgroundColor:(senderEmail==currentUserEmail)?'var(--secondary-color)':'var(--secondary-light-color)'}}>
            <div className="chatNameAndDate">
                <div className="senderName">
                    {senderName}
                </div>
                <div className="messageDate">
                    {chatDate}
                </div>
            </div>
            <div className="messageAndTime">
                <div className="message">
                    {message}
                </div>
                <div className="messageTime">
                    {chatTime}
                </div>
            </div>

        </div>
    </> );
}   

