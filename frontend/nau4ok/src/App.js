import 'bootstrap/dist/css/bootstrap.css'
import './static/styles/style.css'
import './static/styles/login_form_style.css'
import './static/styles/ArrowStyle.css'
import './static/styles/NavbarStyle.css'
import './static/styles/ProfileStyle.css'
import './static/styles/FooterStyle.css'
import './static/styles/CommentStyle.css'
import './static/styles/SettingsStyle.css'
import './static/styles/ArticleStyling.css'

import 'bootstrap/dist/js/bootstrap'
import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import CustomLayout from './Containers/Layout';
import * as actions from "./store/actions/auth";
import {connect} from "react-redux";


class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <CustomLayout {...this.props}>
                        <BaseRouter/>
                    </CustomLayout>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
    }
};



const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
