import { TEAM_SELECTED_FROM_TEAMS } from "../components/teams/teams";

const initialState = ("");

export default function teamReducer(state = initialState, action) {

  switch (action.type) {

    case TEAM_SELECTED_FROM_TEAMS:
      return action.payload;
      
    default:
      return state;
  }
};