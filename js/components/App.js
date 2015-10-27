import React from 'react';
import Relay from 'react-relay';
import CheckCardForValueMutation from '../mutations/CheckCardForValueMutation';
import UserContinueMutation from '../mutations/UserContinueMutation';
import UserRetreatMutation from '../mutations/UserRetreatMutation';
import { Link } from 'react-router';

class App extends React.Component {
  _getCardStyle(card) {
    var color;
    if (card.hasBeenChecked) {
      if (card.value === 'fire') {
        color = 'red';
      } else if (card.value === 'spiders') {
        color = 'green';
      } else if (card.value === 'earthquake') {
        color = 'orange';
      } else if (card.value === 'snakes') {
        color = 'purple';
      } else if (card.value === 'zombies') {
        color = 'brown';
      } else if (card.value === '3') {
        color = 'yellow';
      } else if (card.value === '6') {
        color = '#FF9300';
      } else if (card.value === '9') {
        color = 'yellow';
      } else if (card.value === '12') {
        color = 'blue';
      } else if (card.value === '15') {
        color = 'silver';
      } else if (card.value === '18') {
        color = 'gold';
      } else {
        color = 'white';
      }
    } else {
      color = 'black';
    }
    return {
      backgroundColor: color,
      display: 'inline-block',
      height: 100,
      width: 80,
      marginRight: 5,
    }
  }
  _handleContinue() {
    console.log(this.props.viewer.continue);
    Relay.Store.update(
      new UserContinueMutation({
        viewer: this.props.viewer,
      })
    );
  }
  _handleRetreat() {
    let currentRound = this.props.viewer.cards.edges.slice(0, 3);
    let treasureCounter = 0;
    currentRound.forEach((edge) => {
      if (Number(edge.node.value)) {
        treasureCounter =+ edge.node.value
      }
    });
    console.log(treasureCounter);
    Relay.Store.update(
      new UserRetreatMutation({
        viewer: this.props.viewer,
        treasureCounter
      })
    )
  }
  _handleCardClick(card) {
    console.log(card);
    Relay.Store.update(
      new CheckCardForValueMutation({
        viewer: this.props.viewer,
        card,
      })
    );
  }
  renderCards() {
    return this.props.viewer.cards.edges.map((edge) => {
      return (
        <div
          key={edge.node.id}
          onClick={this._handleCardClick.bind(this, edge.node)}
          style={this._getCardStyle(edge.node)}
        />
      );
    });
  }
  renderRound() {
    const currentRound = this.props.viewer.cards.edges.slice(0, 3);
    return currentRound.map((edge) => {
      return (
        <div
          key={edge.node.id}
          onClick={this._handleCardClick.bind(this, edge.node)}
          style={this._getCardStyle(edge.node)}
        />
      );
    });
  }
  render() {
    const { viewer } = this.props;
    // console.log(this.props.viewer.continue);
    // console.log(this.props.viewer.cards.edges);
    console.log(this.props.viewer.totalTreasure);
    return (
      <container>
        <nav>
          <button onClick={::this._handleContinue} >
            Continue!
          </button>
          <button onClick={::this._handleRetreat} >
            Retreat!
          </button>
          <div>
            Total Treasure: {viewer.totalTreasure}
          </div>
          <div>
            Round Number:
          </div>
        </nav>
        <main>
          {viewer.continue && this.renderRound()}
        </main>
      </container>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        continue,
        retreat,
        totalTreasure,
        cards(first: 9) {
          edges {
            node {
              id,
              value,
              hasBeenChecked,
              ${CheckCardForValueMutation.getFragment('card')},
            }
          }
        },
        ${CheckCardForValueMutation.getFragment('viewer')},
      }
    `,
  },
});
