import React from 'react';
import { Card, CardImg, CardBody, 
	Modal, ModalBody, ModalHeader, Button, Col, Row, Label, CardHeader } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
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
    this.props.addComment(this.props.postId, values.author, values.comment);
	}

	toggleModal(){
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	render(){
		return(
			<React.Fragment>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span> Submit Comments
				</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="author" md={12}>Your Name</Label>
								<Col md={12}>
									<Control.text model=".author" name="author" id="author" placeholder="Your Name"
									validators={{minLength: minLength(3), maxLength: maxLength(15)}} 
									className="form-control"/>
									<Errors className="text-danger" model=".author" show="touched" 
									messages={{
										minLength: "Must be greater than 2 characters",
										maxLength: "Must be 15 characters or less"
									}}/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" md={12}>Comment</Label>
								<Col md={12}>
									<Control.textarea model=".comment" name="comment" id="comment" 
									className="form-control" rows="6"/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={10}>
									<Button type="submit" color="primary">Submit</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</React.Fragment>
		);
	};
}

function RenderPost({post, changePostLike}) {
	if (post != null) {
		return (
			<React.Fragment>
				<div className="col-12 col-md-8 mt-1 px-0">
					<Card>
						<CardHeader>
							<img className="avatarImg" src={post.avatar} alt={post.author} height="30" weight="30"/> 
							<p className="avatarName">{post.author}</p>
						</CardHeader>
						<CardImg width="100%" src={post.image} alt={post.name} />
						<CardBody>
							<Like liked={post.liked} changePostLike={changePostLike} postId={post.id}></Like>
							<span className="fa fa-comment-o fa-lg mx-3"></span>
							<span className="fa fa-paper-plane-o fa-lg"></span>
							<br />
							<br />
							{post.name}
						</CardBody>
						
					</Card>
				</div> 
			</React.Fragment>
		);
	} else {
		return (
			<div></div>
		);
	}
}

function RenderComments({comments, addComment, postId, changeComment1Like}) {
	if (comments && comments.length) {
		return (
			<div className="col-12 col-md-4 mt-1 px-0">
				<Card>
				<ul className="list-unstyled">
					{ comments.map((comment) => {
						return (
							<li key={comment.id} className="p-2">
								<img className="avatarImg" alt="avatar" src="/assets/images/default_avatar.png" height="30" weight="30"/> 
								<span className="avatarName">{ comment.author }</span>
								<div className="row">
									<div className="col-10">
									<p style={{fontSize:"12px"}}>{ comment.comment } </p>
									</div>
									<div className="col-auto col-md-auto">
										<Like changePostLike={changeComment1Like} liked={comment.liked} postId={comment.id}/>	
										
									</div>

								</div>
							</li>
						)
					}) }
				</ul>
				<CommentForm postId={postId} addComment={addComment}/>
				</Card>
			</div>
		);
	} else {
		return (
			<div>	
				<div className="col-12 col-md-4 mt-1 px-0">
					<CommentForm postId={postId} addComment={addComment}/>
				</div>
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
			<div className="row mt-1">
				<RenderPost post={props.post} changePostLike={props.changePostLike}/>
				<RenderComments comments={props.comments} 
				  addComment={props.addComment} postId={props.post.id} changeComment1Like={props.changeComment1Like}/>
			</div>
		</div>
	);
	} 
}


export default PostDetail;