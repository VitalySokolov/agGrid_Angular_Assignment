import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { VideoAggregatorComponent } from './video-aggregator.component';
import { VideoSearchComponent } from '../video-search/video-search.component';
import { of } from 'rxjs';
import { YoutubeResponse } from '../model/youtube-response';
import { VideoService } from '../video.service';

describe('VideoAggregatorComponent', () => {
  let component: VideoAggregatorComponent;
  let fixture: ComponentFixture<VideoAggregatorComponent>;

  beforeEach(async(() => {
    const videoServiceSpy = jasmine.createSpyObj('VideoService', ['getVideos']);
    const getVideosSpy = videoServiceSpy.getVideos.and.returnValue(of(youtubeResponse));

    TestBed.configureTestingModule({
      declarations: [
        VideoAggregatorComponent,
        MockComponent(VideoSearchComponent),
      ],
      providers: [
        {provide: VideoService, useValue: videoServiceSpy},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

const youtubeResponse: YoutubeResponse = {
  prevPageToken: 'prevPageToken',
  nextPageToken: 'nextPageToken',
  items: [
    {
      id: {videoId: 'ID'},
      snippet: {
        title: 'Title',
        publishedAt: '',
        description: '',
        thumbnails: {
          default: {
            url: 'string',
            width: 100,
            height: 100,
          }
        }
      }
    },
  ]
};
