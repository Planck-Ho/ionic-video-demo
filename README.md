# ionic 全屏播放视频

> ionic 中用 html5 的 video 标签播放视频，但是全屏的时候会黑屏。现在通过旋转手机屏幕和样式调整的方式，来模拟全屏视频播放。

## 效果演示

<p align="center">
   <img width="400" src="https://github.com/hamal-ho/ionic-video-demo/blob/master/src/assets/imgs/demo.gif">
</p>

## 依赖

安装 [Screen Orientation](https://ionicframework.com/docs/native/screen-orientation) 插件

```bash

ionic cordova plugin add cordova-plugin-screen-orientation

npm install @ionic-native/screen-orientation

```

## 使用

1. 添加 video 标签

```html
<div class="video-player" [ngClass]="isFull? 'full' : 'original'">
  <video
    crossorigin
    controls
    controlslist="nodownload nofullscreen"
    src="assets/videos/ice-age.mp4"
    #player
  ></video>
  <button class="res-btn" ion-button *ngIf="isFull" (click)="restore()">
    退出全屏
  </button>
</div>

<button ion-button (click)="full()">全屏</button>
```

2. 添加样式

```scss
.full {
  position: absolute !important;
  height: 100vh;
  z-index: 999;
}

.original {
  position: relative;
  height: 50vw;
}

.video-player {
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #000;

  video {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.res-btn {
  background-color: transparent;
}
```

3. 编写全屏切换方法

```typescript

import { Content, Navbar } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';

...
export class MyPage {

  ...

  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navbar: Navbar;
  // 当前滚动距离
  private scrollHeight: number;
  isFull = false;

  constructor(
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar
  ) {}

  // 全屏
  async full() {
    this.scrollHeight = this.content.getContentDimensions().scrollTop;
    // 横屏
    await this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.LANDSCAPE_PRIMARY
    );
    // 隐藏状态栏
    this.statusBar.hide();
    this.isFull = true;
    this.content.scrollToTop(0);
    // 禁止手势滚动
    this.content.setScrollElementStyle('overflowY', 'hidden');
    // 隐藏ion-header
    this.navbar.setHidden(true);
    this.content.resize();
  }

  // 还原
  async restore(): Promise<void> {
    // 切换为竖屏
    await this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY
    );
    // 显示状态栏
    this.statusBar.show();
    // 显示ion-header
    this.navbar.setHidden(false);
    this.isFull = false;
    // 恢复手势滚动
    this.content.setScrollElementStyle('overflowY', 'scroll');
    // 滚动到原来的位置
    setTimeout(() => {
      this.content.scrollTo(0, this.scrollHeight, 0);
    }, 300);
    this.content.resize();
  }
}

```
