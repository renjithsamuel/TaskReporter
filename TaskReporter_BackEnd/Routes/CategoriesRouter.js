const express = require('express');
const router = express.Router();
const cors = require('cors');

router.use(cors({origin : '*'}));

const {getCategories,getUniqueCategoryById,postCategory,patchCategoryById,deleteCategoryById} = require('../Controllers/CategoriesController');

router.get('/getCategories',getCategories);
router.get('/getUniqueCategoryById/:id',getUniqueCategoryById);
router.post('/postCategory',postCategory);
router.patch('/patchCategoryById/:id',patchCategoryById);
router.delete('/deleteCategoryById/:id',deleteCategoryById);


module.exports = router;