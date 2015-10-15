import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {

  render() {
    console.log(this.props.test);
    return (
      <div>
        Hello there!
        <p>
          {this.props.test.testOne}
        </p>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    test: () => Relay.QL`
      fragments on Test {
        testOne
      }
    `,
  },
});
