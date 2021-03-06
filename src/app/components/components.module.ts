import { NgModule } from '@angular/core';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkOptionsComponent } from './bookmark-options/bookmark-options.component';
import { FolderComponent } from './folder/folder.component';
import { FolderOptionsComponent } from './folder-options/folder-options.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { MomentModule } from 'ngx-moment';
import { LoadingComponent } from './loading/loading.component';
import { NoResultsComponent } from './no-results/no-results.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        IonicModule,
        TranslateModule,
        MomentModule,
        CommonModule,
        PipesModule,
        NgxIonicImageViewerModule
    ],
    declarations: [
        BookmarkComponent,
        BookmarkOptionsComponent,
        FolderComponent,
        FolderOptionsComponent,
        SearchResultsComponent,
        LoadingComponent,
        NoResultsComponent
    ],
    exports: [
        BookmarkComponent,
        BookmarkOptionsComponent,
        FolderComponent,
        FolderOptionsComponent,
        SearchResultsComponent,
        LoadingComponent,
        NoResultsComponent
    ],
})
export class ComponentsModule { }
