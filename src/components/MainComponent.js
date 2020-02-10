import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchPosts } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapDispatchToProps = (dispatch) => ({
  addComment: (postId, author, comment) => dispatch(addComment(postId, author, comment)),
  fetchPosts: () => {dispatch(fetchPosts())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments,
  }
}

class Main extends Component {
 
  componentDidMount() {
    this.props.fetchPosts();
  }

  render(){
    const HomePage = () => {
      return (
        <Home 
        post={this.props.posts}
        postsLoading={this.props.posts.isLoading}
        postsErrMess={this.props.posts.errMess}/>
      );
    }

    // const PostWithId = ({match}) => {
    //   return(
    //     <PostDetail dish={this.props.posts.posts.filter((post) => post.id === parseInt(match.params.postId, 10))[0]} 
    //     isLoading={this.props.dishes.isLoading}
    //     errMess={this.props.dishes.errMess}
    //     comments={this.props.comments.filter((comment) => comment.postId === parseInt(match.params.postId, 10))}
    //     addComment={this.props.addComment}/>
    //   );
    // }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          {/* <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/:postId" component={PostWithId} /> */}
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  };
}

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main)));
