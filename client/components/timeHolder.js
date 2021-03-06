import React from 'react'
import {connect} from 'react-redux'
import {setStartTimeThunk, setTotalTimeThunk} from '../store/game'

/*
* Component for front end time holding

______ _________________ _____ _____  ___ _____ ___________
|  _  \  ___| ___ \ ___ \  ___/  __ \/ _ \_   _|  ___|  _  \
| | | | |__ | |_/ / |_/ / |__ | /  \/ /_\ \| | | |__ | | | |
| | | |  __||  __/|    /|  __|| |   |  _  || | |  __|| | | |
| |/ /| |___| |   | |\ \| |___| \__/\ | | || | | |___| |/ /
|___/ \____/\_|   \_| \_\____/ \____|_| |_/\_/ \____/|___/

*/

export const timeHolder = props => {
  console.log(props.user, 'USER')
  console.log(props.game, 'GAME')
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
