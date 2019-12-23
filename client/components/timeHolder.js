import React from 'react'
import {connect} from 'react-redux'
import {setStartTimeThunk, setTotalTimeThunk} from '../store/game'

/*
* Component for front end time holding
*/

const timeHolder = props => {
  return (
    <div>
      <h2>Welcome to Time Holder, home of the Time Wizard</h2>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    game: state.game
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStartTime: () => dispatch(setStartTimeThunk()),
    setTotalTime: user => dispatch(setTotalTimeThunk(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(timeHolder)
