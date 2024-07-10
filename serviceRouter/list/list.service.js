const listtaskModel = require("../../DB/model/list.model");

module.exports.updateListTask = async (req, res) => {
  const { id } = req.params;
  if (req.user) {
    const newTaskSave = await listtaskModel.findOneAndUpdate(
      { _id: id, createdBy: req.user.id },
      req.body,
      { new: true }
    );
    if (newTaskSave) {
      res.status(200).json({ message: "done", newTask: newTaskSave });
    } else {
      res
        .status(401)
        .json({ message: "you can not edit  task and you are not created " });
    }
  } else {
    res.status(401).json({ error: "you need login" });
  }
};
module.exports.getTash = async (req, res) => {
  const { page, size } = req.query;
  await listtaskModel.paginate(
    { isShare: true },
    {
      page: page || 0,
      limit: size || 8,
      sort: { isShare: 1 },
    },
    (err, result) => {
      if (err) {
        res.status(400).json({ message: "error" });
      } else {
        res.status(200).json({
          count: result.totalDocs,
          page: result.page,
          nextPage: result.nextPage,
          size: result.limit,
          newTask: result.docs,
        });
      }
    }
  );
  //
};
module.exports.getPrivateTash = async (req, res) => {
  const { page, size } = req.query;
  if (req.user) {
    await listtaskModel.paginate(
      { isShare: false, createdBy: req.user.id },
      {
        page: page || 0,
        limit: size || 8,
        sort: { isShare: 1 },
      },
      (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json({
            count: result.totalDocs,
            page: result.page,
            nextPage: result.nextPage,
            size: result.limit,
            newTask: result.docs,
          });
        }
      }
    );
  } else {
    res.status(401).json({ error: "you need login" });
  }
};
module.exports.deleteListTask = async (req, res) => {
  const { id } = req.params;
  if (id) {
    if (req.user) {
      const newtask = await listtaskModel.findOneAndDelete({
        _id: id,
        createdBy: req.user.id,
      });
      if (newtask) {
        res.status(200).json({ message: "task deleted successfully", newtask });
      } else {
        res.status(401).json({
          message:
            "you should be the created user to task to get it or id of task not exist",
        });
      }
    } else {
      res.status(401).json({ message: "you need login" });
    }
  } else {
    res.status(401).json({ message: "you need id of task  to delete" });
  }
};
module.exports.filterByShare = async (req, res) => {
  const { isShare } = req.query;
  let newTask;
  if (isShare) {
    newTask = await listtaskModel.find({
      isShare,
    });
  } else {
    if (req.user) {
      newTask = await listtaskModel.find({
        isShare: false,
        createdBy: req.user.id,
      });
    } else {
      res.status(401).json({ message: "you need login" });
    }
  }
  if (newTask.length > 0) {
    res.status(200).json({ task: newTask });
  } else {
    res.status(401).json({ message: "no task" });
  }
};
module.exports.getstoreTash = async (req, res) => {
  const { page, size } = req.query;
  await listtaskModel.paginate(
    {},
    {
      page: page || 0,
      limit: size || 8,
      sort: { isShare: 1 },
    },
    (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({
          count: result.totalDocs,
          page: result.page,
          nextPage: result.nextPage,
          size: result.limit,
          task: result.docs,
        });
      }
    }
  );
};
