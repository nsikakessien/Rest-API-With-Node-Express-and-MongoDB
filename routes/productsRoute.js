const router = require("express").Router();
const productsController = require("../controllers/productsController");

router.post("/products", productsController.createProduct);
router.get("/products", productsController.getAllProducts);
router.get("/products/:id", productsController.getProductById);
router.put("/products/:id", productsController.updateProductById);
router.delete("/products/:id", productsController.deleteProductById);

module.exports = router;
