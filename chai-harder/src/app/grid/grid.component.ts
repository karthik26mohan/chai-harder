import { Component, EventEmitter, inject, input, Input, Output } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { descriptors } from './descriptors.constants';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  imports: [MatGridListModule, 
      MatButtonModule,
      MatStepperModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatSelectModule,
      MatPaginator,
     ],

})
export class GridComponent {
  // pagination
   length = 18;
   pageSize = 6;
   pageIndex = 0;
   hidePageSize = true;
   showPageSizeOptions = true;
   showFirstLastButtons = true;
   disabled = false;
   pageEvent: PageEvent | undefined;

   toggle = true;
   selected: number[] = [];
   @Output() valueChange = new EventEmitter<string>();
   flattenedDiscriptors: { id: number, descriptor: string }[] = [];

  //groups
  public discriptorGroups: { id: number, descriptor: string }[][] = descriptors;
  public group: { id: number, descriptor: string }[] = [];

   ngOnInit() {
    this.group = this.discriptorGroups[0];
    this.flattenedDiscriptors = descriptors.flat();
  } 
 
   handlePageEvent(e: PageEvent) {
     this.pageEvent = e;
     this.group = this.discriptorGroups[e.pageIndex];
     this.length = e.length;
     this.pageSize = e.pageSize;
     this.pageIndex = e.pageIndex;
   }

   public highlight(index: number) {
    if (this.selected.includes(index)) {
      this.selected = this.selected.filter((i) => i !== index);
    } else {
      this.selected.push(index);
    }
    // get a string of the selected descriptors
    const selectedDescriptors = this.selected.map((i) => this.flattenedDiscriptors.find(g => g.id === i)?.descriptor).join(", ");
    this.valueChange.emit(selectedDescriptors);
  }

}