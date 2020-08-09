import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopoverController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Bookmark } from '../../interfaces';
import { BookmarkOptionsComponent } from '../bookmark-options/bookmark-options.component';
import { LangService } from 'src/app/services/lang/lang.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { OptionsService } from 'src/app/services/options/options.service';

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
    public inAppBrowser: InAppBrowser,
    public popoverCtrl: PopoverController,
    public langService: LangService,
    public utilitiesService: UtilitiesService,
    public optionsService: OptionsService
  ) { }

  ngOnInit() {
    this.getTranslationValues().subscribe(translations => {
      this.linkCopiedToClipboardText = translations.linkCopiedToClipboardText;
    });
  }

  openLink(url: string) {
    this.inAppBrowser.create(url, '_system');
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
