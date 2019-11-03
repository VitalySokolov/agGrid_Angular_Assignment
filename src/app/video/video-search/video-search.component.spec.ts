import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { VideoSearchComponent } from './video-search.component';
import { VideoListComponent } from '../video-list/video-list.component';
import { By } from '@angular/platform-browser';

describe('VideoSearchComponent', () => {
  let component: VideoSearchComponent;
  let fixture: ComponentFixture<VideoSearchComponent>;
  let nextBtn: HTMLButtonElement;
  let prevBtn: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoSearchComponent,
        MockComponent(VideoListComponent),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSearchComponent);
    component = fixture.componentInstance;

    component.videoItems = videos;
    component.nextPageToken = 'nextPageToken';
    component.prevPageToken = 'prevPageToken';
    fixture.detectChanges();

    nextBtn = fixture.debugElement.query(By.css('.btn-next')).nativeElement;
    prevBtn = fixture.debugElement.query(By.css('.btn-prev')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has disabled buttons if there are no tokens', () => {
    component.nextPageToken = null;
    component.prevPageToken = '';
    fixture.detectChanges();

    expect(nextBtn.disabled).toBe(true);
    expect(prevBtn.disabled).toBe(true);
  });

  it('should emit request with correct token', () => {
    expect(nextBtn.disabled).toBe(false);
    expect(prevBtn.disabled).toBe(false);

    spyOn(component.newPageRequested, 'emit');
    nextBtn.click();
    expect(component.newPageRequested.emit).toHaveBeenCalledWith('nextPageToken');
  });

  it('sets the right value on the child component', () => {
    const element = fixture.debugElement.query(By.css('app-video-list'));
    expect(element).toBeTruthy();

    const child: VideoListComponent = element.componentInstance;

    expect(child.videoItems).toBe(videos);
  });

  it('should display an error if videoItems are empty', () => {
    component.videoItems = [];
    fixture.detectChanges();

    const errorMsg = fixture.debugElement.query(By.css('.error-msg')).nativeElement;
    expect(errorMsg.textContent.trim()).toBe('Server error. Please try again later.');
  });
});

const videos = [
  {
    videoId: 'videoId',
    title: 'title',
    description: 'description',
    publishedAt: 'publishedAt',
    thumbnail: {
      url: 'url',
      width: 100,
      height: 100,
    },
  },
];
