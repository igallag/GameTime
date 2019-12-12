const router = require('express').Router()
const {User, Game} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Get a discord user by Id
router.get('/:discordId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      include: [{model: Game}],
      where: {
        discId: req.params.discordId
      }
    })
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

// This allows a user to add games to their subbed games
// Shouldadd some verification hooks in the model (will also comment there)
router.post('/:discordId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        discId: req.params.discordId
      }
    })
    let gameHolder = [...user.subGames, req.body.game]
    await user.update({
      subGames: gameHolder
    })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})
