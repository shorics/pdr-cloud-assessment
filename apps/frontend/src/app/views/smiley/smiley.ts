import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-smiley',
  template: `
    <div class="face">
      <div class="eye right"></div>
      <div class="eye left"></div>
      <div class="mouth"></div>
      <div class="tounge">
        <div class="tounge-center"></div>
      </div>
    </div>
  ` ,
  styles: [`
    .face {
      display: grid;
      grid-template-columns: 19% 5% 9% 5% 24% 5% 9% 5% 19%;
      grid-template-rows: 30% 20% 10% 25% 15%;
      width: min(100%, 100vh);
      max-height: min(100%, 100vh);
      background: rgb(249, 214, 122);
      border-radius: 50%;
      aspect-ratio: 1;
    }

    .eye {
      background: rgb(117, 86, 22);
      border-radius: 50%;

      &.right {
        grid-column: 3 / 5;
        grid-row: 2;
      }

      &.left {
        grid-column: 6 / 8;
        grid-row: 2;
      }
    }

    .mouth {
      grid-column: 2 / 9;
      grid-row: 3 / 5;
      background: rgb(117, 86, 22);
      mask: radial-gradient(65% 30% at top, rgba(0, 0, 0, 0) 99%, #000);
      clip-path: ellipse(50% 90% at 50% 0%);
    }

    .tounge {
      display: flex;
      flex-direction: column;
      align-items: center;
      grid-column: 4 / 7;
      grid-row: 4 / 6;
      background: rgb(227, 119, 132);
      mask: radial-gradient(90% 20% at top, rgba(0, 0, 0, 0) 99%, #000);
      clip-path: circle(55% at 50% 45%);
      translate: 0 -10%;
    }

    .tounge-center {
      width: 10%;
      flex-grow: 0.8;
      background: rgb(215, 84, 89);
      clip-path: ellipse(150% 80% at 50% 15%);
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Smiley {}
