import * as ActionTypes from './ActionTypes';

export const Posts = (state = {
    isLoading: true,
    errMess: null,
    posts: []
  }, action) => {
  switch(action.type) {
    case ActionTypes.ADD_POSTS:
      return {...state, isLoading: false, errMess: null, posts: action.payload};
      
    case ActionTypes.POSTS_LOADING:
      return {...state, isLoading: true, errMess: null, posts: []};

    case ActionTypes.POSTS_FAILED:
      return {...state, isLoading: false, errMess: action.payload};

    case ActionTypes.CHANGE_POST_LIKE:
      const newState = { ...state };
      let postId = action.payload.postId;
      newState.posts = 
        [
          ...newState.posts.slice(0, postId),
          {...newState.posts[postId], liked: !newState.posts[postId].liked},
          ...newState.posts.slice(postId+1)
        ];
    return newState

    default: 
      return state;
  }
} 