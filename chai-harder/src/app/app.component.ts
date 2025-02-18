import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GridComponent } from './grid/grid.component';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {JsonPipe} from '@angular/common';

import OpenAI from "openai";
import { environment } from '../../environment.dev';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    GridComponent,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  openai: any;
  title = 'chai-harder';

  constructor() {
    this.openai = new OpenAI({
      apiKey: environment.chatGptApiKey,
      dangerouslyAllowBrowser: true
    });
  }

  ngOnInit() {
    console.log("AppComponent initialized");
  
    const completion = this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content": "Generate a review for a person using the following words: kind, knowledgeable, and helpful."},
      ],
    });
    completion.then((result: { choices: { message: any; }[]; }) => console.log(result.choices[0].message));
  } 
  
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  //example 
  length = 18;
  pageSize = 6;
  pageIndex = 0;

  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}

