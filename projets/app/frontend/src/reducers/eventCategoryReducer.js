import { EVENT_CATEGORY_FROM_THUMBNAIL } from "../components/events/events";
import { EVENT_CATEGORY_FROM_LIST } from "../components/events/events";
import {EVENT_SELECTED_FROM_HOME} from "../components/home/home"

const initialState = ("");

export default function eventCategoryReducer(state = initialState, action) {

  switch (action.type) {
    case EVENT_SELECTED_FROM_HOME:
    return action.payload

    case EVENT_CATEGORY_FROM_THUMBNAIL:
      return action.payload;

    case EVENT_CATEGORY_FROM_LIST:
      return action.payload;
      
    default:
      return state;
  }
};