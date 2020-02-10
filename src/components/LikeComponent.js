import React, { Component } from 'react';


class RenderHeart extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.changePostLike(this.props.postId);
    }

    render() {
        return (
            <>
                {this.props.liked ? <span onClick={this.handleClick} className="fa fa-heart fa-lg" style={{color: 'red'}}></span> : <span onClick={this.handleClick} className="fa fa-heart-o fa-lg"></span>}
            </>
        );
    }
}

const Like = (props) => {
    return (
        <RenderHeart liked={props.liked} changePostLike={props.changePostLike} postId={props.postId}/>
    );
}

export default Like;