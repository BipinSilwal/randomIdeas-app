const express = require('express');

const userRouter = express.Router();

const Idea = require('../models/idea');

userRouter.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).json({ success: true, data: ideas });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

userRouter.get('/:id', async (req, res) => {
  //   console.log(req.params);
  //   console.log(req.query);
  const idea = await Idea.findById(req.params.id);

  try {
    res.status(200).json({
      success: true,
      data: idea,
    });
  } catch (error) {
    res.status(404).json({
      success: 'false',
      error: 'resource not found',
    });
  }
});

userRouter.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    res.json({
      success: false,
      error: 'something went wrong',
    });
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const user = await Idea.findById(req.params.id);

    if (user.username === req.body.username) {
      const userUpdated = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({ success: true, data: userUpdated });
    }
    res.status(403).json({ success: false, error: 'access denied!!' });
  } catch (error) {
    res.status(404).json({ success: 'false', error: 'No such resource' });
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      const user = await Idea.findByIdAndDelete(req.params.id);
      return res.status(200).json({ success: true, message: 'user deleted!!' });
    }
    res.status(500).json({ success: false, message: ' access denied!' });
  } catch (error) {
    res.json({ success: false, message: 'no such user' });
  }
});

module.exports = userRouter;
