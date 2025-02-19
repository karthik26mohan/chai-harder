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
        {"role": "user", "content": "Generate a review for a person named Naomi. Her pronouns are she/her. Use the following words: kind, knowledgeable, helpful. Also use these phrases: I enjoyed working on hackathon with her. she is always on time to meetings. She is funny and always sick."},
      ],
    });
    completion.then((result: { choices: { message: any; }[]; }) => console.log(result.choices[0].message.content));
  } 
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    pronounCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

}

