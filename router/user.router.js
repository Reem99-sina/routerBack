const { auth } = require("../middleware/auth");
const { validateschema } = require("../middleware/validation");
const {
  signup,
  signin,
  getById,
} = require("../serviceRouter/user/user.service");
const {
  validatesignup,
  validatesignin,
} = require("../serviceRouter/user/user.validation");

const router = require("express").Router();
router.post("/signup", validateschema(validatesignup), signup);
router.post("/signin", validateschema(validatesignin), signin);
router.get("/getById", auth(), getById);
module.exports = router;
