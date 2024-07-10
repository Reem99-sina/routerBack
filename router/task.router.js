const { auth } = require('../middleware/auth');
const { validateschema } = require('../middleware/validation');
const { addTask, updateTask, getTash, getPrivateTash, deleteTask, filterByShare, getstoreTash } = require('../serviceRouter/task/task.service');
const { validateaddTask, validateupdateTask } = require('../serviceRouter/task/task.validation');

const router = require('express').Router();
router.post("/addTask",auth(),validateschema(validateaddTask),addTask)
router.patch("/task/:id",auth(),validateschema(validateupdateTask),updateTask)
router.get("/sharedTask",getTash)
router.get("/privateTask",auth(),getPrivateTash)
router.delete("/deleteTask/:id",auth(),deleteTask)
router.get("/filterByShare",auth(),filterByShare)
router.get("/sortTask",getstoreTash)

module.exports = router;