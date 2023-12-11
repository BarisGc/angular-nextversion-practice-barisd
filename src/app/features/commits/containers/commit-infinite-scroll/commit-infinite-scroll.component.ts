import {
  Component,
  DestroyRef,
  TrackByFunction,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DummyDataForInfiniteScroll } from '../../models/commit';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { CommitService } from '../../services/commit.service';
import { ScrollNearEndDirective } from '../../directives/scroll-near-end.directive';
import { ResetHorizontalScrollDirective } from '../../directives/reset-horizontal-scroll.directive';
import { MatButtonModule } from '@angular/material/button';

const PIPES: any = [];
const COMPONENTS: any = [];
const MODULES = [MatTableModule, ScrollNearEndDirective,ResetHorizontalScrollDirective, MatButtonModule];
const DIRECTIVES: any = [];
@Component({
  selector: 'app-commit-infinite-scroll',
  standalone: true,
  templateUrl: './commit-infinite-scroll.component.html',
  styleUrl: './commit-infinite-scroll.component.scss',
  imports: [...PIPES, ...COMPONENTS, ...MODULES, ...DIRECTIVES],
})
export class CommitInfiniteScrollComponent {
  isYScrollReset = false
  private defaultValue = 30;

  // TODO: check all properties in the project if private keyword necessary, make private if no used in template
  private commitService = inject(CommitService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.setInitialState();
  }
  setInitialState() {
    this.getDummyDataForInfiniteScroll();
  }
  // TODO: convert into signal completely
  getDummyDataForInfiniteScroll() {
    this.commitService
      .getDummyDataForInfiniteScroll()
      .pipe(
        tap((data) => {
          this.dummyDataSignal.set(data ?? []);
          this.limitSignal.set(this.defaultValue);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  // internal collection of DummyData
  private dummyDataSignal = signal<DummyDataForInfiniteScroll[]>([]);
  // how many elements I want to display
  private limitSignal = signal<number>(this.defaultValue);

  dataSourceSignal = computed(() => {
    // slice data to display only portion of them
    const data = this.dummyDataSignal().slice(0, this.limitSignal());

    // create correct data structure
    return new MatTableDataSource<DummyDataForInfiniteScroll>(data);
  });

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age'];

  // tracking indentity for rendering
  identity: TrackByFunction<DummyDataForInfiniteScroll> = (
    _,
    item: DummyDataForInfiniteScroll
  ) => item.id;

  onReset(): void {
    this.limitSignal.set(this.defaultValue);
    this.isYScrollReset = true
  }

  // increase the number of displayed items
  onNearEndScroll(): void {
    this.isYScrollReset = false
    this.limitSignal.update((val) => val + this.defaultValue);
  }

  addData() {
    this.isYScrollReset = false
    this.limitSignal.update((val) => val + this.defaultValue);
  }
}
