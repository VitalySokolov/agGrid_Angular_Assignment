import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoAggregatorComponent } from './video/video-aggregator/video-aggregator.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoListComponent } from './video/video-list/video-list.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { ThumbnailRendererComponent } from './video/thumbnail-renderer/thumbnail-renderer.component';
import { DateRendererComponent } from './video/date-renderer/date-renderer.component';
import { VideoSearchComponent } from './video/video-search/video-search.component';
import { SelectHeaderComponent } from './video/select-header/select-header.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoAggregatorComponent,
    VideoListComponent,
    ThumbnailRendererComponent,
    DateRendererComponent,
    VideoSearchComponent,
    SelectHeaderComponent,
  ],
  imports: [
    AgGridModule.withComponents([
      DateRendererComponent,
      ThumbnailRendererComponent,
      SelectHeaderComponent,
    ]),
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
