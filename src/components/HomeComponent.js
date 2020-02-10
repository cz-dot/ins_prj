import React from 'react';
import { Card, CardImg, CardBody, CardDeck, CardHeader } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import Like from './LikeComponent';

function RenderCardItem({post, changePostLike}) {
	return(
	<Card>
		<CardHeader>
			<img className="avatarImg" src={post.avatar} alt={post.author} height="30" weight="30"/> 
			<p className="avatarName">{post.author}</p>
		</CardHeader>
		<Link to={`${post.id}`}>
			<CardImg src={post.image} alt={post.name} />
			</Link>
			<CardBody>
				<Like liked={post.liked} changePostLike={changePostLike} postId={post.id}/>
				<br />
				{post.name}
		</CardBody>
	</Card>
	);
}

function RenderCard({changePostLike, item, isLoading, errMess}) {
	const cards = item.posts.map((post) => {
		return (
			<div key={post.id} className="col-12 col-md-12 m-1">
				<CardDeck>
					<RenderCardItem post={post} changePostLike={changePostLike}/>
				</CardDeck>
			</div>
		);
	});

	if (isLoading) {
		return(
			<Loading />
		);
	}	
	else if (errMess) {
		return(
			<h4>{errMess}</h4>
		);
	}
	else {
		return(
			<div className="container">
				<div className="row">
					{cards}
				</div>
			</div>
		);
	}	
}

function Home(props){
	return (
	<div className="container">
      <div className="row align-items-start">
			<div className="col-12 col-md-8 m-1">
				<RenderCard changePostLike={props.changePostLike} item={props.post} isLoading={props.postsLoading} errMess={props.postsErrMess}  />
			</div>

			<div className="col-12 col-md-3 col-sm-none">
				<Card className="border-0">
					<CardBody>
					<img className="avatarImg" src="/assets/images/avatar3.jpg" alt="Lee" height="50" weight="50"/> 
					<p className="avatarName" style={{fontSize: 16}}>Joseph</p>
					</CardBody>
				</Card>
			</div>
		</div>
    </div>
	);
}

export default Home;