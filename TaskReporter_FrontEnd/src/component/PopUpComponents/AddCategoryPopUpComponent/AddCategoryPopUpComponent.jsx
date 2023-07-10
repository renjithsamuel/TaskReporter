import { useEffect, useState } from 'react';
import './AddCategoryPopUpComponent.css';
import addIconLight from '../../../assets/add-light.svg'
import addIconDark from '../../../assets/add-dark.svg'
import minusIconLight from '../../../assets/minus-light.svg'
import minusIconDark from '../../../assets/minus-dark.svg'
import closeLight from '../../../assets/close-light.svg'
import closeDark from '../../../assets/close-dark.svg'
import { postCategory } from '../../../utils/ApiHandlers';

function AddCategoryPopUpComponent({theme,currentUser,setCategoryList,setIsOpened}) {

    const [addCategoryElements,setAddCategoryElements ] = useState([]);

    useState(()=>{
        const newArr = [{keyForDB : "categoryName",inputLabel : "Category/Project Name : " , inputPlaceHolder : " Enter Category/Project Name  " , inputType : "text",id : "categoryNameInput"},
                        {keyForDB : "description",inputLabel : "Description : " , inputPlaceHolder : " Enter Description  " , inputType : "text",id:"categoryDescriptionInput"},
                        {keyForDB : "startDate",inputLabel : "Start Date : " , inputPlaceHolder : " Enter Start Date  " , inputType : "Date",id:"categoryStartDateInput"},
                        {keyForDB : "endDate",inputLabel : "End Date : " , inputPlaceHolder : " Enter End Date  " , inputType : "Date" , id:"categoryEndDateInput"},
                        {keyForDB : "colaborators",inputLabel : "Add Colaborators Email Id : " , inputPlaceHolder : " Enter Email ID  " , inputType : "text" , id:"categoryColaboratorsInput"},
                        ];
        setAddCategoryElements(newArr);
    },[]);

    const [colaboratorEmails,setColaboratorEmails ] = useState(['']);
    const [categoryData,setCategoryData] = useState({});

    useEffect(()=>{
        console.log(categoryData);
    },[categoryData])

    const handleInputChange = (keyForDB , value)=>{
        setCategoryData((prevCategoryData)=>{
            let updatedCategory = {...prevCategoryData};
            updatedCategory[keyForDB] = value;
            return updatedCategory;
        })
    }

    const handleCategorySubmit = ()=>{
            postCategory(categoryData,colaboratorEmails,currentUser,setCategoryList);
            setIsOpened(false);
    }

    return ( <>
        <div className="popUpBackDropAddCategory" >
            <div className="popUpContentAddCategoryWrapper">
                <div className="titleOfAddCategory">
                    <div className="addCategoryName">
                        Add Category
                    </div>
                    <div className="closeAddCategoryBtn" onClick={()=>{setIsOpened(false)}}>
                        <img src={(theme=='light')?closeLight:closeDark} alt="close" height={40} width={40} />
                    </div>
                </div>
                {
                    addCategoryElements.map((elem,index)=>{
            
                        return (
                                <div className="addCategoryInputWrapper" key={index}>
                                    <div className="addCategoryLabelLeft">
                                        {elem.inputLabel}
                                    </div>
                                    <div className="addCategoryInputRight">
                                        {(elem.id!='categoryColaboratorsInput')?
                                           <input type={elem.inputType}  placeholder={elem.inputPlaceHolder}  id={elem.id} className='addCategoryInputs' onChange={(e)=>{handleInputChange(elem.keyForDB,e.target.value)}}/>
                                            :
                                            <ColaboratorsInputComponent theme={theme} colaboratorEmails={colaboratorEmails} setColaboratorEmails={setColaboratorEmails}/>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    )
                }

                <div className="addCategoryControlElem">
                    <div className="submitAddCategoryBtn" onClick={()=>{handleCategorySubmit();}}>
                        Add Category
                    </div>
                    <div className="cancelAddCategoryBtn" onClick={()=>{setIsOpened(false)}}>
                        Cancel
                    </div>
                </div>
                
            </div>
        </div>
    </> );
};

export default AddCategoryPopUpComponent;


// function PopUpContentAddCategory({addCategoryElements,theme,setIsOpened,currentUser,setCategoryList}) {

    
// }


function ColaboratorsInputComponent({theme,colaboratorEmails,setColaboratorEmails}){
    const [colaboratorCount , setColaboratorCount] = useState(1);


    const handleAddBtnColaborator = (currentColabCount) => {
        if(currentColabCount=='add'){
            setColaboratorCount(colaboratorCount+1);
            setColaboratorEmails([...colaboratorEmails, '']); 
        }else{
            setColaboratorCount(colaboratorCount-1);
            setColaboratorEmails(colaboratorEmails.slice(0, -1));
        }
    }

    const handleEmailChange = (index, value) => {
        const updatedEmails = [...colaboratorEmails];
        updatedEmails[index] = value;
        console.log(updatedEmails);
        setColaboratorEmails(updatedEmails);
      };


    return (
        <>{
            (colaboratorCount==0)?
                (<div className="addBtnColaborator" onClick={()=>setColaboratorCount(1)}>
                     <img src={(theme=='light')?addIconLight:addIconDark} alt={"add"} height={30} width={30} />
                </div>)
            :
             Array.from({length : colaboratorCount} , (_,index)=>
                {   
                    return (<div className="colaboratorsInputComponentWrapper" key={index}>
                        <input type="text" placeholder='Enter Colaborator Email Id'  className='addCategoryInputs'
                            value={colaboratorEmails[index]} onChange={(e) => handleEmailChange(index, e.target.value)} 
                        />
                        {(index==colaboratorCount-1)?
                            <div className="addBtnColaborator" onClick={()=>handleAddBtnColaborator('add')}>
                                    <img src={(theme=='light')?addIconLight:addIconDark} alt={"add"} height={30} width={30} />
                            </div>
                                    :
                            <div className="addBtnColaborator" onClick={()=>handleAddBtnColaborator('minus')}>
                                <img src={(theme=='light')?minusIconLight:minusIconDark} alt={"minus"} height={30} width={30} />
                            </div>
                            }
                    </div>)
                })            
        }
        </>
    )
}