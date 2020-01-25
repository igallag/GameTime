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

router.post('/:discordId', async (req, res, next) => {
  try {
    console.log('inside the post route for games')
    const user = await User.findOne({
      where: {
        discId: req.params.discordId
      }
    })

    const game = await Game.create({
      name: req.body.game,
      userId: user.id
    })
    res.status(200).json(game)
  } catch (error) {
    next(error)
  }
})

// I this will potentially get depricated
router.post('/', async (req, res, next) => {
  try {
    let game = req.body
    console.log(game, 'this is game in gamesAPI')
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
    if (req.body.total) {
      let holder = game.timePlayed + req.body.total
      await game.update({
        timePlayed: holder
      })
    } else if (req.body.startTime) {
      await game.update({
        startTime: req.body.startTime
      })
    }

    res.status(200).json(game)
  } catch (error) {
    next(error)
  }
})
