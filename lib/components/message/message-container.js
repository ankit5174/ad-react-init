import Message from './message';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {setMessage} from "../../redux/message/messageActions";

function mapStateToProps(state) {
    return {
        message: state.messageReducer.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setMessage: (message) => {dispatch(setMessage(message))}
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));