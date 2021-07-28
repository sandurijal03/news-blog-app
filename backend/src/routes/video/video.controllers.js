const paginate = require('express-paginate');

const Video = require('../../models/Video');

const createVideo = async (req, res) => {
  try {
    const newVideo = await new Video({
      ...req.body,
      createdBy: req.user._id,
    });

    await newVideo.save();
    return res.status(201).json({
      message: 'Video successfully created',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const deleted = await Video.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Video with that id is not found',
      });
    }

    return res.status(204).json({
      success: true,
      message: 'Video successfully deleted.',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVideo = async (req, res) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Video successfully updated',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleVideo = async (req, res) => {
  try {
    let Video = await Video.findByIdAndUpdate(req.params.id, {
      $inc: { viewsCount: 1 },
    });
    if (!Video) {
      return res.status(404).json({
        message: 'Video with that id is not found.',
      });
    }

    return res.status(200).json({
      success: true,
      Video,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getVideos = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      Video.find({})
        .populate('category title')
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      Video.count({}),
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

const getTopVideos = async (req, res) => {
  try {
    let results = Video.find({})
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

module.exports = {
  createVideo,
  deleteVideo,
  updateVideo,
  getSingleVideo,
  getVideos,
  getTopVideos,
};
