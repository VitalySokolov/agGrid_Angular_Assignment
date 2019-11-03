import { VideoService } from './video.service';
import { YoutubeResponse } from './model/youtube-response';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('VideoService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let videoService: VideoService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    videoService = new VideoService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(videoService).toBeTruthy();
  });

  it('should return expected response (HttpClient called once)', () => {
    const expectedResponse: YoutubeResponse = {
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

    httpClientSpy.get.and.returnValue(of(expectedResponse));

    videoService.getVideos('').subscribe(
      videoResponse => expect(videoResponse).toEqual(expectedResponse, 'expected response'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return empty object when server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    const emptyResult = {
      nextPageToken: '',
      prevPageToken: '',
      items: [],
    };

    httpClientSpy.get.and.returnValue(throwError(errorResponse));

    videoService.getVideos('').subscribe(
      videoResponse => expect(videoResponse).toEqual(emptyResult, 'emptyResponse'),
      fail
    );
  });
});
