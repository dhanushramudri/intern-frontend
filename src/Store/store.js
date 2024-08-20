import { createStore } from "redux";

const initialState = {
  auth: {
    isLoggedIn: false,
    isSubscribed: false,
    token: "",
    email: "",
    subscription_ends_at: "",
    isSubscriptionCanceled: false,
  },
  jobs_data: {
    no_of_jobs: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "isLoggedIn":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoggedIn: action.payload,
        },
      };
    case "isSubscribed":
      return {
        ...state,
        auth: {
          ...state.auth,
          isSubscribed: action.payload,
        },
      };
    case "token":
      return {
        ...state,
        auth: {
          ...state.auth,
          token: action.payload,
        },
      };
    case "email":
      return {
        ...state,
        auth: {
          ...state.auth,
          email: action.payload,
        },
      };
    case "no_of_jobs":
      return {
        ...state,
        jobs_data: {
          ...state.jobs_data,
          no_of_jobs: action.payload,
        },
      };
    case "subscription_ends_at":
      return {
        ...state,
        auth: {
          ...state.auth,
          subscription_ends_at: action.payload,
        },
      };
    case "isSubscriptionCanceled":
      return {
        ...state,
        auth: {
          ...state.auth,
          isSubscriptionCanceled: action.payload,
        },
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
