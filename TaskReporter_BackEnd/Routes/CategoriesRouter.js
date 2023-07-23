const express = require('express');
const router = express.Router();
// const cors = require('cors');

// router.use(cors({origin : '*'}));
// router.use( cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }));

const {getCategories,getUniqueCategoryById,getCategoriesByUserId,postCategory,patchCategoryById,deleteCategoryById} = require('../Controllers/CategoriesController');

router.get('/getCategories',getCategories);
router.get('/getUniqueCategoryById/:id',getUniqueCategoryById);
router.get('/getCategoriesByUserId/:id',getCategoriesByUserId);
router.post('/postCategory',postCategory);
router.patch('/patchCategoryById/:id',patchCategoryById);
router.delete('/deleteCategoryById/:id',deleteCategoryById);


module.exports = router;