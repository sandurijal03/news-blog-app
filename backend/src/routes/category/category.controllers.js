const Category = require('../../models/Category');
const paginate = require('express-paginate');

const createCategory = async (req, res) => {
  try {
    const newCategory = await new Category({
      ...req.body,
      createdBy: req.user._id,
    });

    await newCategory.save();
    return res.status(201).json({
      message: 'Category successfully created',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Category with that id is not found',
      });
    }

    return res.status(204).json({
      success: true,
      message: 'Item successfully deleted.',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Category successfully updated',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        message: 'Category with that id is not found.',
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Category.find({})
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Category.count({}),
    ]);

    const pageCount = Math.ceil(itemCount / req.query.limit);

    return res.status(200).json({
      success: true,
      object: 'list',
      has_more: paginate.hasNextPages(req)(pageCount),
      data: results,
      pageCount,
      itemCount,
      currentPage: req.query.page,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page),
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getSingleCategory,
};
