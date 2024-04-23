class Card {
    constructor(value, name, suit) {
      this.value = value;
      this.name = name;
      this.suit = suit;
    }
  }
  
  class Deck {
    constructor() {
      this.cards = [];
      this.names = [
        "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"
      ];
      this.suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
  
      for (let s = 0; s < this.suits.length; s++) {
        for (let n = 0; n < this.names.length; n++) {
          this.cards.push(new Card(n + 2, this.names[n], this.suits[s]));
        }
      }
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    reset() {
      this.cards = [];
      this.shuffle();
    }
  
    remainingCards() {
      return this.cards.length;
    }
  }
  
  class Player {
    constructor(name, id) {
      this.name = name;
      this.id = id;
      this.hand = [];
    }
  
    deal(deck) {
      for (let i = 0; i < 5; i++) {
        this.hand.push(deck.cards.pop());
      }
      this.printHand();
    }
  
    printHand() {
      console.log(`${this.name}'s hand:`);
      this.hand.forEach(card => {
        console.log(`${card.name} of ${card.suit}`);
      });
    }
  
    discard(index1, index2, deck) {
      if (index1 >= 0 && index2 >= 0 && index1 < this.hand.length && index2 < this.hand.length && index1 !== index2) {
        deck.cards.push(this.hand.splice(index1, 1)[0]);
        deck.cards.push(this.hand.splice(index2 < index1 ? index2 : index2 - 1, 1)[0]);
        this.draw(deck);
        this.draw(deck);
        this.printHand();
      } else {
        console.log("Invalid indices.");
      }
    }
  
    draw(deck) {
      if (deck.cards.length > 0) {
        this.hand.push(deck.cards.pop());
      } else {
        console.log("Deck is empty.");
      }
    }
  }
  
  let deck = new Deck();
  deck.shuffle();
  
  console.log(`Initial number of cards: ${deck.remainingCards()}`);
  
  let player1 = new Player("Slim", 1);
  let player2 = new Player("Luke", 2);
  
  player1.deal(deck);
  player2.deal(deck);
  
  console.log(`Number of cards after dealing: ${deck.remainingCards()}`);
  
  player1.discard(0, 3, deck);
  player2.discard(1, 4, deck);
  

  
  // Add this line to count the discarded cards
  const discardedCards = 4;
  
  console.log(`Number of cards after discarding: ${deck.remainingCards() - discardedCards}`);
  
  deck.reset();
  console.log("Deck reset and shuffled again:");
  console.log(`Number of cards after reset: ${deck.remainingCards()}`);
  