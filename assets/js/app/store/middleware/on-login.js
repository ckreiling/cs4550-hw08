import { UPDATE_TOKEN } from "../actions/token";

// Actions to dispatch on login
import { fetchCurrentUser } from "../actions/user";
import { fetchAllUsers } from "../actions/all-users";

/**
 * Middleware for dispatching actions when update_token is called. This
 * populates the app with data right as the user is logging in - any fetching
 * actions that are necessary on-login should be put in here.
 */
const onLoginMiddleware = ({ dispatch, getState }) => next => action => {
  let result = next(action);
  if (action.type === UPDATE_TOKEN) {
    const token = action.payload;
    dispatch(fetchCurrentUser(token));
    dispatch(fetchAllUsers());
  }
  return result;
};

export default onLoginMiddleware;
