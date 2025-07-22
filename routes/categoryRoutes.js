const router = require("express").Router();
const categoryController = require("../controllers/categoriesController");

router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
router.put("/categories/:id", categoryController.updateCategoryById);
router.delete("/categories/:id", categoryController.deleteCategoryById);

module.exports = router;
