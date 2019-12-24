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

router.get('/:discordId/:gameSlug', async (req, res, next) => {
  try {
    let game
    const user = await User.findOne({
      where: {
        discId: req.params.discordId
      }
    })

    if (user) {
      game = await Game.findOne({
        where: {
          slug: req.params.gameSlug,
          userId: user.id
        }
      })
    } else {
      res.sendStatus(404)
    }
    res.status(200).json(game)
  } catch (error) {
    next(error)
  }
})

router.put('/:discordId/:gameSlug', async (req, res, next) => {
  try {
    let game
    const user = await User.findOne({
      where: {
        discId: req.params.discordId
      }
    })

    if (user) {
      game = await Game.findOne({
        where: {
          slug: req.params.gameSlug,
          userId: user.id
        }
      })
    } else {
      res.sendStatus(404)
    }
    // This will have to be sent the new total in its entirety
    // this is mostly a guess and untested but should look like this
    await game.update({
      timePlayed: req.body.total
    })

    res.status(200).json(game)
  } catch (error) {
    next(error)
  }
})

/*
* This is where You would update the start time col in the game model
*/
