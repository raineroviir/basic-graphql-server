import Relay from 'react-relay';

export default class UserContinueMutation extends Relay.Mutation {
  // static fragments = {
  //   viewer: () => Relay.QL`
  //     fragment on User {
  //       id,
  //       continue,
  //     }
  //   `
  // }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
        continue: this.props.viewer.continue,
      }
    }]
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UserContinueMutationPayload {
        viewer {
          id,
        }
      }
    `
  }
  getMutation() {
    return Relay.QL`mutation{userContinueMutation}`;
  }
  getVariables() {
    return {
      id: this.props.viewer.id,
    }
  }
  getOptimisticResponse() {
    return {
      viewer: {
        id: this.props.viewer.id,
        continue: true,
      }
    };
  }
}
