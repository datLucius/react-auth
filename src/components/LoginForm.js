import React from 'react';
import Parse from 'parse';
import { Input, Button } from './common';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  logUserIn() {
    console.log('hello from log in')
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    // LOGIC FOR SIGN IN
    // http://docs.parseplatform.org/js/guide/#logging-in
    Parse.User.logIn(email, password, {
      success: function (user) {
        this.onLoginSuccess.bind(this)
        console.log(user);
      },
      error: function () {
        // login failed. Check error
        this.onLoginFailed.bind(this);
        // create user
      }
    })
  }

  createUser() {
    console.log('create firing');
    const { email, password } = this.state;
    console.log(email, password)
    this.setState({ error: '', loading: true });

    const user = new Parse.User();

    user.set("username", 'mcNut');
    user.set("email", email);
    user.set("password", password);

    // LOGIC FOR CREATING USER
    // http://docs.parseplatform.org/js/guide/#signing-up
    user.signUp(null, {
      success: function(user) {
        this.onLoginSuccess.bind(this)
        console.log(user);
      },
      error: function() {
        this.onLoginFailed.bind(this);
        // show error message
      }
    })
  }

  onLoginSuccess() {
    console.log('success')
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  onLoginFailed() {
    console.log('failed')
    this.setState({
      loading: false,
      error: 'Authentication failed.'
    });
  }

  renderLogInButton() {
    if (this.state.loading) {
      // return a spinner
    }
    return (<Button onClick={this.logUserIn.bind(this)}>Log in</Button>)
    // return a button
  }

  renderSignUpButton() {
    if (this.state.loading) {
      // return a spinner
    }
    return (<Button onClick={this.createUser.bind(this)}>Sign Up</Button>)
    // return a button
  }


  render () {
    return (
      <div>
        <Input
          placeholder='rascal@launchpeer.com'
          label='Email'
          value={this.state.email}
          onChangeText={email => this.setState({ email: email.target.value })}
        />
        <Input
          secureTextEntry
          placeholder='password'
          label='Password'
          value={this.state.password}
          onChangeText={password => this.setState({ password: password.target.value })}
        />
        {this.renderLogInButton()}
        {this.renderSignUpButton()}
      </div>
    )
  }
}

const styles = {
  errorTextStyle: {
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;