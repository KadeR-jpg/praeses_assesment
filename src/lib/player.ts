import type { Deck } from './deck';
import type { Card } from './card';
export class Player {
	hand: Card[];
	deck: Deck;
	score: number;
	name: string;
	bag: number;
	constructor(name: string, deck: Deck) {
		this.name = name;
		this.deck = deck;
		this.hand = [deck.pop(), deck.pop()];
		this.score = this.calcScore();
		this.bag = 100;
	}
	addCardToHand(card: Card): void {
		this.hand = [...this.hand, card];
	}
	reset() {
		this.hand = [this.deck.pop(), this.deck.pop()];
		this.score = 0;
	}
	calcScore(): number {
		let score = 0;
		for (const card of this.hand) {
			score += card.getValue();
			if (card.getValue() == 1 && score + 10 <= 21) {
				score += 10;
			}
		}
		// while (score > 21 && numberOfAces > 0) {
		// 	console.log(`Ace: ${score}`);

		// 	score -= 10;
		// 	numberOfAces--;
		// }
		return score;
	}
}
export class Dealer extends Player {
	dealer: boolean;
	show_card: Card;
	constructor(name: string, deck: Deck) {
		super(name, deck);
		this.dealer = true;
		this.hand = [deck.pop(), deck.pop()];
		this.show_card = this.hand[0];
	}
	// hit(card: Card) {
	// 	while(this.calcScore() < 17) {
	// 		this.
	// 	}
	// }
}
