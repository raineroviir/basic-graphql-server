import Relay from 'react-relay';

// NOTE: query called test

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
  };
  static routeName = 'AppHomeRoute';
}
