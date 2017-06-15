import React, { Component } from 'react';
import Parse from 'parse';
// after npm installing parse, import it here//
import LoginForm from './LoginForm.js';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount () {
    // to initialize your own parse-server //

    // replace mcauthexample with your app id //
    Parse.initialize("mcAuthExample", "launchPeer");
    // replace mc-auth-example.herokuapp.com with your parse server
    Parse.serverURL = 'https://mc-auth-example.herokuapp.com/parse';

    // Whenever you use any signup or login methods, the user is cached in localStorage. You can treat this cache as a session, and automatically assume the user is logged in
    const currentUser = Parse.User.current();
    if (currentUser) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  logOut() {
    Parse.User.logOut().then(() => {
      const currentUser = Parse.User.current(); // this will now be null
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <div>
            <Button onPress={this.logOut()}>
              Log out
            </Button>
          </div>
        );
      case false:
        return <LoginForm />;
      default:
        return // spinner
    }
  }


  render() {
    return (
      <div>
        <h1>Parse + React Authentication example</h1>
        {this.renderContent()}
      </div>
    );
  }
}