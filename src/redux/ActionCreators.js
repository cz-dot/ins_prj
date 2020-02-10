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

export const addChildComment = (postId, commentId, author, comment) => ({
  type: ActionTypes.ADD_CHILD_COMMENT,
  payload: {
    postId: postId,
    author: author,
    commentId: commentId,
    comment: comment
  }
});

export const changePostLike = (postId) => ({
  type: ActionTypes.CHANGE_POST_LIKE,
  payload: {
    postId: postId
  }
})

export const changeComment1Like = (commentId) => ({
  type: ActionTypes.CHANGE_COMMENT1_LIKE,
  payload: {
    commentId: commentId
  }
})

export const changeComment2Like = (commentId) => ({
  type: ActionTypes.CHANGE_COMMENT2_LIKE,
  payload: {
    commentId: commentId
  }
})

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