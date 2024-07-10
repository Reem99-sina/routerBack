const categoryModel = require("../../DB/model/category.model");
const userModel = require("../../DB/model/user.model");

module.exports.addCategory = async (req, res) => {
  const { name, tasks, lists } = req.body;
  if (req.user) {
    const newCategory = new categoryModel({
      name,
      tasks,
      lists,
      createdBy: req.user.id,
    });
    let saveCategory = await newCategory.save();
    let userCategory = await userModel.findByIdAndUpdate(req.user.id, {
      $push: { categories: saveCategory },
    });
    res.status(200).json({
      message: "category added successfully",
      saveCategory,
      userCategory,
    });
  } else {
    res.status(401).json({ message: "you need login" });
  }
};
module.exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  if (id) {
    if (req.user) {
      const newCategory = await categoryModel.findOneAndUpdate(
        { _id: id, createdBy: req.user.id },
        req.body,
        { new: true }
      );
      if (newCategory) {
        res
          .status(200)
          .json({ message: "category updated successfully", newCategory });
      } else {
        res.status(401).json({
          message:
            "you should be the created user to categoryto update it or id of category not exist",
        });
      }
    } else {
      res.status(401).json({ message: "you need login" });
    }
  } else {
    res.status(401).json({ message: "you need id of category to edit" });
  }
};
module.exports.getCategories = async (req, res) => {
  const { page, size } = req.query;
  if (req.user) {
    await categoryModel.paginate(
      { createdBy: req.user.id },
      {
        page: page || 0,
        limit: size || 8,
        populate: [
          {
            path: "tasks",
          },
          {
            path: "lists",
          },
        ],
        sort: { name: 1 },
      },
      (err, result) => {
        if (err) {
          res.status(401).json({
            message:
              "you should be the created user to categoryto get it or id of category not exist",
          });
        } else {
          res.status(200).json({
            count: result.totalDocs,
            page: result.page,
            nextPage: result.nextPage,
            size: result.limit,
            Category: result.docs,
          });
        }
      }
    );
  } else {
    res.status(401).json({ message: "you need login" });
  }
};
module.exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (id) {
    if (req.user) {
      const newCategory = await categoryModel.findOneAndDelete({
        _id: id,
        createdBy: req.user.id,
      });
      if (newCategory) {
        res
          .status(200)
          .json({ message: "category deleted successfully", newCategory });
      } else {
        res.status(401).json({
          message:
            "you should be the created user to categoryto get it or id of category not exist",
        });
      }
    } else {
      res.status(401).json({ message: "you need login" });
    }
  } else {
    res.status(401).json({ message: "you need id of category to delete" });
  }
};
module.exports.filterByName = async (req, res) => {
  const { name } = req.query;
  const newCategory = await categoryModel.find({
    name: { $regex: name },
  });
  if (newCategory) {
    res.status(200).json({ newCategory });
  } else {
    res.status(401).json({ message: "error in filter" });
  }
};
module.exports.sortByName = async (req, res) => {
  const newCategory = await categoryModel.find({}).sort("name");
  if (newCategory) {
    res.status(200).json({ newCategory });
  } else {
    res.status(401).json({ message: "error in filter" });
  }
};
