const { auth } = require("../middleware/auth");
const { validateschema } = require("../middleware/validation");
const {
  updateListTask,
  getTash,
  getPrivateTash,
  deleteListTask,
  filterByShare,
  getstoreTash,
} = require("../serviceRouter/list/list.service");
const {
  validateupdateListTask,
} = require("../serviceRouter/list/list.validation");

const router = require("express").Router();
router.patch(
  "/task/:id",
  auth(),
  validateschema(validateupdateListTask),
  updateListTask
);
router.get("/sharedTask", getTash);
router.get("/privateTask", auth(), getPrivateTash);
router.get("/filterByShare", auth(), filterByShare);
router.get("/sortTask", auth(), getstoreTash);
router.delete("/deleteListTask/:id", auth(), deleteListTask);
module.exports = router;
