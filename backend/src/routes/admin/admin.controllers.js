const User = require('../../models/User');
const paginate = require('express-paginate');

const getSingleAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'User with that id is not found.',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const [results, itemCount] = await Promise.all([
      User.find({})
        .sort({ createdAt: -1 })
        .limit(req.query.limit)
        .skip(req.skip)
        .lean()
        .exec(),
      User.count({}),
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
  getAllAdmin,
  getSingleAdmin,
};
