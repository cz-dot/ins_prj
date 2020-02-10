import { COMMENTS } from '../shared/comments'; 
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
  switch(action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      return state.concat(comment);
    case ActionTypes.CHANGE_COMMENT1_LIKE:
      let commentId = action.payload.commentId;
        
      return ([
        ...state.slice(0, commentId),
        {...state[commentId], liked: !state[commentId].liked},
        ...state.slice(commentId+1)
      ]);

    default: 
      return state;
  }
} 