const Story = require('../../models/Story');
const paginate = require('express-paginate');

const createStory = async (req, res) => {
  try {
    const newStory = await new Story({
      ...req.body,
      createdBy: req.user._id,
    });

    await newStory.save();
    return res.status(201).json({
      message: 'Story successfully created',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteStory = async (req, res) => {
  try {
    const deleted = await Story.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Story with that id is not found',
      });
    }

    return res.status(204).json({
      success: true,
      message: 'Story successfully deleted.',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateStory = async (req, res) => {
  try {
    await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Story successfully updated',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({
        message: 'Story with that id is not found.',
      });
    }

    return res.status(200).json({
      success: true,
      story,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getStories = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Story.find({})
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
  createStory,
  deleteStory,
  updateStory,
  getSingleStory,
  getStories,
};
