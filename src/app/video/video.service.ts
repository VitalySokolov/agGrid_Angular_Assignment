import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { YoutubeResponse } from './model/youtube-response';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private youtubeSearch = 'https://www.googleapis.com/youtube/v3/search';
  private key = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
  private maxResults = 50;
  private type = 'video';
  private part = 'snippet';
  private q = 'john';
  private params = `?key=${this.key}&maxResults=${this.maxResults}&type=${this.type}&part=${this.part}&q=${this.q}`;
  private youtubeSearchUrl = `${this.youtubeSearch}${this.params}`;

  constructor(private http: HttpClient) {
  }

  getVideos(token: string): Observable<YoutubeResponse> {
    const searchUrl = !!token ? `${this.youtubeSearchUrl}&pageToken=${token}` : this.youtubeSearchUrl;
    const emptyResult = {
      nextPageToken: '',
      prevPageToken: '',
      items: [],
    };

    return this.http.get<YoutubeResponse>(searchUrl)
      .pipe(
        catchError(this.handleError<YoutubeResponse>('fetch videos', emptyResult as YoutubeResponse)),
        tap(_ => console.log('fetched videos'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (_: any): Observable<T> => of(result as T);
  }
}
