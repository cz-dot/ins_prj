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
            <div onClick={this.handleClick}>
                {this.props.liked ? <i className="fa fa-heart-o fa-lg"></i> : <i className="fa fa-heart fa-lg" style={{color: 'red'}}></i>}
            </div>
        );
    }
}

const Like = (props) => {
    return (
        <RenderHeart liked={props.liked} changePostLike={props.changePostLike} postId={props.postId}/>
    );
}

export default Like;