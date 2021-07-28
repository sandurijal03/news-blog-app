const crypto = require('crypto');

const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const register = async (req, res) => {
  const { name, email, image, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        email: 'email is already taken',
        message: 'Registration failure',
        success: false,
      });
    }

    const hashedPassword = await hash(password, 12);

    const code = crypto.randomInt(100000, 1000000);

    const newUser = await new User({
      name,
      email,
      image,
      role,
      password: hashedPassword,
      verificationCode: code,
    });

    await newUser.save();

    return res.status(201).json({
      message: 'successfully registered',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Email login attempt',
        email: 'Incorrect  Email',
      });
    }

    let isMatched = await compare(password, user.password);
    if (!isMatched) {
      return res.status(403).json({
        success: false,
        message: 'Either username or password is incorrect',
        password: 'Incorrect Password',
      });
    }

    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '7d',
      },
    );

    let profile = {
      email: user.email,
      role: user.role,
      name: user.name,
    };

    let result = {
      user: profile,
      token: token,
    };

    return res.status(200).json({
      success: true,
      ...result,
      message: 'Login Success',
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const verify = async (req, res) => {
  try {
    let { code } = req.body;
    const user = await User.findOne({ verificationCode: code });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Code',
      });
    } else if (user.isEmailVerified) {
      return res.status(404).json({
        message: 'Email already registered',
        success: false,
      });
    }
    await user.update({ isEmailVerified: true });
    return res.status(201).json({
      message: 'Email verification succeess',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid email',
      });
    }
    const code = crypto.randomInt(100000, 1000000);
    const passwordResetCode = await hash(code.toString(), 12);
    await user.update({ passwordResetCode });
    return res.status(200).json({
      message: 'Verification code is send to email',
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    let { email, code, newPassword } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid email',
      });
    }
    let isMatched = await compare(code.toString(), user.passwordResetCode);
    if (!isMatched) {
      return res.status(404).json({
        success: false,
        message: 'Invalid Code',
      });
    }

    const hashedPassword = await hash(newPassword, 12);
    await user.update({ password: hashedPassword, passwordResetCode: '' });
    return res.status(201).json({
      success: true,
      message: 'Password reset succeessfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

const changePassword = async () => {
  try {
    let { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    let isMatched = await compare(oldPassword, user.password);
    if (!isMatched) {
      return res.status(404).json({
        success: false,
        message: 'Password is incorrect',
      });
    }

    const hashedPassword = await hash(newPassword, 12);

    await user.update({ password: hashedPassword });
    return res.status(201).json({
      success: true,
      message: 'Password reset succeessfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  register,
  login,
  verify,
  forgotPassword,
  resetPassword,
  changePassword,
};
