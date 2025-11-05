import { EVENT_SELECTED_FROM_HOME } from "../components/home/home";

const initialState = ("");

export default function eventSelectedReducer(state = initialState, action) {

  switch (action.type) {

    case EVENT_SELECTED_FROM_HOME:
      return action.payload;
      
    default:
      return state;
  }
};