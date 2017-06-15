import React from 'react';
import Parse from 'parse';
import { Input, Button } from './common';

class LoginForm extends React.Component {
  state = {
    email: 'booger',
    password: 'boger',
    error: '',
    loading: false
  };

  logUserIn(e) {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    // LOGIC FOR SIGN IN
    // http://docs.parseplatform.org/js/guide/#logging-in
    Pares.User.logIn(email, password, {
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
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    const user = new Parse.User();

    user.set("username", email);
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
    return (<Button onPress={this.logUserIn.bind(this)}>Log in</Button>)
    // return a button
  }

  renderSignUpButton() {
    if (this.state.loading) {
      // return a spinner
    }
    return (<Button onPress={this.createUser.bind(this)}>Sign Up</Button>)
    // return a button
  }


  render () {
    return (
      <form>
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
      </form>
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