import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VideoItem } from '../model/video-item';

@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.scss']
})
export class VideoSearchComponent {

  @Input() videoItems: VideoItem[];
  @Input() nextPageToken: string;
  @Input() prevPageToken: string;

  @Output() newPageRequested: EventEmitter<string> = new EventEmitter();

  onGetNewPageTap(token: string) {
    this.newPageRequested.emit(token);
  }
}
