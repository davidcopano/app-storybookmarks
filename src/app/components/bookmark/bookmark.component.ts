import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalController, PopoverController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { Bookmark } from '../../interfaces';
import { BookmarkOptionsComponent } from '../bookmark-options/bookmark-options.component';
import { LangService } from 'src/app/services/lang/lang.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { OptionsService } from 'src/app/services/options/options.service';

const { Browser } = Plugins;

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {

  @Input() item: Bookmark;

  public itemDefaultBorderColor = 'black';
  private linkCopiedToClipboardText: string;

  constructor(
    public sanitizer: DomSanitizer,
    private translateService: TranslateService,
    public popoverCtrl: PopoverController,
    public langService: LangService,
    public utilitiesService: UtilitiesService,
    public optionsService: OptionsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getTranslationValues().subscribe(translations => {
      this.linkCopiedToClipboardText = translations.linkCopiedToClipboardText;
    });
  }

  openLink(url: string) {
    const styles = getComputedStyle(document.documentElement);
    const value = String(styles.getPropertyValue('--ion-color-primary')).trim();
    Browser.open({
      url: url,
      toolbarColor: value ? value : '#247ba0'
    });
  }

  async viewImage() {
    const modal = await this.modalController.create({
      component: ViewerModalComponent,
      componentProps: {
        src: this.item.url,
        text: this.item.title,
        scheme: this.optionsService.enable_dark_mode ? 'dark' : 'light',
        swipeToClose: false
      },
      cssClass: 'ion-img-viewer',
      keyboardClose: true,
      showBackdrop: true
    });
    modal.present();
  }

  copyLink(url: string) {
    this.utilitiesService.copyToClipboard(url);
    this.utilitiesService.showToast(this.linkCopiedToClipboardText);
  }

  async showPopover($event: any, item: Bookmark) {
    const popover = await this.popoverCtrl.create({
      component: BookmarkOptionsComponent,
      event: $event,
      translucent: true,
      componentProps: {
        item
      }
    });
    await popover.present();
  }

  private getTranslationValues() {
    return forkJoin(
      [
        this.translateService.get('LINK_COPIED_TO_CLIPBOARD')
      ]
    ).pipe(
      map((
        [
          linkCopiedToClipboardText
        ]
      ) => {
        return {
          linkCopiedToClipboardText,
        };
      })
    );
  }
}
