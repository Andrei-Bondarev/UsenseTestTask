import {Component, Input, SimpleChange} from '@angular/core';
@Component({
  selector: 'app-password-strength',
  templateUrl: 'password-strength.component.html',
  styleUrls: ['password-strength.component.css']
})
export class PasswordStrengthComponent {
  @Input() public passwordToCheck!: string;
  bar0!: string;
  bar1!: string;
  bar2!: string;
  private colors = ['darkred','darkred', 'orange', 'yellowgreen'];

  checkStrength(p: string) {
    let force = 0;

    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;

    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    const flags = [lowerLetters || upperLetters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag ? 1 : 0;
    }

    force += passedMatches * 10;

    force = (p.length < 8) ? 0 : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.index, c.color);
    }
  }

  private getColor(s: number) {
    let index = 0;
    if (s === 0) {
      index = 0;
    } else if (s === 10) {
      index = 1;
    } else if (s === 20) {
      index = 2;
    } else if (s === 30) {
      index = 3;
    }
    return {
      index,
      color: this.colors[index]
    };
  }

  private setBarColors(count: number, col: string) {
    count = count === 0 ? 3 : count;
    for (let n = 0; n < count; n++) {
      // @ts-ignore
      this['bar' + n] = col;
    }
  }
}
