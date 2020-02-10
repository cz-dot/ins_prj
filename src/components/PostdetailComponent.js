import React, { useState } from 'react';
import { Card, CardImg, CardBody, Button, CardHeader, CardFooter, InputGroup, InputGroupAddon } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Redirect } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import Like from './LikeComponent';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		if (this.props.cId === -1){
    		this.props.addComment(this.props.postId, "Joseph", values.comment);
		} else {
			console.log(this.props.cId)
			this.props.addChildComment(this.props.postId, this.props.cId, "Joseph", values.comment);
		}
	}

	render(){
		return(
			<React.Fragment>
				<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
					<InputGroup>
					<Control.text model=".comment" name="comment" id="comment"
					validators={{minLength: minLength(1), maxLength: maxLength(140)}} 
					placeholder={this.props.authorName === -1 ? "Add a comment..." : "Reply to " + this.props.authorName} className="form-control"/>
					<InputGroupAddon addonType="append">
						<Button type="submit" color="primary">Post</Button>
					</InputGroupAddon>
					</InputGroup>
				</LocalForm>
			</React.Fragment>
		);
	};
}

function RenderPost({post, changePostLike}) {
	if (post != null) {
		return (
			<React.Fragment>
					<Card>
						<CardImg width="100%" src={post.image} alt={post.name} />
						<CardBody>
		<Like lg={true} liked={post.liked} changePostLike={changePostLike} postId={post.id}></Like>
							<span className="fa fa-comment-o fa-lg mx-3"></span>
							<span className="fa fa-paper-plane-o fa-lg"></span>
							<br />
							<br />
							<p className="comment-single-line"> <span className="commentName">{post.author}</span> {post.name}</p>
						</CardBody>
						
					</Card>
			</React.Fragment>
		);
	} else {
		return (
			<div></div>
		);
	}
}

function RenderChildComments({postId, commentId, childcomments, changeComment2Like}) {
	let cc = childcomments.filter((c) => c.commentId === commentId);
	if (cc && cc.length) {
		return (
			<ul className="list-unstyled w-100">
				{ cc.map((comment) => {
					return (
						<li key={"c"+comment.id}>
							<img className="avatarImg" alt="avatar" src="/assets/images/default_avatar.png" height="30" weight="30"/> 
							<span className="avatarName">{ comment.author }</span>
							<div className="row">
								<div className="col-10">
								<p style={{fontSize:"12px"}}>{ comment.comment } </p>
								</div>
								<div className="ml-lg-auto ml-xl-auto heart-right-child">
									<Like lg={false} changePostLike={changeComment2Like} liked={comment.liked} postId={comment.id}/>											
								</div>
							</div>
						</li>
					)
				}) }
			</ul>
		);
	} else {
		return (<span></span>);
	}
}

function RenderComments({post, childcomments, comments, addComment, addChildComment, postId, changeComment1Like, changeComment2Like}) {
	const [state, setState] = useState({selectcId: -1, authorName: -1});
	if (comments && comments.length) {
		return (
				<Card className="w-100">
				<CardHeader className="d-none d-md-block">
					<img className="avatarImg" src={post.avatar} alt={post.author} height="30" weight="30"/> 
					<p className="avatarName">{post.author}</p>
				</CardHeader>
				<CardBody className="scroll">
				<ul className="list-unstyled">
					{ comments.map((comment) => {
						return (
							<li key={comment.id}>
								<img className="avatarImg" alt="avatar" src="/assets/images/default_avatar.png" height="30" weight="30"/> 
								<span className="avatarName">{ comment.author }</span>
								<div className="commentReply mt-2" style={{userSelect: 'none'}} onClick={() => {setState({selectcId: comment.id, authorName: comment.author})}}>Reply</div>
								<div className="row">
									<div className="col-10">
									<p style={{fontSize:"12px"}}>{ comment.comment } </p>
									</div>
									{/* <div className="col-auto col-md-auto"> */}

									<div className="ml-lg-auto ml-xl-auto heart-right mr-lg-4">
										<Like lg={false} changePostLike={changeComment1Like} liked={comment.liked} postId={comment.id}/>											
									</div>
								</div>
								<div className="row ml-lg-3 mr-lg-4 ml-md-1 ml-sm-2 ml-2">
									<RenderChildComments postId={postId} commentId={comment.id} childcomments={childcomments} changeComment2Like={changeComment2Like}/>
								</div>
							</li>
						)
					}) }
				</ul>

				</CardBody>
				<CardFooter>
					<CommentForm postId={postId} addComment={addComment} cId={state.selectcId} authorName={state.authorName} addChildComment={addChildComment}/>
				</CardFooter>
				</Card>
		);
	} else {
		return (
				<Card className="w-100">
				<CardHeader className="d-none d-md-block">
					<img className="avatarImg" src={post.avatar} alt={post.author} height="30" weight="30"/> 
					<p className="avatarName">{post.author}</p>
				</CardHeader>
				<CardBody className="scroll">
					<div className="col-12 w-100">
						Be the first person to comment
					</div>
				</CardBody>
				<CardFooter>
				<CommentForm postId={postId} addComment={addComment} cId={state.selectcId} authorName={state.authorName} addChildComment={addChildComment}/>
				</CardFooter>
				</Card>
		);
	}
}

const PostDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	}
	else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	}
	else if (props.post != null){
		return (
			<div className="container">
				<div className="row mt-1 h-100">
					<div className="col-12 col-md-8 mt-1 px-0 d-flex h-100">
						<RenderPost post={props.post} changePostLike={props.changePostLike}/>
					</div>
					<div className="col-12 col-sm-12 col-md-4 mt-1 px-0 d-flex h-100">
						<RenderComments post={props.post} comments={props.comments} 
					addComment={props.addComment} addChildComment={props.addChildComment} postId={props.post.id} changeComment1Like={props.changeComment1Like} changeComment2Like={props.changeComment2Like}
					childcomments={props.childcomments}/>
					</div>
				</div>
			</div>
		);
	} else {
		
		return (<Redirect to="/home" />);
	}
}


export default PostDetail;