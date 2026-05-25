import { createStore } from 'redux';

// Load state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('appState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('appState', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const persistedState = loadState();

// Define your initial state and reducer function (changeState)
const initialState = {
  sidebarShow: true,
  theme: 'light',
  user: null,
  authenticated: false,
  isAdmin: false,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    case 'LOGIN':
      return {
        ...state,
        user: {
          userId: rest.userId,
          email: rest.email,
          profileImage: rest.profileImage,
          role: rest.role,
          name: rest.name,
          idToken: rest.idToken,
          phone_number: rest.phone_number
        },
        // We set true by default or whatever is explicitly passed
        authenticated: rest.authenticated !== undefined ? rest.authenticated : true,
        isAdmin: true,
      };
    case 'LOGOUT':
      return { ...state, user: null, authenticated: false, isAdmin: false };
    default:
      return state;
  }
};

// Create the Redux store with persistedState as preloadedState
const store = createStore(changeState, persistedState);

// Subscribe to store changes to save them to local storage
store.subscribe(() => {
  saveState({
    user: store.getState().user,
    authenticated: store.getState().authenticated,
    isAdmin: store.getState().isAdmin,
    theme: store.getState().theme,
    sidebarShow: store.getState().sidebarShow
  });
});

export default store;
