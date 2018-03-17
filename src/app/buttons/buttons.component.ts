import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimerService} from '../timer.service';

@Component({
  selector: 'app-buttons',
  template: `
    <div class="col btns">
      <button class="btn" [ngClass]="{ 'btn-success' : !play, 'btn-danger' : play }"
              (click)="startStopTimer()">{{ !play ? 'Start' : 'Stop' }}
      </button>
      <button class="btn btn-warning" [disabled]=" !this.play " (click)="waitTimer()">Wait</button>
      <button class="btn btn-primary" (click)="resetTimer()">Reset</button>
    </div>
  `,
  styles: [`
    .btns {
      text-align: center;
    }
  `]
})
export class ButtonsComponent implements OnInit, OnDestroy {

  private timerCurrentStatus: any;
  private play: boolean;

  constructor(private timerService: TimerService) {
  }

  ngOnInit() {
    this.timerCurrentStatus = this.timerService.timerStatus$.subscribe((res: any) => this.setPlay(res));

  }

  ngOnDestroy() {
    this.timerCurrentStatus.unsubscribe();
  }

  private setPlay(res: any) {
    (res.play) ? this.play = true : this.play = false;
  }

  startStopTimer() {
    this.timerService.startStopTimer();
  }

  waitTimer() {
    this.timerService.waitTimer();
  }

  resetTimer() {
    this.timerService.resetTimer();
  }

}
