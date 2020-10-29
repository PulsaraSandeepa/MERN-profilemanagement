import { GET_ERRORS } from "../actions/types";
const initialState = {};
//action - dispatch actions to this reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      //payload includes response comming from the server
      return action.payload;
    default:
      return state;
  }
}
