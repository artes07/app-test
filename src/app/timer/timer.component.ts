import {Component} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-timer',
  template: `
    <div>
      <h1>
        {{hoursDisplay ? hoursDisplay : '00'}} : {{(minutesDisplay) &&
        (minutesDisplay <= 59) ? minutesDisplay : '00'}} : {{(secondsDisplay) &&
        (secondsDisplay <= 59) ? secondsDisplay : '00'}} <br/>
      </h1>
      <div class="col btns">
        <button class="btn" [ngClass]="{ 'btn-success' : !play, 'btn-danger' : play }"
                (click)="startStopTimer()">{{ !play ? 'Start' : 'Stop' }}</button>
        <!--<button (dblclick)="waitTimer()">Wait</button>-->
        <button id="wait" class="btn btn-warning" [disabled]=" this.ticks === 0 " (click)="waitTimer()">Wait</button>
        <button class="btn btn-primary" (click)="resetTimer()">Reset</button>
      </div>
    </div>
  `,
  styles: [ `
      h1 {
        color: #57acec;
        margin-top: 24px;
        text-align: center;
      }
      .btns {
        text-align: center;
      }
    `]
})
export class TimerComponent {

  ticks = 0;
  start = 0;

  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;

  public play = false;

  sub: Subscription;

  constructor() { }

  public startStopTimer() {
    if (this.play === false) {
      this.play = true;
      const source = Observable.timer(1, 1000);
      this.sub = source.subscribe(
        t => {
          this.ticks = this.start + t;

          this.secondsDisplay = this.getSeconds(this.ticks);
          this.minutesDisplay = this.getMinutes(this.ticks);
          this.hoursDisplay = this.getHours(this.ticks);

        }
      );
    } else {
      this.play = false;
      this.start = this.ticks;
      if (this.sub) { this.sub.unsubscribe(); }
    }
  }

  /*When using "dblclick"*/
  /*private waitTimer() {
    if (this.ticks !== 0) {
      this.play = false;
      this.start = this.ticks;
      if (this.sub) { this.sub.unsubscribe(); }
    }
  }*/

  public waitTimer() {
    if (this.ticks !== 0) {
      const clickStream = Observable.fromEvent(document.getElementById('wait'), 'click');
      clickStream
        .bufferTime(300)
        .map(arr => arr.length)
        .filter(x => x === 2)
        .subscribe(() => {
          this.play = false;
          this.start = this.ticks;
          if (this.sub) { this.sub.unsubscribe(); }
        });
    }
  }

  public resetTimer() {
    this.play = false;
    this.start = 0;
    this.ticks = 0;
    this.minutesDisplay = 0;
    this.hoursDisplay = 0;
    this.secondsDisplay = 0;
    if (this.sub) { this.sub.unsubscribe(); }
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 60) / 60));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }


}
