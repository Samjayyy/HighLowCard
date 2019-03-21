import { Component, OnInit } from '@angular/core';
import { Card, CardType, CardValue } from 'src/app/shared/models/card.model';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {
  deck: Card[];
  currentCard = -1;
  lastScore = 0;
  currentScore = 0;

  constructor() { }

  ngOnInit() {
    this.deck = [];
    CardType.values().forEach(type =>
      CardValue.values().forEach(value => this.deck.push(new Card(type, value))
      )
    );
    this.shuffleDeck();
    this.currentCard = 0;
    this.lastScore = 0;
    this.currentScore = 0;
  }

  nextNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private shuffleDeck(): void {
    let todo = this.deck.length;
    while (todo > 1) {
      const pick = this.nextNumber(todo);
      todo--;
      // And swap it with the current element.
      const tmp = this.deck[todo];
      this.deck[todo] = this.deck[pick];
      this.deck[pick] = tmp;
    }
  }

  guess(what: (original: Card, next: Card) => number) {
    this.lastScore = what(this.deck[this.currentCard], this.deck[this.currentCard + 1]);
    this.currentScore += this.lastScore;
    this.currentCard++;
  }

  equal(original: Card, next: Card): number {
    return (original.value === next.value ? +12 : -2);
  }
  lower(original: Card, next: Card): number {
    return -original.value + (original.value > next.value ? 14 : 0);
  }
  higher(original: Card, next: Card): number {
    return original.value - (original.value < next.value ? 0 : 14);
  }

  private next(): void {
    this.currentCard++;
  }
}
