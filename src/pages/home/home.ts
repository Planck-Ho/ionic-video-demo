import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SafariViewController } from '@ionic-native/safari-view-controller';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    private navCtrl: NavController,
    private safariViewController: SafariViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goVideoPlay(): void {
    this.navCtrl.push('VideoPlayPage');
  }

  test(){
    this.safariViewController.isAvailable()
  .then((available: boolean) => {
      if (available) {

        this.safariViewController.show({
          url: 'http://www.baidu.com',
          hidden: false,
          animated: false,
          transition: 'curl',
          enterReaderModeIfAvailable: true,
          tintColor: '#ff0000'
        })
        .subscribe((result: any) => {
            console.log(result,'====');
            
          },
          (error: any) => console.error(error)
        );

      } else {

        console.log('===');
        
        // use fallback browser, example InAppBrowser
      }
    }
  );
  }

}
