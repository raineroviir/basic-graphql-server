import Relay from 'react-relay';

export default class CheckCardForValueMutation extends Relay.Mutation {
  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
      }
    `,
    card: () => Relay.QL`
      fragment on Card {
        id,
        hasBeenChecked,
        value,
      }
    `,
  }
  getMutation() {
    return Relay.QL`mutation{checkCardForValue}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on CheckCardForValuePayload {
        card {
          hasBeenChecked,
          value,
        },
        viewer {
          id,
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        card: this.props.card.id,
        viewer: this.props.viewer.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.card.id,
    };
  }
  getOptimisticResponse() {
    return {
      card: {
        id: this.props.card.id,
        hasBeenChecked: true,
      }
    };
  }
}
