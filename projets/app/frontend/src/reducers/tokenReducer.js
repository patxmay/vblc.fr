import { CONTRI_TOKEN_ONCE_LOGGED } from "../components/administrator/signInContributor";

const initialState = ("");

export default function tokenReducer(state = initialState, action) {

  switch (action.type) {

    case CONTRI_TOKEN_ONCE_LOGGED:
      return action.payload;
      
    default:
      return state;
  }
};


