const Sequelize = require('sequelize')
const db = require('../db')

// may not need this model depending on the way I want to keep track of things.
const Game = db.define('game', {})
