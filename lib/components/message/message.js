import React, {Component} from 'react';
import './message.css';

class Message extends Component {

    componentDidMount() {
        const {setMessage} = this.props;
        setMessage("Welcome To AD React Init");
    }

    render() {
        const {message} = this.props;
        return (
            <div>{message}</div>
        )
    }
}

export default Message;
