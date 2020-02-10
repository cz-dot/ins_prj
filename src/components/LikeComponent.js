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
        if (this.props.liked && this.props.lg) {
            return (<span onClick={this.handleClick} className="fa fa-heart fa-lg" style={{color: 'red'}}></span>);
        }
        else if (!this.props.liked && this.props.lg) {
            return (<span onClick={this.handleClick} className="fa fa-heart-o fa-lg"></span>);
        }
        else if (this.props.liked && !this.props.lg) {
            return (<span onClick={this.handleClick} className="fa fa-heart" style={{color: 'red'}}></span>);
        } else {
            return (<span onClick={this.handleClick} className="fa fa-heart-o"></span>);
        }
    }
}

const Like = (props) => {
    return (
        <RenderHeart liked={props.liked} changePostLike={props.changePostLike} postId={props.postId} lg={props.lg}/>
    );
}

export default Like;