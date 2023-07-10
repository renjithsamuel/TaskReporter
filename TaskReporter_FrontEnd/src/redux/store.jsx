// store.js

import { createStore } from "redux";

// Initial state
const initialState = {
  theme: 'light',
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'dark':
      return { theme: 'dark' };
    case 'light':
      return { theme: 'light' };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(reducer);

export default store;
