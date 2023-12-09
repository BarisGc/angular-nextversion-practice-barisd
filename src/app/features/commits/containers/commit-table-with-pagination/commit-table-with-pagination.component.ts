import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const PIPES: any = [];
const COMPONENTS: any = [];
const MODULES: any = [];
const DIRECTIVES: any = [];
@Component({
  selector: 'app-commit-table-with-pagination',
  standalone: true,
  templateUrl: './commit-table-with-pagination.component.html',
  styleUrl: './commit-table-with-pagination.component.scss',
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
})
export class CommitTableWithPaginationComponent {}
