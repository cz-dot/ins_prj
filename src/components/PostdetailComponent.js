import React from 'react';
import { Card, CardImg, CardBody, Button, CardHeader, CardFooter, InputGroup, InputGroupAddon } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import Like from './LikeComponent';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			 isModalOpen : false
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
		this.toggleModal();
    	this.props.addComment(this.props.postId, "Joseph", values.comment);
	}

	toggleModal(){
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	render(){
		return(
			<React.Fragment>
				<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
					<InputGroup>
					<Control.text model=".comment" name="comment" id="comment"
					validators={{minLength: minLength(1), maxLength: maxLength(140)}} 
					placeholder="Add a comment..." className="form-control"/>
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
								<div className="ml-auto heart-right">
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

function RenderComments({post, childcomments, comments, addComment, postId, changeComment1Like, changeComment2Like}) {
	if (comments && comments.length) {
		return (
			// <div className="col-12 col-md-4 mt-1 px-0 flex-row">
				<Card>
				<CardHeader>
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
								<div className="commentReply mt-2" style={{userSelect: 'none'}} onClick={e => console.log("Clicked")}>Reply</div>
								<div className="row">
									<div className="col-10">
									<p style={{fontSize:"12px"}}>{ comment.comment } </p>
									</div>
									<div className="col-auto col-md-auto">
										<Like lg={false} changePostLike={changeComment1Like} liked={comment.liked} postId={comment.id}/>											
									</div>
								</div>
								<div className="row ml-3 mr-4 pr-2">
									<RenderChildComments postId={postId} commentId={comment.id} childcomments={childcomments} changeComment2Like={changeComment2Like}/>
								</div>
							</li>
						)
					}) }
				</ul>

				</CardBody>
				<CardFooter>
					<CommentForm postId={postId} addComment={addComment}/>
				</CardFooter>
				</Card>
			// </div>
		);
	} else {
		return (
			<div className="col-12 col-md-4 mt-1 px-0">
				<Card>
				<CardHeader>
					<img className="avatarImg" src={post.avatar} alt={post.author} height="30" weight="30"/> 
					<p className="avatarName">{post.author}</p>
				</CardHeader>
				<CardBody>
				</CardBody>
				<CardFooter>
					<CommentForm postId={postId} addComment={addComment}/>
				</CardFooter>
				</Card>
			</div>
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
				<div className="col-12 col-md-8 mt-1 px-0 h-100">
					<RenderPost post={props.post} changePostLike={props.changePostLike}/>
				  </div>
				  <div className="col-12 col-md-4 mt-1 px-0 d-flex h-100">
					  <RenderComments post={props.post} comments={props.comments} 
				  addComment={props.addComment} postId={props.post.id} changeComment1Like={props.changeComment1Like} changeComment2Like={props.changeComment2Like}
				  childcomments={props.childcomments}/>
				  </div>
			</div>
		</div>
	);
	} 
}


export default PostDetail;