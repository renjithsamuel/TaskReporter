import { useEffect, useState } from 'react';
import './AddCategoryPopUpComponent.css';
import addIconCircleLight from '../../../assets/add-circle-light.svg'
import addIconCircleDark from '../../../assets/add-circle-dark.svg'
import minusIconLight from '../../../assets/minus-light.svg'
import minusIconDark from '../../../assets/minus-dark.svg'
import { disableScroll, enableScroll, postCategory } from '../../../utils/ApiHandlers';

function AddCategoryPopUpComponent({theme,currentUser,setCategoryList,setIsOpened}) {

    const [addCategoryElements,setAddCategoryElements ] = useState([]);

    useEffect(()=>{
        const newArr = [{keyForDB : "categoryName",inputLabel : "Category/Project Name : " , inputPlaceHolder : " Enter Category/Project Name  " , inputType : "text",id : "categoryNameInput"},
                        {keyForDB : "description",inputLabel : "Description : " , inputPlaceHolder : " Enter Description  " , inputType : "text",id:"categoryDescriptionInput"},
                        {keyForDB : "startDate",inputLabel : "Start Date : " , inputPlaceHolder : " Enter Start Date  " , inputType : "Date",id:"categoryStartDateInput"},
                        {keyForDB : "endDate",inputLabel : "End Date : " , inputPlaceHolder : " Enter End Date  " , inputType : "Date" , id:"categoryEndDateInput"},
                        {keyForDB : "colaborators",inputLabel : "Add Colaborators Email Id : " , inputPlaceHolder : " Enter Email ID  " , inputType : "text" , id:"categoryColaboratorsInput"},
                        ];
        setAddCategoryElements(newArr);
    },[]);

    useEffect(()=>{
        disableScroll();
        return ()=>{enableScroll()}
    },[])



    const [colaboratorEmails,setColaboratorEmails ] = useState(['']);
    const [categoryData,setCategoryData] = useState({});

    const handleInputChange = (keyForDB , value)=>{
        setCategoryData((prevCategoryData)=>{
            let updatedCategory = {...prevCategoryData};
            updatedCategory[keyForDB] = value;
            return updatedCategory;
        })
    }

    const handleCategorySubmit = ()=>{
            if(categoryData.categoryName == null || categoryData.description == null || categoryData.startDate == null || categoryData.endDate == null ){
                console.log("Enter valid category details!");
                alert('Enter valid category details!');
                return;
            }
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
                                    <img src={(theme=='light')?addIconCircleLight:addIconCircleDark} alt={"add"} height={25} width={25} />
                            </div>
                                    :
                            <div className="addBtnColaborator" onClick={()=>handleAddBtnColaborator('minus')}>
                                <img src={(theme=='light')?minusIconLight:minusIconDark} alt={"minus"} height={25} width={25} />
                            </div>
                            }
                    </div>)
                })            
        }
        </>
    )
}