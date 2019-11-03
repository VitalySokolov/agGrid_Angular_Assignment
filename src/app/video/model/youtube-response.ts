export interface YoutubeResponse {
  nextPageToken: string;
  prevPageToken: string;
  items: YoutubeItem[];
}

export interface YoutubeItem {
  id: {
    videoId: string;
  };

  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      }
    }
  };
}
