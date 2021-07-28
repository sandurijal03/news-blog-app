const Comment = require('../../models/Comment');

const createComment = async (req, res) => {
  try {
    const newComment = await new Comment({
      ...req.body,
      createdBy: req.user._id,
    });

    await newComment.save();
    return res.status(201).json({
      message: 'Comment successfully created',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Comment with that id is not found',
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

module.exports = {
  createComment,
  deleteComment,
};
