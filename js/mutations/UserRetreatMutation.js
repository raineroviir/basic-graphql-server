import Relay from 'react-relay';

export default class UserRetreatMutation extends Relay.Mutation {
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        viewer: this.props.viewer.id,
        retreat: this.props.viewer.retreat,
        totalTreasure: this.props.treasureCounter,
      }
    }]
  }
  getFatQuery() {
    return Relay.QL`
      fragment on UserRetreatMutationPayload {
        viewer
      }
    `;
  }
  getMutation() {
    return Relay.QL`mutation {userRetreatMutation}`;
  }
  getVariables() {
    return {
      retreat: this.props.retreat,
      totalTreasure: this.props.treasureCounter,
    }
  }
  getOptimisticResponse() {
    return {
      viewer: {
        retreat: true,
        totalTreasure: this.props.viewer.totalTreasure += this.props.treasureCounter,
      }
    }
  }
}
