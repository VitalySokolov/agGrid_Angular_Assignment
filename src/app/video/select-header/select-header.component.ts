import { Component, OnDestroy } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-select-header',
  template: `<input type="checkbox" [checked]="isAllSelected" (change)="toggleSelection()" />`,
})
export class SelectHeaderComponent implements IHeaderAngularComp, OnDestroy {
  private gridApi;
  private gridColumnApi;
  private params: any;

  isAllSelected = false;

  selectionChangedHandler = (event) => {
    this.isAllSelected = true;
    event.api.forEachNode((node) => {
      if (!node.isSelected()) {
        this.isAllSelected = false;
      }
    });
  }

  agInit(params: IHeaderParams): void {
    this.params = params;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.addEventListener('selectionChanged', this.selectionChangedHandler);
  }

  toggleSelection() {
    this.isAllSelected = !this.isAllSelected;

    if (this.isAllSelected) {
      this.gridApi.selectAll();
    } else {
      this.gridApi.deselectAll();
    }
  }

  ngOnDestroy(): void {
    this.gridApi.removeEventListener('selectionChanged', this.selectionChangedHandler);
  }
}
