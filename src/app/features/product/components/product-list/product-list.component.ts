import { Component, Input, ViewChild, inject } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../models/product';
import { CommonModule, JsonPipe, NgOptimizedImage } from '@angular/common';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
const PIPES = [JsonPipe];
const COMPONENTS = [ProductItemComponent];
const MODULES = [
  MatTableModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  CdkDropList,
  CdkDrag,
  CommonModule,
];
const DIRECTIVES = [NgOptimizedImage];
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  @Input() set products(value: Product[]) {
    this.dataSource.data = value;
  }
  @Input({ required: true }) isLoading = true;

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    if (!this.dataSource.sort) {
      this.dataSource.sort = sort;
    }
  }
  @ViewChild(MatTable) matTable!: MatTable<any>;

  columns = this.setColumns();
  displayedColumns = this.setDisplayedColumns();
  stickyStartColumns = ['id'];
  stickyEndColumns = ['stock', 'thumbnail'];

  getTotalStock() {
    return this.dataSource.data
      .map((t) => t.stock)
      .reduce((acc, value) => acc + value, 0);
  }

  setDisplayedColumns() {
    return this.setColumns().map((c) => c.columnDef);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
  }
  setColumns() {
    const columns = [
      {
        columnDef: 'id',
        header: 'Id',
        cell: (element: Product) => `${element.id}`,
      },
      {
        columnDef: 'title',
        header: 'Title',
        cell: (element: Product) => `${element.title}`,
      },
      {
        columnDef: 'brand',
        header: 'Brand',
        cell: (element: Product) => `${element.brand}`,
      },
      {
        columnDef: 'category',
        header: 'Category',
        cell: (element: Product) => `${element.category}`,
      },
      // {
      //   columnDef: 'description',
      //   header: 'Description',
      //   cell: (element: Product) => `${element.description}`,
      // },
      {
        columnDef: 'discountPercentage',
        header: 'Discount %',
        cell: (element: Product) => `${element.discountPercentage}`,
      },

      {
        columnDef: 'price',
        header: 'Price',
        cell: (element: Product) => `${element.price}`,
      },
      {
        columnDef: 'rating',
        header: 'Rating',
        cell: (element: Product) => `${element.rating}`,
      },
      {
        columnDef: 'stock',
        header: 'Stock',
        cell: (element: Product) => `${element.stock}`,
      },

      {
        columnDef: 'thumbnail',
        header: 'Thumbnail',
        cell: (element: Product) => `${element.thumbnail}`,
      },
    ];
    return columns;
  }
}
