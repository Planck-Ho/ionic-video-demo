import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, Navbar } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navbar: Navbar;

  private scrollHeight: number;

  isFull = false;

  constructor(
    private screenOrientation: ScreenOrientation,
    private statusBar: StatusBar
  ) {}

  ionViewDidLoad() {}

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
