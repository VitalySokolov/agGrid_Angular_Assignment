import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video.service';
import { VideoItem } from '../model/video-item';

@Component({
  selector: 'app-video-aggregator',
  templateUrl: './video-aggregator.component.html',
})
export class VideoAggregatorComponent implements OnInit {
  nextPageToken: string;
  prevPageToken: string;
  videoItems: VideoItem[] = [];

  constructor(private videoService: VideoService) {
  }

  ngOnInit() {
    this.getVideos('');
  }

  refreshData(token: string) {
    this.getVideos(token);
  }

  getVideos(token: string): void {
    this.videoService.getVideos(token)
      .subscribe(response => {
        this.nextPageToken = response.nextPageToken;
        this.prevPageToken = response.prevPageToken;
        this.videoItems = response.items.map((item) => {
          return {
            videoId: item.id.videoId,
            title: this.convertAsciiChars(item.snippet.title),
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            thumbnail: {
              url: item.snippet.thumbnails.default.url,
              width: item.snippet.thumbnails.default.width,
              height: item.snippet.thumbnails.default.height,
            },
          };
        });
      });
  }

  convertAsciiChars(encoded: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = encoded;
    return txt.value;
  }
}
