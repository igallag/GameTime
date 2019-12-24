/* eslint-disable no-case-declarations */
import axios from 'axios'
/*
Action Types
*/
const START_TIME = 'START_TIME'
const TOTAL_TIME = 'TOTAL_TIME'

/*
Initial State
*/
const defaultState = {
  startTime: 0,
  totalTime: 0,
  endTime: 0
}

/*

______ _________________ _____ _____  ___ _____ ___________
|  _  \  ___| ___ \ ___ \  ___/  __ \/ _ \_   _|  ___|  _  \
| | | | |__ | |_/ / |_/ / |__ | /  \/ /_\ \| | | |__ | | | |
| | | |  __||  __/|    /|  __|| |   |  _  || | |  __|| | | |
| |/ /| |___| |   | |\ \| |___| \__/\ | | || | | |___| |/ /
|___/ \____/\_|   \_| \_\____/ \____|_| |_/\_/ \____/|___/

*/

/*
Action Creators
*/
const setStartTime = startTime => ({type: START_TIME, startTime})
const setTotalTime = totalTime => ({type: TOTAL_TIME, totalTime})

/*
Thunk Creators
*/
export const setStartTimeThunk = () => {
  return dispatch => {
    try {
      let time = Date.now()
      dispatch(setStartTime(time))
    } catch (error) {
      console.error(error)
    }
  }
}

export const setTotalTimeThunk = user => {
  return async dispatch => {
    try {
      let currTotal = await axios.get(`/api/games/${user.discId}`)
      console.log(currTotal, 'this is currTotal')
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case START_TIME:
      return {...state, startTime: action.startTime}
    case TOTAL_TIME:
      let timeHolder = state.startTime - Date.now()
      console.log(timeHolder, 'TIMEHOLDER ==========================')
      return state
    default:
      return state
  }
}
