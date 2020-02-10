import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createForms } from 'react-redux-form';
import { Posts } from './posts';
import { Comments } from './comments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      posts: Posts,
      comments: Comments,
      // ...createForms({
      //   feedback: InitialFeedback
      // })
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}