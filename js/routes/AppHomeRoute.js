import Relay from 'react-relay';

// NOTE: query called test

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    test: () => Relay.QL`
      query {
        test
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
