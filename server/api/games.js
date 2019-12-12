const router = require('express').Router()
const {User, Game} = require('../db/models')
module.exports = router

/*
This will get all the games that a user has played in their
*/
router.get('/:discordId', async (req, res, next) => {
  try {
    let games
    const user = await User.findOne({
      where: {
        discId: req.params.discordId
      }
    })

    if (user) {
      games = await Game.findAll({
        where: {
          userId: user.id
        }
      })
    } else {
      res.sendStatus(404)
    }
    res.status(200).json(games)
  } catch (error) {
    next(error)
  }
})

/*
This should get a game that matches the game name and
the userId of the user that requests it
*/

// router.get('')
