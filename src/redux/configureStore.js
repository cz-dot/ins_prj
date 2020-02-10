import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Posts } from './posts';
import { Comments } from './comments';
import { ChildComments } from './childComments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      posts: Posts,
      comments: Comments,
      childComments: ChildComments
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}