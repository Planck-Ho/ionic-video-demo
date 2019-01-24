import {
  Component,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Navbar, Content, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Component({
  selector: 'good-video',
  templateUrl: 'good-video.html'
})
export class GoodVideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('player')
  private player: ElementRef;

  @Input() src: string;

  @Input() poster: string;

  @Output() onPause = new EventEmitter<void>();

  @Output() onPlay = new EventEmitter<void>();

  start: boolean = false;

  videoElement: HTMLVideoElement;

  currentTime: number = 0;

  hideControl: boolean = false;

  isFull: boolean = false;

  private navbar: Navbar;

  private content: Content;

  private currentTime$: Observable<number>;

  private currentTimeSubscription: Subscription;

  private timer: number = null;

  private scrollHeight: number;

  constructor(
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar,
    private viewCtrl: ViewController
  ) {}

  ngAfterViewInit() {
    this.videoElement = this.player.nativeElement;

    this.content = this.viewCtrl.getContent();

    if (this.viewCtrl.hasNavbar()) {
      this.navbar = this.viewCtrl.getNavbar() as Navbar;
    }

    this.currentTime$ = Observable.interval(1000).map(
      () => this.videoElement.currentTime
    );
  }

  ngOnDestroy() {
    if (this.currentTimeSubscription) {
      this.currentTimeSubscription.unsubscribe();
    }
    clearTimeout(this.timer);
    this.videoElement = null;
    this.player = null;
  }

  startPlay(): void {
    this.play();

    this.start = true;

    this.hideControl = true;
  }

  toggleControl(): void {
    if (this.videoElement.paused) return;

    clearTimeout(this.timer);

    if (this.hideControl) {
      this.hideControl = false;
      this.timer = setTimeout(() => {
        this.hideControl = true;
      }, 4000);
    } else {
      this.hideControl = true;
    }
  }

  // 全屏
  async full(): Promise<void> {
    this.scrollHeight = this.content.getContentDimensions().scrollTop;
    await this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY
    );
    this.statusBar.hide();
    this.isFull = true;
    this.content.scrollToTop(0);
    this.content.setScrollElementStyle('overflowY', 'hidden');
    if (!!this.navbar) this.navbar.setHidden(true);
    clearTimeout(this.timer);
    this.hideControl = true;
    this.content.resize();
  }

  // 还原
  async restore(): Promise<void> {
    await this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
    this.statusBar.show();
    if (!!this.navbar) this.navbar.setHidden(false);
    this.isFull = false;
    this.content.setScrollElementStyle('overflowY', 'scroll');
    setTimeout(() => {
      this.content.scrollTo(0, this.scrollHeight, 0);
    }, 300);
    clearTimeout(this.timer);
    this.hideControl = true;
    this.content.resize();
  }

  focus(): void {
    this.currentTimeSubscription.unsubscribe();

    clearTimeout(this.timer);
  }

  change(): void {
    this.videoElement.currentTime = this.currentTime;
    this.play();
  }

  async play(): Promise<void> {
    if (this.currentTimeSubscription)
      this.currentTimeSubscription.unsubscribe();

    this.currentTimeSubscription = this.currentTime$.subscribe(time => {
      this.currentTime = time;
    });

    await this.videoElement.play();

    this.timer = setTimeout(() => {
      this.hideControl = true;
    }, 4000);

    this.onPlay.emit();
  }

  async pause(): Promise<void> {
    this.currentTimeSubscription.unsubscribe();
    clearTimeout(this.timer);

    await this.videoElement.pause();

    this.onPause.emit();
  }
}
