import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardDeck } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderCardItem({post}) {
	return(
	<Card>
		<CardImg src={post.image} alt={post.name} />
		<CardBody>
		
		<p><img className="avatar" src={post.avatar} alt={post.author} height="30" weight="30"/> {post.author}</p>
		<CardText>{post.name}</CardText>
		</CardBody>
	</Card>
	);

}

function RenderCard({item, isLoading, errMess}) {
	const cards = item.posts.map((post) => {
		return (
			<div key={post.id} className="col-12 col-md-12 m-1">
				<CardDeck>
					<RenderCardItem post={post} />
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
			<div className="col-12 col-md m-1">
				<RenderCard item={props.post} isLoading={props.postsLoading} errMess={props.postsErrMess}  />
			</div>
		</div>
    </div>
	);
}

export default Home;