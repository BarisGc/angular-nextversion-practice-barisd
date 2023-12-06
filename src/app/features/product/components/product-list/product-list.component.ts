import { Component, Input } from '@angular/core';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../models/product';
import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

const PIPES = [JsonPipe];
const COMPONENTS = [ProductItemComponent];
const MODULES = [MatTableModule];
const DIRECTIVES: any = [NgOptimizedImage];
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input() products: Product[] = [];

  columns = this.setColumns();
  displayedColumns = this.setDisplayedColumns();

  getTotalStock() {
    return this.products
      .map((t) => t.stock)
      .reduce((acc, value) => acc + value, 0);
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
  setDisplayedColumns() {
    return this.setColumns().map((c) => c.columnDef);
  }
}
