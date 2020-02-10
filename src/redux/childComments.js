import { CHILD_COMMENTS } from '../shared/childcomments'; 
import * as ActionTypes from './ActionTypes';

export const ChildComments = (state = CHILD_COMMENTS, action) => {
  switch(action.type) {
    case ActionTypes.ADD_CHILD_COMMENT:
      var childcomment = action.payload;
      childcomment.id = state.length;
      childcomment.date = new Date().toISOString();
      return state.concat(childcomment);
      
    case ActionTypes.CHANGE_COMMENT2_LIKE:
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