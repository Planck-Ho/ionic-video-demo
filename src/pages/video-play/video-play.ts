import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Content } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/of';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@IonicPage()
@Component({
  selector: 'page-video-play',
  templateUrl: 'video-play.html',
})
export class VideoPlayPage implements OnInit {

  @ViewChild('player')
  private player: ElementRef;

  @ViewChild('playerBox')
  private playerBox: ElementRef;

  @ViewChild(Navbar)
  private navbar: Navbar;

  @ViewChild(Content) content: Content;



  start: boolean = false;


  videoElement: HTMLVideoElement;

  currentTime: Observable<number>;

  continued: number = 0;


  // 隐藏
  hideControl: boolean = false;

  // 全屏
  isFull: boolean = false;

  private timer: any = null;


  scrollHeight: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation
  ) {
  }

  ngOnInit() {
    this.videoElement = this.player.nativeElement;

    this.currentTime = Observable.interval(1000).map(() => {
      return this.videoElement.currentTime;
    });

  }



  ionViewDidLoad() {


  }

  startPlay(): void {

    this.videoElement.play();

    this.start = true;


    this.hideControl = true;
    // this.timer = setTimeout(() => {
    //   this.hideControl = true;
    // }, 4000);

  }

  pause(): void {


    if (this.videoElement.paused) {
      this.videoElement.play();

      this.timer = setTimeout(() => {
        this.hideControl = true;

      }, 4000);

    } else {
      clearInterval(this.timer);
      this.videoElement.pause();
    }

    console.log(this.videoElement.currentTime);


  }

  showControl() {

    

    if (this.hideControl) {
      this.hideControl = false;
      this.timer = setTimeout(() => {
        this.hideControl = true;
      }, 4000);

    }else{

      
 
      if(!this.videoElement.paused){
        clearTimeout(this.timer);
        this.hideControl=true;
      }
    }
  }


  // 全屏
  async full(e): Promise<void> {
    

    this.scrollHeight = this.content.getContentDimensions().scrollTop;



    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY);

    this.isFull = true;


    (this.playerBox.nativeElement as HTMLElement).style.position = 'absolute';

    this.content.scrollToTop(0);

    this.content.getScrollElement().style.overflowY = 'hidden';
    this.navbar.setHidden(true);
  }

  // 还原
  async restore(): Promise<void> {


    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);


    this.navbar.setHidden(false);
    this.isFull = false;
   
    (this.playerBox.nativeElement as HTMLElement).style.position = 'relative';
    this.content.getScrollElement().style.overflowY = 'scroll';

    setTimeout(() => {
      this.content.scrollTo(0, this.scrollHeight, 0);
      this.content.resize();
    },300);

  }


}
