const { auth } = require("../middleware/auth");
const { validateschema } = require("../middleware/validation");
const {
  addCategory,
  updateCategory,
  getCategories,
  deleteCategory,
  filterByName,
  sortByName,
} = require("../serviceRouter/category/category.service");
const {
  validateaddCategory,
} = require("../serviceRouter/category/category.validation");

const router = require("express").Router();
router.post(
  "/addCategory",
  auth(),
  validateschema(validateaddCategory),
  addCategory
);
router.patch("/updatecategory/:id", auth(), updateCategory);
router.get("/getCategory", auth(), getCategories);
router.delete("/deleteCategory/:id", auth(), deleteCategory);
router.get("/filterByName", filterByName);
router.get("/sortByName", sortByName);
module.exports = router;
