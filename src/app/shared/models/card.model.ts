export enum CardType {
    CLUBS = 1,
    DIAMONDS,
    HEARTS,
    SPADES
}

export namespace CardType {
    export function values(): CardType[] {
        return Object.keys(CardType).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        ).map(key => CardType[key]);
    }
}

export enum CardValue {
    ACE = 1,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING
}
export namespace CardValue {
    export function values(): CardValue[] {
        return Object.keys(CardValue).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        ).map(key => CardValue[key]);
    }
}


export class Card {
    type: CardType;
    value: CardValue;

    constructor(type: CardType, value: CardValue) {
        this.type = type;
        this.value = value;
    }

    getFileName(): string {
        console.log(this.type);
        console.log(this.value);
        return (this.value > CardValue.ACE && this.value < CardValue.JACK
            ? this.value
            : CardValue[this.value].toLowerCase())
            + '_of_' + CardType[this.type].toLowerCase() + '.png';
    }

}
