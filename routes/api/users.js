const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config');
const auth = require('../../middleware/auth');

//router.get('/', (req, res) => res.send('User API Route'));

//@Route api/users
//@Desc Register a new user
//@Access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Create a new instance
      user = new User({
        name,
        email,
        password
      });

      //Encrypt Password
      const salt = await bcrypt.genSalt(10); //generate the phrase
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return logged in token and payload
      const payload = {
        user: {
          id: user.id
        }
      };

      //generate auth token for user
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@Route api/users
//@Desc Save User Profile
//@Access Private
router.put(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('department', 'Department is required')
        .not()
        .isEmpty(),
      check('position', 'Position is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //Get exsisting user record
      const user = await User.findById(req.user.id).select('-password');

      if (user) {
        const { name, email, department, position, cellphone } = req.body;

        user.name = name;
        user.email = email;
        user.department = department;
        user.position = position;
        user.cellphone = cellphone;

        await user.save();
        res.json(user);
      } else {
        return res
          .status(500)
          .json({ errors: [{ msg: 'User record not found' }] });
      }
    } catch (err) {
      res.status(500).send('Server error');
    }
  }
);

//@Route api/users
//@Desc Get Current User Data without password
//@Access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
