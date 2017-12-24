import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, Navbar, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-video-play',
  templateUrl: 'video-play.html',
})
export class VideoPlayPage implements OnInit, OnDestroy {

  @ViewChild('player')
  private player: ElementRef;


  @ViewChild(Navbar)
  private navbar: Navbar;

  @ViewChild(Content)
  private content: Content;



  start: boolean = false;

  videoElement: HTMLVideoElement;

  currentTime: number = 0;

  hideControl: boolean = false;


  isFull: boolean = false;

  private currentTime$: Observable<number>;

  private currentTimeSubscription: Subscription;


  private timer: number = null;


  private scrollHeight: number;


  constructor(
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar
  ) {
  }

  ngOnInit() {
    this.videoElement = this.player.nativeElement;
    this.currentTime$ = Observable.interval(1000).map(() => this.videoElement.currentTime);
  }

  ngOnDestroy() {
    if(this.currentTimeSubscription) this.currentTimeSubscription.unsubscribe();
  }



  startPlay(): void {

    this.play();

    this.start = true;

    this.hideControl = true;
  }


  togglePause(): void {


    if (this.videoElement.paused) {
      this.play();


    } else {
      
      this.pause();
    }

  }



  toggleControl(): void {

    if (this.hideControl) {

      this.hideControl = false;
      this.timer = setTimeout(() => {
        this.hideControl = true;
      }, 4000);

    } else {

      if (!this.videoElement.paused) {
        clearTimeout(this.timer);
        this.hideControl = true;
      }

    }
  }


  // 全屏
  async full(): Promise<void> {

    this.scrollHeight = this.content.getContentDimensions().scrollTop;
    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);
    this.statusBar.hide();
    this.isFull = true;
    this.content.scrollToTop(0);
    this.content.getScrollElement().style.overflowY = 'hidden';
    this.navbar.setHidden(true);
    clearTimeout(this.timer);
    this.hideControl = true;
    this.content.resize();

  }

  // 还原
  async restore(): Promise<void> {

    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    this.statusBar.show();
    this.navbar.setHidden(false);
    this.isFull = false;
    this.content.getScrollElement().style.overflowY = 'scroll';
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


  private play(): void {

    if (this.currentTimeSubscription) this.currentTimeSubscription.unsubscribe();

    this.currentTimeSubscription = this.currentTime$.subscribe(time => {
      this.currentTime = time;
    });

    this.videoElement.play();

    this.timer = setTimeout(() => {
      this.hideControl = true;

    }, 4000);



  }

  private pause(): void {

    this.currentTimeSubscription.unsubscribe();

    this.videoElement.pause();

    clearTimeout(this.timer);


  }




}
