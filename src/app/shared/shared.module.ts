import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule],
})
export class SharedModule {}
