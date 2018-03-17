import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {TimerService} from '../timer.service';

@Component({
  selector: 'app-timer',
  template: `
    <h1>
      {{hoursDisplay ? hoursDisplay : '00'}} : {{(minutesDisplay) &&
    (minutesDisplay <= 59) ? minutesDisplay : '00'}} : {{(secondsDisplay) &&
    (secondsDisplay <= 59) ? secondsDisplay : '00'}} <br/>
    </h1>
  `,
  styles: [`
    h1 {
      color: #57acec;
      margin-top: 24px;
      text-align: center;
    }
  `]
})
export class TimerComponent implements OnInit, OnDestroy {

  private timerCurrentStatus: any;

  ticks = 0;
  start = 0;

  minutesDisplay = 0;
  hoursDisplay = 0;
  secondsDisplay = 0;

  sub: Subscription;

  constructor(private timeService: TimerService) {
  }

  ngOnInit() {
    this.timerCurrentStatus = this.timeService.timerStatus$.subscribe((res: any) => this.timerStatus(res));
  }

  ngOnDestroy() {
    this.timerCurrentStatus.unsubscribe();
  }

  private timerStatus(res: any) {
    if (res.play) {
      this.startTimer();
    } else if (res.stop) {
      this.stopTimer();
    } else if (res.reset) {
      this.resetTimer();
    }
  }

  public startTimer() {
    const source = Observable.timer(0, 1000);
    this.sub = source.subscribe(
      t => {
        this.ticks = this.start + t;

        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);

      }
    );
  }

  public stopTimer() {
    this.start = this.ticks;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public resetTimer() {
    this.start = 0;
    this.ticks = 0;
    this.minutesDisplay = 0;
    this.hoursDisplay = 0;
    this.secondsDisplay = 0;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private getSeconds(ticks: number) {
    return this.pad(ticks % 60);
  }

  private getMinutes(ticks: number) {
    return this.pad((Math.floor(ticks / 60)) % 60);
  }

  private getHours(ticks: number) {
    return this.pad(Math.floor((ticks / 3600) % 24));
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }
}
