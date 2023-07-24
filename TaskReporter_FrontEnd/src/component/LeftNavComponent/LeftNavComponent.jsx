import { useEffect } from 'react';
import {  Link } from "react-router-dom";
import './LeftNavComponent.css'
// lottie
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
defineElement(lottie.loadAnimation);

function LeftNavComponent({pathname,compName,compIcon,svgIcon,selectedNavElem , setSelectedNavElem,theme,setCurrentUser,setIsLoggedIn}) {


    return (
        <Link to={(compName=='logout')? '/': (compName!='tasks')?"/"+compName:'/'} style={{textDecoration:'none',color:'var(--text-color)'}}>
        <div className="LeftNavComponentWrapper" 
                style={{backgroundColor:(selectedNavElem==pathname)?'var(--secondary-color)':'var(--primary-color)',borderColor:(selectedNavElem==compName)?'var(--border-color)':'var(--primary-color)' }} 
                    onClick={   ()=>{
                            //  setSelectedNavElem(compName);
                             if(compName=='logout'){
                                if(confirm("Are you sure want to logout?")){
                                    setCurrentUser({});
                                    localStorage.clear();
                                    location.reload()
                                }
                            }}}
                >
            <div className="NavIcon">
                {
                    (compIcon!='null')?<lord-icon
                        src={compIcon}
                        trigger="hover"
                        colors={(theme=='light')?"primary:#121331" : 'primary:#ffffff'}
                        style={{width:30,height:30  }}>
                    </lord-icon>
                    :
                    <img src={svgIcon} alt={compName} height={30} width={30} />
                }
            </div>
            <div className="NavName">
                {compName}
            </div>
        </div> 
        </Link>
    );
}

export default LeftNavComponent;