import { useEffect } from 'react';

import './LeftNavComponent.css'
// lottie
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
defineElement(lottie.loadAnimation);

function LeftNavComponent({compName,compIcon,svgIcon,selectedNavElem , setSelectedNavElem,theme}) {

    useEffect(()=>{console.log(compName);},[]);

    return (
        <div className="LeftNavComponentWrapper" 
                style={{backgroundColor:(selectedNavElem==compName)?'var(--secondary-color)':'var(--primary-color)',borderColor:(selectedNavElem==compName)?'var(--border-color)':'var(--primary-color)' }} 
                onClick={()=>{ setSelectedNavElem(compName) }}
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
    );
}

export default LeftNavComponent;