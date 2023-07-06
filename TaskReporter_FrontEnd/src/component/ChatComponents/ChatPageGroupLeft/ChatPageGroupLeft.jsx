import './ChatPageGroupLeft.css'

function chatPageGroupLeft({}) {
    return (
    <>
        <div className="chatPageGroupLeftWrapper">
            <div className="chatTitle">Chats</div>
            <div className="chatPageSingleGroup">
                <SingleGroup /> 
            </div>
        </div>
    </> );
}

export default chatPageGroupLeft;


function SingleGroup({}) {
    return ( 
    <>  
        <div className="singleGroupWrapper">
            <div className="groupPictureLeft">
                {/* <img src="" alt="" srcset="" /> */}
            </div>
            <div className="groupNameRight">
                SIH project
            </div>
        </div>  
    </> );
}
