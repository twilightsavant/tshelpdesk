const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Tickets = require('../../models/Tickets');
const User = require('../../models/User');

//@Route POST api/tickets/lock
//@Desc Lock ticket so it can't be edited
//@Access Private
router.post('/closed/:id', [auth], async (req, res) => {
  try {
    //get the ticket
    const ticket = await Tickets.findById(req.params.id);

    ticket.closed = true;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@Route POST api/tickets/lock
//@Desc Open ticket so it can't be edited
//@Access Private
router.post('/open/:id', [auth], async (req, res) => {
  try {
    //get the ticket
    const ticket = await Tickets.findById(req.params.id);

    ticket.closed = false;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@ Route POST api/tickets/comment
//@ Desc Comment on a help ticket
//@ Access Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('comment', 'Please enter your comment')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //find our users name
    let user = await User.findOne({ _id: req.user.id }).select('name');

    if (user) {
      //const ticketID = req.params.id;
      const { comment } = req.body;
      const ticket = await Tickets.findOne({ _id: req.params.id });
      if (ticket.locked) {
        return res.status(500).send('Server Error');
      }

      const newComment = {
        user: req.user.id,
        name: user.name,
        comment: comment
      };

      ticket.comments.push(newComment);
      ticket.lastActivity = new Date();

      //not from the creator not answered
      //comment is from the creator answered
      if (ticket.user.toString() === req.user.id) {
        ticket.answered = false;
      } else {
        ticket.answered = true;
      }

      await ticket.save();

      //clone without reference
      const payload = JSON.parse(JSON.stringify(ticket));

      //pull the ticket creators user
      user = await User.findById(ticket.user)
        .select('name department position')
        .then(result => {
          payload.userDepartment = result.department;
          payload.userPosition = result.position;
          payload.userName = result.name;
        });

      //Pull all the users that have commented:
      let userIds = [];
      ticket.comments.map(com => {
        userIds.unshift(com.user);
      });

      //console.log(userIds);

      payload.userInfo = [];

      //pull users info
      user = await User.find()
        .where('_id')
        .in(userIds)
        .select('name department position')
        .exec();

      user.map(u => {
        payload.userInfo.unshift(u);
      });

      return res.json(payload);
    }

    try {
      res.status(500).send('Server Error');
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

//@ Route GET api/tickets
//@ Desc Get all  tickets
//@Access Private
router.get('/statusSummary', auth, async (req, res) => {
  let payload = {
    open: 0,
    answered: 0,
    notAnswered: 0,
    closed: 0
  };

  try {
    let ticket = await Tickets.countDocuments({ closed: false }, function(
      err,
      count
    ) {
      payload.open = count;
    });

    ticket = await Tickets.countDocuments(
      { answered: 'true', closed: false },
      function(err, count) {
        payload.answered = count;
      }
    );

    ticket = await Tickets.countDocuments(
      { answered: 'false', closed: false },
      function(err, count) {
        payload.notAnswered = count;
      }
    );

    ticket = await Tickets.countDocuments({ closed: true }, function(
      err,
      count
    ) {
      payload.closed = count;
    });

    res.json(payload);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@ Route GET api/tickets
//@ Desc Get all  tickets
//@Access Private
router.get('/viewAllTickets', auth, async (req, res) => {
  try {
    const ticket = await Tickets.find()
      .sort({ createdDate: -1 })
      .limit(20)
      .select('-comments');
    res.json(ticket);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@ Route GET api/tickets/viewSingleTicket
//@ Desc Get data for a single ticket
//@Access Private
router.get('/viewTicket/:id', auth, async (req, res) => {
  try {
    const ticket = await Tickets.findById(req.params.id);

    //Modify the viewed by array
    if (
      ticket.viewedBy.filter(
        viewedBy => viewedBy.user.toString() == req.user.id
      ).length == 0
    ) {
      //not on it
      ticket.viewedBy.unshift({ user: req.user.id });
    }

    //Save down that this user view the comment
    ticket.save();

    //clone without reference
    const payload = JSON.parse(JSON.stringify(ticket));

    //pull the ticket creaters user
    let user = await User.findById(ticket.user)
      .select('name department position')
      .then(result => {
        payload.userDepartment = result.department;
        payload.userPosition = result.position;
        payload.userName = result.name;
      });

    //Pull all the users that have commented:
    let userIds = [];
    ticket.comments.map(com => {
      userIds.unshift(com.user);
    });

    //console.log(userIds);

    payload.userInfo = [];

    //pull users info
    user = await User.find()
      .where('_id')
      .in(userIds)
      .select('name department position')
      .exec();

    user.map(u => {
      payload.userInfo.unshift(u);
    });
    res.json(payload);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

//@Route PUT api/tickets
//@Desc Create/Edit new help desk ticket
//      Add ticketID to the post to edit a ticket
//@Access Private
router.post(
  '/',
  [
    auth,
    [
      check('subject', 'Please enter a subject')
        .not()
        .isEmpty(),
      check('message', 'Please enter a message/description')
        .not()
        .isEmpty(),
      check('topic', 'Please select a topic for the message')
        .not()
        .isEmpty(),
      check('priority', 'Please select a priority level')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      subject,
      message,
      topic,
      priority,
      assignedTo,
      ticketID = 0
    } = req.body;

    const ticketFields = {
      subject,
      message,
      topic,
      priority,
      assignedTo
    };
    try {
      let ticket = {};
      if (ticketID && mongoose.Types.ObjectId.isValid(ticketID)) {
        ticket = await Tickets.findById({ _id: ticketID });
        if (ticket) {
          //update
          ticket = await Tickets.findOneAndUpdate(
            { user: req.user.id, _id: ticketID },
            { $set: ticketFields },
            { new: true }
          );
          return res.json(ticket);
        }
      }

      //Create, add additional fields needed
      ticketFields.viewedBy = [];
      ticketFields.answered = false;
      ticketFields.user = req.user.id;

      ticketFields.ticket = new Tickets(ticketFields);
      await ticket.save();
      res.json(ticket);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
);

//

module.exports = router;
