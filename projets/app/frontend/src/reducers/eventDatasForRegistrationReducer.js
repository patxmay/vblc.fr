import { EVENT_DATAS_FOR_REGISTRATION } from "../components/events/eventsDetails"

const initialState = ("");

export default function eventDatasForRegistrationReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_DATAS_FOR_REGISTRATION:
      return action.payload

    default:
      return state
  }
}