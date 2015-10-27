
// Model types
export class User extends Object {}
export class Card extends Object {}
// Mock authenticated ID
const VIEWER_ID = 'me';

// Mock user data
var viewer = new User();
viewer.id = VIEWER_ID;
viewer.continue = false;
viewer.retreat = false;
viewer.totalTreasure = 0;
var usersById = {
  [VIEWER_ID]: viewer
};
export function viewerContinues(id) {
  var viewer = getUser(id);
  viewer.continue = true;
  return;
}
export function viewerRetreats(id, treasure) {
  console.log(id);
  console.log(treasure);
  var viewer = getUser(id);
  viewer.retreat = true;
  viewer.totalTreasure =+ treasure;
  return;
}
var turnsRemaining = 5;
var cards = [];
(function() {
  var card;
  // var indexOfSpotWithTreasure = Math.floor(Math.random() * 9);
  for (var i = 0; i < 9; i++) {
    card = new Card();
    card.id = `${i}`;
    // card.hasTreasure = (i === indexOfSpotWithTreasure);
    card.hasBeenChecked = false;
    card.value = '';
    var treasureRandomNumber = Math.floor(Math.random() * 10);
    switch (treasureRandomNumber) {
      case (0):
        card.value = 'snakes';
        break;
      case (1):
        card.value = 'zombies';
        break;
      case (2):
        card.value = 'fire';
        break;
      case (3):
        card.value = 'spiders';
        break;
      case (4):
        card.value = 'earthquake';
        break;
      case (5):
        card.value = '3';
        break;
      case (6):
        card.value = '6';
        break;
      case (7):
        card.value = '9';
        break;
      case (8):
        card.value = '12';
        break;
      case (9):
        card.value = '15';
        break;
      case (10):
        card.value = '18';
        break;
      default:
        break;
    }
    cards.push(card);
  }
})();

console.log(cards);
export function checkCardForValue(id) {
  turnsRemaining--;
  var card = getCard(id);
  card.hasBeenChecked = true;
}
export function getCard(id) {
  return cards.find(card => id === card.id);
}

export function getCards() { return cards; }
export function getUser(id) { return usersById[id]; }
export function getViewer() { return getUser(VIEWER_ID); }
export function getGame() { return game; }
export function getTurnsRemaining() { return turnsRemaining; }
