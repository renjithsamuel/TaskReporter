import './CategoryDetailsComponent.css';


function CategoryDetailsComponent({}) {

    const categoryDetailsElements = [
        {key : 1 ,  label : "Category Name " , value : "SIH Project"},
        {key  : 2 , label : "Description " , value :  " Smart India hackathon 2022 Software edition conducted by Government of India."},
        {key  : 3 , label : "Start Date " , value :  "20 Oct 2022"},
        {key  : 4 , label : "End Date  " , value :  " 20 Nov 2022 "},
        {key  : 5 , label : "Created By " , value :  " renjithsamuelking@gmail.com"},
        {key  : 6 , label : "Colaborators" , value :  [" ranjithsamuelking@gmail.com","Balasuriya@gmail.com","arunPR@gmail.com"]},
    ]

    return ( <>
                <div className="categoryDetailsContentWrapper">
                
                {
                    categoryDetailsElements.map((categoryDetailsElement)=>{
                        
                        return (
                                <div className="categoryDetailsSingleListElement" key={categoryDetailsElement.key}>
                                        <div className="categoryDetailsListElementLeft">
                                            {categoryDetailsElement.label}
                                        </div>
                                        {(categoryDetailsElement.label!='Colaborators')?
                                            (<div className="categoryDetailsListElementRight">
                                                {categoryDetailsElement.value}
                                            </div> )
                                            :
                                            (<div className="categoryDetailsListColaboratorElementRightWrapper">
                                                {   
                                                    (categoryDetailsElement.value).map((Colaborator,index)=>{
                                                        return(<div className="categoryDetailsListColaboratorElementRight" key={index}>
                                                           {index+1} . {Colaborator} 
                                                        </div>)
                                                    })
                                                }
                                            </div>)
                                            
                                        }
                                 </div>
                                 )
                    })
                }
            </div>
            </> );
}

export default CategoryDetailsComponent;