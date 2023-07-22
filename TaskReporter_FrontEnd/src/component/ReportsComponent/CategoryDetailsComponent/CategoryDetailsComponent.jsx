import { useEffect, useState } from 'react';
import './CategoryDetailsComponent.css';


function CategoryDetailsComponent({currentCategory}) {

    const categoryDetailsElements = [
        {dbKey : "categoryName",key : 1 ,  label : "Category Name" , value : "SIH Project"},
        {dbKey : "description",key  : 2 , label : "Description" , value :  " Smart India hackathon 2022 Software edition conducted by Government of India."},
        {dbKey : "startDate",key  : 3 , label : "Start Date" , value :  "20 Oct 2022"},
        {dbKey : "endDate",key  : 4 , label : "End Date" , value :  " 20 Nov 2022 "},
        {dbKey : "createdBy",key  : 5 , label : "Created By" , value :  " renjithsamuelking@gmail.com"},
        {dbKey : "colaborators",key  : 6 , label : "Colaborators" , value :  [" ranjithsamuelking@gmail.com","Balasuriya@gmail.com","arunPR@gmail.com"]},
    ]


    return ( <>
                <div className="categoryDetailsContentWrapper">
                
                {   
                    (currentCategory._id)?
                        categoryDetailsElements.map((categoryDetailsElement)=>{
                            return (
                                    <div className="categoryDetailsSingleListElement" key={categoryDetailsElement.key}>
                                            <div className="categoryDetailsListElementLeft">
                                                {categoryDetailsElement.label}
                                            </div>
                                            {
                                            (JSON.stringify(currentCategory)=="{}")? "" :
                                            (categoryDetailsElement.dbKey!='colaborators' && categoryDetailsElement.dbKey!='createdBy' )?
                                                (<div className="categoryDetailsListElementRight">
                                                    {( currentCategory && categoryDetailsElement.dbKey && currentCategory[`${categoryDetailsElement.dbKey}`] )?currentCategory[categoryDetailsElement.dbKey].toString():""}
                                                </div> )
                                                :(categoryDetailsElement.dbKey=='createdBy' )?

                                                (<div className="categoryDetailsListElementRight">
                                                    {( currentCategory && categoryDetailsElement.dbKey && currentCategory[`${categoryDetailsElement.dbKey}`].username )?currentCategory[categoryDetailsElement.dbKey].username.toString():""}
                                                </div> )

                                                :(categoryDetailsElement.dbKey=='colaborators')?
                                                (<div className="categoryDetailsListColaboratorElementRightWrapper">
                                                    {   
                                                        (currentCategory && Array.isArray(currentCategory.colaborators))?
                                                        currentCategory.colaborators.map((Colaborator,index) => {
                                                            return (<div className="categoryDetailsListColaboratorElementRight" key={index}>
                                                            {index+1} . {Colaborator.emailId} 
                                                            </div>)
                                                        }):''
                                                    }
                                                </div>)
                                                : ''
                                                
                                            }
                                    </div>
                                    )
                                })
                            :
                                <h3>No data to Show</h3>
                }
            </div>
            </> );
}

export default CategoryDetailsComponent;