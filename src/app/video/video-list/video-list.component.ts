import { Component, Input } from '@angular/core';
import { VideoItem } from '../model/video-item';
import { ThumbnailRendererComponent } from '../thumbnail-renderer/thumbnail-renderer.component';
import { DateRendererComponent } from '../date-renderer/date-renderer.component';
import { SelectHeaderComponent } from '../select-header/select-header.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private context;
  private rowSelection;
  private frameworkComponents;

  isRowSelectable = true;
  selectedRows = 0;

  @Input() videoItems: VideoItem[];

  constructor() {
    this.columnDefs = [
      {
        headerName: '',
        colId: 'checkbox',
        checkboxSelection: true,
        headerComponent: 'selectHeaderComponent',
        width: 40,
        suppressSizeToFit: true,
        sortable: false,
        resizable: false,
      },
      {
        headerName: 'Video Title',
        field: 'title',
        cellStyle: {'white-space': 'normal'},
        autoHeight: true,
      },
      {
        headerName: 'Description',
        field: 'description',
        cellStyle: {'white-space': 'normal'},
        autoHeight: true,
        width: 400,
      },
      {
        headerName: 'Published on',
        field: 'publishedAt',
        cellRenderer: 'dateRenderer',
      },
      {
        headerName: '',
        field: 'thumbnail.url',
        cellRenderer: 'thumbnailRenderer',
        autoHeight: true,
        width: 140,
        suppressSizeToFit: true,
        sortable: false,
        resizable: false,
      },
    ];

    this.defaultColDef = {resizable: true};
    this.context = {componentParent: this};
    this.rowSelection = 'multiple';
    this.frameworkComponents = {
      dateRenderer: DateRendererComponent,
      thumbnailRenderer: ThumbnailRendererComponent,
      selectHeaderComponent: SelectHeaderComponent,
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }

  toggleSelectionMode(): void {
    this.isRowSelectable = !this.isRowSelectable;

    this.gridColumnApi.setColumnVisible('checkbox', this.isRowSelectable);
    this.gridApi.sizeColumnsToFit();

    if (!this.isRowSelectable) {
      this.gridApi.deselectAll();
    }
  }

  onSelectionChanged(event): void {
    this.selectedRows = event.api.getSelectedNodes().length;
  }

  getContextMenuItems(params) {
    const openInNewWindowItem = {
      name: 'Open in new tab',
      action: () => {
        window.open(`https://www.youtube.com/watch?v=${params.node.data.videoId}`, '_blank');
      }
    };

    if (params.column.colId === 'title') {
      params.defaultItems.unshift(openInNewWindowItem);
    }

    return params.defaultItems;
  }
}
