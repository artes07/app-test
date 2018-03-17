import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class TimerService {

  private play = false;
  private stop = false;
  private reset = true;
  private clicks = 0;
  private timeout;
  public timerStatus$ = new EventEmitter();

  public startStopTimer() {
    if (this.play === false) {
      this.play = true;
      this.stop = false;
      this.reset = false;

      this.timerStatus$.emit({
        play: this.play
      });
    } else {
      this.play = false;
      this.stop = true;
      this.reset = false;

      this.timerStatus$.emit({
        stop: this.stop
      });
    }
  }

  public waitTimer() {
    this.clicks++;
    if (this.clicks === 1) {
      this.timeout = setTimeout(() => (this.clicks = 0), 300);
    } else {
      clearTimeout(this.timeout);
      this.clicks = 0;

      this.play = false;
      this.stop = true;
      this.reset = false;

      this.timerStatus$.emit({
        stop: this.stop
      });
    }
  }

  public resetTimer() {
    this.play = false;
    this.stop = false;
    this.reset = true;

    this.timerStatus$.emit({
      reset: this.reset
    });
  }

}
