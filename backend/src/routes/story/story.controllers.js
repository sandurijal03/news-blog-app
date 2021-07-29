const paginate = require('express-paginate');

const Story = require('../../models/Story');
const Comment = require('../../models/Comment');

const createStory = async (req, res) => {
  try {
    const newStory = await new Story({
      ...req.body,
      createdBy: req.user._id,
    });

    if (!newStory.slug) {
      newStory.slug = generateSlug(newStory.title);
    }

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
    let story = await Story.findByIdAndUpdate(req.params.id, {
      $inc: { viewsCount: 1 },
    }).populate('category title');
    if (!story) {
      return res.status(404).json({
        message: 'Story with that id is not found.',
      });
    }

    story.comments = await Comment.find({ story: story._id });

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
        .populate('category title')
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Story.count({}),
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

const getTopStories = async (req, res) => {
  try {
    let results = Story.find({})
      .populate('category title')
      .sort({ viewsCount: -1 })
      .limit(req.query.limit)
      .lean()
      .exec();

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getOneBySlug = async (req, res) => {
  try {
    let story = await Story.findByIdAndUpdate(req.params.slug, {
      $inc: { viewsCount: 1 },
    }).populate('category title');
    if (!story) {
      return res.status(404).json({
        message: 'Story with that id is not found.',
      });
    }

    story.comments = await Comment.find({ story: story._id });

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

const generateSlug = (title) => {
  const slugText = title
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  return slugText;
};

module.exports = {
  createStory,
  deleteStory,
  updateStory,
  getSingleStory,
  getStories,
  getTopStories,
  getOneBySlug,
};
