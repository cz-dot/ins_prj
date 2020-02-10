import * as ActionTypes from './ActionTypes';
import { POSTS } from '../shared/posts'; 

export const addComment = (postId, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    postId: postId,
    author: author,
    comment: comment
  }
});

export const fetchPosts = () => (dispatch) => {
  dispatch(postsLoading(true));
  dispatch(addPosts(POSTS));
}

export const postsLoading = () => ({
  type: ActionTypes.POSTS_LOADING
});

export const postsFailed = (errmess) => ({
  type: ActionTypes.POSTS_FAILED,
  payload: errmess
});

export const addPosts = (posts) => ({
  type: ActionTypes.ADD_POSTS,
  payload: posts
});