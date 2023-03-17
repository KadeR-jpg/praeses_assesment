import { Rank, Suit, Card } from './card';

export class Deck {
	private cards: Card[];
	constructor() {
		this.cards = [];
		for (let suit = 0; suit <= Suit.Spades; suit++) {
			for (let rank = 0; rank <= Rank.King; rank++) {
				this.cards.push(new Card(suit, rank));
			}
		}
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}
	pop(): Card {
		const card = this.cards.pop();
		if (!card) {
			throw new Error('Cannot remove from an empty deck');
		}
		return card;
	}
	reset(): void {
		this.cards = []
	}
	length(): number {
		return this.cards.length
	}
	// deal(): Card {
	// 	if (this.cards.length === 0) {
	// 		throw new Error('No cards are left in the deck');
	// 	} else {
	// 		return this.cards.pop()!;
	// 	}
	// }
}

export { Card };
