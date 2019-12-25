const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  // The User Model needs the information to DM a user
  // needs a list of subscribed games (through table probably)
  // will be able to subscribe to users again probably a through table as in User.hasMany(User as friends) or something like that
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  // There Will need to be a way to verify that these names arent busted
  timePlayed: {
    // this will be in minutes
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startTime: {
    type: Sequelize.INTEGER
  }
})

Game.beforeValidate(game => {
  /*
   * Generate slug
   */
  if (!game.slug) {
    game.slug = game.name
      .replace(/\s/g, '_')
      .replace(/\W/g, '')
      .replace(/_/g, '-')
      .toLowerCase()
  }
})

module.exports = Game
