const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:id", getOneProduct);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
