import { NgModule } from '@angular/core';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkOptionsComponent } from './bookmark-options/bookmark-options.component';
import { FolderComponent } from './folder/folder.component';
import { FolderOptionsComponent } from './folder-options/folder-options.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        IonicModule,
        TranslateModule
    ],
    declarations: [
        BookmarkComponent,
        BookmarkOptionsComponent,
        FolderComponent,
        FolderOptionsComponent,
        SearchResultsComponent,
    ],
    exports: [
        BookmarkComponent,
        BookmarkOptionsComponent,
        FolderComponent,
        FolderOptionsComponent,
        SearchResultsComponent
    ],
})
export class ComponentsModule { }