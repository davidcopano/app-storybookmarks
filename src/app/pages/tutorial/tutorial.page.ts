import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../../services/lang/lang.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(public translateService: TranslateService, public langService: LangService) { }

  ngOnInit() {
  }

  async changeLang(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.langService.saveLang(lang);
  }
}
