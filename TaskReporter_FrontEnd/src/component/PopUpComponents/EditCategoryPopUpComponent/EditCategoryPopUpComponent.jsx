import { useEffect, useState } from 'react';
import './EditCategoryPopUpComponent.css';
import addIconCircleLight from '../../../assets/add-circle-light.svg'
import addIconCircleDark from '../../../assets/add-circle-dark.svg'
import minusIconLight from '../../../assets/minus-light.svg'
import minusIconDark from '../../../assets/minus-dark.svg'
import { disableScroll, enableScroll, patchCategory } from '../../../utils/ApiHandlers';

function EditCategoryPopUpComponent({theme,currentCategory,setCategoryList,setEditCategoryOpen}) {

    const [editCategoryElements,setEditCategoryElements ] = useState([]);
    const [colaboratorEmails,setColaboratorEmails ] = useState([]);
    const [categoryData,setCategoryData] = useState(currentCategory);

    useEffect(()=>{
        const newArr = [{keyForDB : "categoryName",inputLabel : "Category/Project Name : " , inputPlaceHolder : " Enter Category/Project Name  " , inputType : "text",id : "categoryNameInput"},
                        {keyForDB : "description",inputLabel : "Description : " , inputPlaceHolder : " Enter Description  " , inputType : "text",id:"categoryDescriptionInput"},
                        {keyForDB : "startDate",inputLabel : "Start Date : " , inputPlaceHolder : " Enter Start Date  " , inputType : "Date",id:"categoryStartDateInput"},
                        {keyForDB : "endDate",inputLabel : "End Date : " , inputPlaceHolder : " Enter End Date  " , inputType : "Date" , id:"categoryEndDateInput"},
                        {keyForDB : "colaborators",inputLabel : "Edit Colaborators Email Id : " , inputPlaceHolder : " Enter Email ID  " , inputType : "text" , id:"categoryColaboratorsInput"},
                        ];
        setEditCategoryElements(newArr);
    },[]);

    useEffect(()=>{
        let tempEmailList = currentCategory.colaborators.map((elem)=>elem.emailId);
        setColaboratorEmails(tempEmailList);
        let tempCategoryData = {...categoryData , startDate : new Date(categoryData.startDate).toISOString().split('T')[0] , endDate : new Date(categoryData.endDate).toISOString().split('T')[0]} ;
        setCategoryData(tempCategoryData);
        disableScroll();
        return ()=>{enableScroll()}
    },[])


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
            let tempEmailList = currentCategory.colaborators.map((elem)=>elem.emailId);
            setColaboratorEmails(colaboratorEmails.filter((email) => !tempEmailList.includes(email)));
            let previousEmailList = colaboratorEmails.filter((email) => tempEmailList.includes(email));
            tempEmailList = colaboratorEmails.filter((email) => !tempEmailList.includes(email));
            patchCategory(categoryData,tempEmailList,previousEmailList,setCategoryList);
            setEditCategoryOpen(false);
    }

    return ( <>
        <div className="popUpBackDropEditCategory" >
            <div className="popUpContentEditCategoryWrapper">
                <div className="titleOfEditCategory">
                    <div className="editCategoryName">
                        Edit Category
                    </div>
                </div>
                {
                    editCategoryElements.map((elem,index)=>{
            
                        return (
                                <div className="editCategoryInputWrapper" key={index}>
                                    <div className="editCategoryLabelLeft">
                                        {elem.inputLabel}
                                    </div>
                                    <div className="editCategoryInputRight">
                                        {  
                                           (elem.id!='categoryColaboratorsInput')?
                                           <input type={elem.inputType}  placeholder={currentCategory.keyForDB} value={categoryData[elem.keyForDB] }  id={elem.id} className='editCategoryInputs' onChange={(e)=>{handleInputChange(elem.keyForDB,e.target.value)}}/>
                                           :
                                           (elem.id=='categoryColaboratorsInput')?
                                            <ColaboratorsInputComponent theme={theme} colaboratorEmails={colaboratorEmails} setColaboratorEmails={setColaboratorEmails}/>
                                            : ''
                                        }
                                    </div>
                                </div>
                            )
                        }
                    )
                }

                <div className="editCategoryControlElem">
                    <div className="submitEditCategoryBtn" onClick={()=>{handleCategorySubmit();}}>
                        Edit Category
                    </div>
                    <div className="cancelEditCategoryBtn" onClick={()=>{setEditCategoryOpen(false)}}>
                        Cancel
                    </div>
                </div>
                
            </div>
        </div>
    </> );
};

export default EditCategoryPopUpComponent;


function ColaboratorsInputComponent({theme,colaboratorEmails,setColaboratorEmails}){
    const [colaboratorCount , setColaboratorCount] = useState(colaboratorEmails.length);

    useEffect(()=>{
        console.log(colaboratorEmails,colaboratorCount);
    },[])

    const handleEditBtnColaborator = (currentColabCount) => {
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
                        <input type="text" placeholder='Enter Colaborator Email Id'  className='editCategoryInputs'
                            value={colaboratorEmails[index]} onChange={(e) => handleEmailChange(index, e.target.value)} 
                        />
                        {(index==colaboratorCount-1)?
                            <div className="addBtnColaborator" onClick={()=>handleEditBtnColaborator('add')}>
                                    <img src={(theme=='light')?addIconCircleLight:addIconCircleDark} alt={"add"} height={25} width={25} />
                            </div>
                                    :
                            <div className="addBtnColaborator" onClick={()=>handleEditBtnColaborator('minus')}>
                                <img src={(theme=='light')?minusIconLight:minusIconDark} alt={"minus"} height={25} width={25} />
                            </div>
                            }
                    </div>)
                })            
        }
        </>
    )
}