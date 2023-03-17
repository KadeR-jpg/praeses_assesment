export enum Suit {
	Clubs,
	Diamonds,
	Hearts,
	Spades
}

export enum Rank {
	Ace = 0,
	Two,
	Three,
	Four,
	Five,
	Six,
	Seven,
	Eight,
	Nine,
	Ten,
	Jack,
	Queen,
	King
}
export class Card {
	public suit: Suit;
	public rank: Rank;
	constructor(suit: Suit, rank: Rank) {
		this.suit = suit;
		this.rank = rank;
	}

	getFace(): string {
		switch (Suit[this.suit]) {
			case 'Spades':
				return '♠️';
			case 'Hearts':
				return '♥️';
			case 'Diamonds':
				return '♦️';
			case 'Clubs':
				return '♣️';
			default:
				throw new Error('Unhandled Suit case');
		}
	}
	getRank(): string {
		if (this.rank === Rank.Ace) {
			return 'A';
		} else if (this.rank <= Rank.Ten) {
			return (this.rank + 1).toString();
		} else {
			switch (Rank[this.rank]) {
				case 'Jack':
					return 'J';
				case 'King':
					return 'K';
				case 'Queen':
					return 'Q';
			}
		}
		return Rank[this.rank];
	}

	getValue(): number {
		if (this.rank === Rank.Ace) {
			return 1;
		} else if (this.rank <= Rank.Ten) {
			return this.rank + 1;
		} else {
			return 10;
		}
	}
}
