import { isOnline } from "../App";

export const sendHttpRequest = async (url , method, data) => {
    let returnData ;

    // If not online : 
    if (!isOnline) {
        // Store the API call in local storage if there is no internet connection
        const queuedRequest = { url, method, data };
        const queuedRequests = JSON.parse(localStorage.getItem('queuedRequests')) || [];
        queuedRequests.push(queuedRequest);
        localStorage.setItem('queuedRequests', JSON.stringify(queuedRequests));
        console.log('API call queued:', queuedRequest);
    
        // Return a placeholder or error response
        return { error: 'No internet connection. API call queued.' };
      }

    await fetch(url,{
        method : method ,
        body : JSON.stringify(data),
        headers : {'content-Type' : 'application/json'}
    }).then((response)=>{ return response.json()}).then((response)=>returnData=response).catch(err=>console.log(JSON.stringify(err)));
    return returnData;
}


 // Function to execute queued API calls
 export const executeQueuedRequests = async () => {
  const queuedRequests = JSON.parse(localStorage.getItem('queuedRequests')) || [];

  for (const request of queuedRequests) {
    const { url, method, data } = request;

    try {
      const response = await sendHttpRequest(url, method, data);
      console.log('API call executed:', response);
        
    } catch (error) {
      console.error('API call failed:', error);
    }
  }

  // Clear the queued requests from local storage
  localStorage.removeItem('queuedRequests');
};

// getting user by data and loggging in
export const loginCurrentUser = async (tempCurrentUser,setCurrentUser,setGotUser) => {
    const getUserByData = `http://localhost:3000/api/v1/users/getUserByData`;
    const postCurrentUserUrl = `http://localhost:3000/api/v1/users/postUser`;
    console.log(tempCurrentUser);
    let responseUserData = await sendHttpRequest(getUserByData,'POST',tempCurrentUser);
    console.log(responseUserData);
    if(responseUserData && responseUserData.success==true){
        setCurrentUser(responseUserData.data);
        localStorage.setItem('userId',responseUserData.data._id);
        setGotUser(true);
    }else if(responseUserData && responseUserData.message == 'No such user exist or something went wrong!'){
        const postedNewUser = await sendHttpRequest(postCurrentUserUrl,'POST',tempCurrentUser);
        if(postedNewUser.success == true){
            setCurrentUser(postedNewUser.data);
            localStorage.setItem('userId',postedNewUser.data._id)
            console.log("User posted succesfully!");
            setGotUser(true);
        }else{
            console.log("something went wrong while posting new user!");
        }
    }else{
        console.log("some unknown server error occured!");
    }
}

// connect to server
export const connectToServerFunc = async (setConnectedToServer)=>{
    const getHealthApi = `http://localhost:3000/api/v1/health`;
    const res = await sendHttpRequest(getHealthApi,`GET`);
    if(res && res.success==true){
        console.log("connected to server!");
        setConnectedToServer(true);
    }
}

export const toggleTheme = (newTheme,newPallete,setTheme)=>{
    localStorage.setItem('data-theme',newTheme);
    localStorage.setItem('data-pallete',newPallete);
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme',newTheme);
    document.documentElement.setAttribute('data-pallete',newPallete);
}

// get categories by userID
export const getCategoriesByUserId = async (userId,setCategoryList) => {
    console.log("get categories check ",userId);
    const getCategoriesByUserIdUrl = `http://localhost:3000/api/v1/categories/getCategoriesByUserId/${userId}`;
    const categoriesResponseData = await sendHttpRequest(getCategoriesByUserIdUrl,'GET');
    console.log("categories response data ",categoriesResponseData);
    if(categoriesResponseData && categoriesResponseData.success == true){
        console.log("category fetched successfully!");
        setCategoryList(categoriesResponseData.data);
    }else if(categoriesResponseData && categoriesResponseData.success == false){
        console.log("error while fetching categories " , categoriesResponseData.message);
    }else{
        console.log("something else went wrong while fetching categories!");
    }
}


// get tasks by category ID
export const getTasksByCategoryId = async (categoryId,setTaskList) => {
    const getTasksByCategoryIdUrl = `http://localhost:3000/api/v1/tasks/getTasksByCategoryId/${categoryId}`;
    const tasksResponseData = await sendHttpRequest(getTasksByCategoryIdUrl,'GET');
    console.log(tasksResponseData,"tasksResponseData at get task by id");
    if(tasksResponseData && tasksResponseData.success == true){
        console.log("tasks fetched successfully!");
        setTaskList((prevTaskList) => {
            const updatedTaskList = [
              ...prevTaskList.filter((task) => !tasksResponseData.data.some((newTask) => newTask._id === task._id)),
              ...tasksResponseData.data
            ];
            return updatedTaskList;
          });
    }else if(tasksResponseData && tasksResponseData.success == false){
        console.log("error while fetching tasks " , tasksResponseData.message);
    }else{
        console.log("something else went wrong while fetching tasks!");
    }
}


// posting new category and side effects : 
        export const postCategory = async (updatedCategory,colaboratorEmails=[],currentUser,setCategoryList) => {
            console.log(" Inside post Category! : ");
            updatedCategory['tasks'] = [];
            updatedCategory['createdBy'] = currentUser._id;
            console.log(updatedCategory);
            // validating datas
            if(updatedCategory.categoryName == null || updatedCategory.description == null || updatedCategory.startDate == null || updatedCategory.endDate == null ||  updatedCategory.createdBy == null  ){
                console.log("Enter valid category details!");
                alert('Enter valid category details!');
                return;
            }
            let colaboratorIdArray = [];
            if(colaboratorEmails.length!=0){
                    // fetching colaborator IDs
                    colaboratorIdArray = await getColaboratorsIdArray(colaboratorEmails);
                    // validating fetched colaborator ID's
                    console.log(colaboratorEmails.length , colaboratorIdArray.length);
                    if(colaboratorEmails.length == colaboratorIdArray.length){
                        updatedCategory['colaborators'] = [currentUser._id];
                    }else{
                        console.log("Something went wrong while adding colaborators!");
                        return;
                    }
            }
            
            // posting new category
            const postCategoryUrl = `http://localhost:3000/api/v1/categories/postCategory`;
            const postedCategoryResponse = await sendHttpRequest(postCategoryUrl,'POST',updatedCategory);
            console.log(postedCategoryResponse);
            if(postedCategoryResponse && postedCategoryResponse.success == false){
                console.log("Something went wrong while posting category!");
            }else if(postedCategoryResponse && postedCategoryResponse.success == true){
                console.log("New category posted successfully ");
                console.log(postedCategoryResponse.data);
                // adding current user with new category
                setCategoryList((prevCategoryData) => {
                    let updatedData = [...prevCategoryData,postedCategoryResponse.data];
                    return updatedData;
                });
                if(colaboratorEmails.length!=0){
                    // inviting other users for colaborating
                    patchUserForInvites(colaboratorIdArray,postedCategoryResponse.data._id);
                }
            }else{
                console.log("Something else went wrong while posting category!");
            }
        }


        export const getColaboratorsIdArray = async (colaboratorEmails) => {
            const getUserByEmail = 'http://localhost:3000/api/v1/users/getUserByEmail';  
            try {
            const promises = colaboratorEmails.map(async (email) => {
                const responseUserData = await sendHttpRequest(getUserByEmail, 'POST', { emailId: email });
                if (responseUserData && responseUserData.success) {
                console.log('Colaborator fetched successfully', responseUserData.data._id);
                return responseUserData.data._id;
                } else if (responseUserData && responseUserData.success === false) {
                console.log('Make sure to add an already existing user as a colaborator!');
                alert('Make sure to add an already existing user as a colaborator!');
                return null;
                } else {
                console.log('Something went wrong while fetching colaborators!');
                return null;
                }
            });
        
            const colaboratorIdArray = await Promise.all(promises);
            const filteredColaborators = colaboratorIdArray.filter((colaborator) => colaborator !== null);
            return filteredColaborators;
            } catch (error) {
            console.log('Error occurred while fetching colaborators:', error);
            return [];
            }
        };


        export const patchUserForInvites = async (colaboratorIdArray , categoryId) => {
            const patchManyUserWithInviteUrl = `http://localhost:3000/api/v1/users/patchManyUserWithInvites`;
            console.log("category Id check",categoryId);
            const patchableData = {colaborators : colaboratorIdArray,categoryId : categoryId};
            const patchedUserResponse = await sendHttpRequest(patchManyUserWithInviteUrl , 'PATCH' , patchableData);
            console.log(patchedUserResponse,"checking patch");
            if(patchedUserResponse && patchedUserResponse.success == false){
                console.log("Something went wrong while patching users with invite!");
            }else if(patchedUserResponse && patchedUserResponse.success == true){
                console.log("Users patched Invites!");
                console.log(patchedUserResponse.data);
            }else{
                console.log("Something else went wrong while patching users with invite!");
            }
        }

// End of posting new category and side effects -----------------------------------------------------------------------------------------


// post Task --------------------------->
export const postTask = async (addTaskObject,setTaskList,setCategoryList) => {
    if(addTaskObject.taskName == null || addTaskObject.category == null || addTaskObject.description==null || addTaskObject.endDate==null || addTaskObject.weight ==null || addTaskObject.completed == null){
        alert('send valid details!');
        console.log("send valid details!");
        return;
    }
    const postTaskUrl = `http://localhost:3000/api/v1/tasks/postTask`;
    console.log("task  check",addTaskObject);
    const postedTaskResponse = await sendHttpRequest(postTaskUrl , 'POST' , addTaskObject);
    console.log(postedTaskResponse,"checking post task");
    if(postedTaskResponse && postedTaskResponse.success == false){
        console.log("Something went wrong while posting Task!");
    }else if(postedTaskResponse && postedTaskResponse.success == true){
        console.log("posted Task!");
        console.log(postedTaskResponse.data);
        patchCategoryWithWeight(addTaskObject,setCategoryList);
        setTaskList((prevTaskList)=>{
            let updatedTaskData = [...prevTaskList.filter((task) => !postedTaskResponse.data_id),postedTaskResponse.data];
            console.log(updatedTaskData);
            return updatedTaskData;
        });
    }else{
        console.log("Something else went wrong while posting Task!");
    }
}

// patch category with overall weight increase and percentage decrease
export const patchCategoryWithWeight = async (taskObject,setCategoryList) => {
    if(taskObject==null){
        console.log("send valid completed data");
        return;
    }
    // getting category 
    const getCategoryDataUrl = `http://localhost:3000/api/v1/categories/getUniqueCategoryById/${taskObject.category}`;
    const responseObject = await sendHttpRequest(getCategoryDataUrl , 'GET');
    console.log(responseObject,"checking gotten object");
    if(responseObject && responseObject.success == false){
        console.log("Something went wrong while getting object!");
    }else if(responseObject && responseObject.success == true){
        console.log("got object!");
        console.log(responseObject.data);
    }else{
        console.log("Something else went wrong while patching Task!");
    }

    const updatedCategoryData = {overAllWeight : responseObject.data.overAllWeight + taskObject.weight , tasksCount : responseObject.data.tasksCount + 1 }
    const patchCategoryUrl = `http://localhost:3000/api/v1/categories/patchCategoryById/${taskObject.category}`;
    console.log("category  check",updatedCategoryData);
    const patchedCategoryResponse = await sendHttpRequest(patchCategoryUrl , 'PATCH' , updatedCategoryData);
    console.log(patchedCategoryResponse,"checking patch category");
    if(patchedCategoryResponse && patchedCategoryResponse.success == false){
        console.log("Something went wrong while patching category!");
    }else if(patchedCategoryResponse && patchedCategoryResponse.success == true){
        console.log("patched category!");
        console.log(patchedCategoryResponse.data);
        setCategoryList((prevCategoryList)=>{
            // let updatedCategoryList = [...prevCategoryList,patchedCategoryResponse.data];
            let updatedCategoryList = prevCategoryList.map((category)=>{
                if(category._id!=patchedCategoryResponse.data._id){
                    return category;
                }else{
                    return patchedCategoryResponse.data;
                }
            });
            return updatedCategoryList;
        })
    }else{
        console.log("Something else went wrong while patching category!");
    }
}


// patch task as completed or not completed
export const patchTask = async (taskId , patchableData,setTaskList) => {
    if(patchableData.completed==null){
        console.log("send valid completed data");
        return;
    }
    const patchTaskUrl = `http://localhost:3000/api/v1/tasks/patchTaskById/${taskId}`;
    console.log("task  check",patchableData);
    const patchedTaskResponse = await sendHttpRequest(patchTaskUrl , 'PATCH' , patchableData);
    console.log(patchedTaskResponse,"checking patch task");
    if(patchedTaskResponse && patchedTaskResponse.success == false){
        console.log("Something went wrong while patching Task!");
    }else if(patchedTaskResponse && patchedTaskResponse.success == true){
        console.log("patched Task!");
        console.log(patchedTaskResponse.data);
        setTaskList((prevTaskList)=>{
            let updatedTaskList = prevTaskList.map((task)=>{
                if(task._id!=patchedTaskResponse.data._id){
                    return task;
                }else{
                    return patchedTaskResponse.data;
                }
            })
            return updatedTaskList;
        });
    }else{
        console.log("Something else went wrong while patching Task!");
    }
}

// post report while completing a task
export const postReport = async (addReportObj) =>{
    if(addReportObj.category == null || addReportObj.taskCompleted == null || addReportObj.reportedBy==null || addReportObj.reportedDate==null || addReportObj.reportStatement ==null){
        alert('send valid details!');
        console.log("send valid details!");
        return;
    }
    const postReportUrl = `http://localhost:3000/api/v1/reports/postReport`;
    console.log("task  check",addReportObj);
    const postedReportResponse = await sendHttpRequest(postReportUrl , 'POST' , addReportObj);
    console.log(postedReportResponse,"checking post report");
    if(postedReportResponse && postedReportResponse.success == false){
        console.log("Something went wrong while posting report!");
    }else if(postedReportResponse && postedReportResponse.success == true){
        console.log("posted report!");
        console.log(postedReportResponse.data);
        // setReportList
    }else{
        console.log("Something else went wrong while posting report!");
    }
}

// deleteReport for marking task as not completed
export const deleteReport = async (taskId) =>{
    if(taskId==null){
        console.log("send valid details!");
        return; 
    }
    const deleteReportUrl = `http://localhost:3000/api/v1/reports/deleteReportByTaskId/${taskId}`;
    const gottenResponse = await sendHttpRequest(deleteReportUrl,'DELETE');
    if(gottenResponse && gottenResponse.success == true){
        console.log("transaction succesful", gottenResponse.data);
        // setReportList
    }else if(gottenResponse && gottenResponse.success == false){
        console.log("error during transaction",gottenResponse.message);
    }else {
        console.log("something else went wrong in the server");
    }
}

// updating category with weightsCompleted and contributors : 
export const patchCategoryOnTaskCompletion  = async (status , updationEmailId , weight, categoryId,setCategoryList) => {
    if(status==null || updationEmailId ==null || weight == null || categoryId == null){
        console.log("send valid completed data");
        return;
    }
    // getting category
    const getCategoryDataUrl = `http://localhost:3000/api/v1/categories/getUniqueCategoryById/${categoryId}`;
    const responseObject = await sendHttpRequest(getCategoryDataUrl , 'GET');
    console.log(responseObject,"checking gotten object");
    if(responseObject && responseObject.success == false){
        console.log("Something went wrong while getting object!");
    }else if(responseObject && responseObject.success == true){
        console.log("got object!");
        console.log(responseObject.data);
    }else{
        console.log("Something else went wrong while patching Task!");
    }
 
    let updatedCategoryData = {};
    if(status != 'completed'){
        updatedCategoryData.contribution = responseObject.data.contributions.map((contribution)=>{
            if(contribution.emailId != updationEmailId ){
                return  contribution;
            }else if(contribution.emailId == updationEmailId){
                let updatedContribution = {emailId : emailId , weightContributed : contribution.weightContributed - weight , numberOfTaskCompleted : contribution.numberOfTaskCompleted - 1};
                return updatedContribution;
            }     
        });
    }else {
        // let tempOverallWeight = (responseObject.data.weightsCompleted==null)?0 : responseObject.data.weightsCompleted + weight;
        let flag = false;
        updatedCategoryData.contribution = responseObject.data.contributions.map((contribution)=>{
            if(contribution.emailId != updationEmailId ){
                return  contribution;
            }else if(contribution.emailId == updationEmailId){
                let updatedContribution = {emailId : emailId ,  weightContributed : contribution.weightContributed + weight , numberOfTaskCompleted : contribution.numberOfTaskCompleted + 1};
                flag = true;
                return updatedContribution;
            }     
        })
        if(flag==false){
                updatedCategoryData.contribution = [...responseObject.data.contributions,{emailId : updationEmailId , weightContributed  : weight ,numberOfTaskCompleted : 1 }]
        }
    }

     updatedCategoryData.overAllWeight =  (status ==  'completed')?(responseObject.data.weightsCompleted + weight) 
                                                                        : (responseObject.data.weightsCompleted - weight);
    const patchCategoryUrl = `http://localhost:3000/api/v1/categories/patchCategoryById/${categoryId}`;
    console.log("task  check",updatedCategoryData);
    const patchedCategoryResponse = await sendHttpRequest(patchCategoryUrl , 'PATCH' , updatedCategoryData);
    console.log(patchedCategoryResponse,"checking patch category");
    if(patchedCategoryResponse && patchedCategoryResponse.success == false){
        console.log("Something went wrong while patching category!");
    }else if(patchedCategoryResponse && patchedCategoryResponse.success == true){
        console.log("patched category with overallweight and contribution!");
        console.log(patchedCategoryResponse.data);
        setCategoryList((prevCategoryList)=>{
            // let updatedCategoryList = [...prevCategoryList,patchedCategoryResponse.data];
            let updatedCategoryList = prevCategoryList.map((category)=>{
                if(category._id!=patchedCategoryResponse.data._id){
                    return category;
                }else{
                    return patchedCategoryResponse.data;
                }
            });
            return updatedCategoryList;
        })
    }else{
        console.log("Something else went wrong while patching category!");
    }
}

// accepting invite
export const acceptInvite = async (currentUser , invitedCategoryId,setCategoryList) => { 
    console.log("category Id check",currentUser,invitedCategoryId);
    const patchUserWithAcceptedInviteUrl = `http://localhost:3000/api/v1/users/patchUserById/${currentUser._id}`;
    // patch user with deleted invite
    const updatedInvites = currentUser.invites.map((invite)=>{if(invite._id!=invitedCategoryId)return invite._id});
    console.log("checking updated invited at accept " , updatedInvites);
    const patchableDataForDeleteInvite = {invites : updatedInvites,updateInvite:  true};
    const patchedUserResponse = await sendHttpRequest(patchUserWithAcceptedInviteUrl , 'PATCH' , patchableDataForDeleteInvite);
    console.log(patchedUserResponse,"checking patch");
    if(patchedUserResponse && patchedUserResponse.success == false){
        console.log("Something went wrong while patching users with invite!");
    }else if(patchedUserResponse && patchedUserResponse.success == true){
        console.log("Users patched Invites!");
        console.log(patchedUserResponse.data);
        // add as colaborator in category
        updateColaboratorInCategory(invitedCategoryId,currentUser._id,setCategoryList);
    }else{
        console.log("Something else went wrong while patching users with invite!");
    }
}

export const updateColaboratorInCategory = async (invitedCategoryId , currentUserId,setCategoryList) => { 
    // getting the category here : 
    const getUniqueCategoryByIdUrl = `http://localhost:3000/api/v1/categories/getUniqueCategoryById/${invitedCategoryId}`;
    const inviteCategoryResponse = await sendHttpRequest(getUniqueCategoryByIdUrl,'GET');
    console.log(inviteCategoryResponse,"checking patch2");
    if(inviteCategoryResponse && inviteCategoryResponse.success == false){
        console.log("something went wrong while getting category unique!");
        return;
    }
    console.log("get category response update category ",inviteCategoryResponse);
    // patch cateogory with new colaborator
    const patchCategoriesWithNewColaboratorUrl = `http://localhost:3000/api/v1/categories/patchCategoryById/${invitedCategoryId}`;
    const prevColaboratorsArray = inviteCategoryResponse.data.colaborators.map((colaborator)=>colaborator._id);
    const patchableColaboratorsData = {colaborators : [ ...prevColaboratorsArray,currentUserId]};
    console.log("patchabel colaborator data",patchableColaboratorsData);
    const patchedCategoryResponse = await sendHttpRequest(patchCategoriesWithNewColaboratorUrl , 'PATCH' , patchableColaboratorsData);
    console.log(patchedCategoryResponse,"checking patch3");
    console.log(patchedCategoryResponse,"checking patch");
    if(patchedCategoryResponse && patchedCategoryResponse.success == false){
        console.log("Something went wrong while patching users with category!");
    }else if(patchedCategoryResponse && patchedCategoryResponse.success == true){
        console.log("Users patched category!");
        console.log(patchedCategoryResponse.data);
        // add as colaborator in category
        getCategoriesByUserId(currentUserId,setCategoryList);
    }else{
        console.log("Something else went wrong while patching users with category!");
    }
}

// Rejecting invite

// accepting invite
export const rejectInvite = async (currentUser , invitedCategoryId) => { 
    const patchUserWithAcceptedInviteUrl = `http://localhost:3000/api/v1/users/patchUserById/${currentUser._id}`;
    // console.log("category Id check",categoryId);
    // patch user with deleted invite
    const updatedInvites = currentUser.invites.map((invite)=>{if(invite._id!=invitedCategoryId)return invite._id});
    const patchableDataForDeleteInvite = {invites : updatedInvites,updateInvite:  true};
    const patchedUserResponse = await sendHttpRequest(patchUserWithAcceptedInviteUrl , 'PATCH' , patchableDataForDeleteInvite);
    console.log(patchedUserResponse,"checking patch");
    if(patchedUserResponse && patchedUserResponse.success == false){
        console.log("Something went wrong while patching users with invite!");
    }else if(patchedUserResponse && patchedUserResponse.success == true){
        console.log("Users patched Invites!");
        console.log(patchedUserResponse.data);
    }else{
        console.log("Something else went wrong while patching users with invite!");
    }
}