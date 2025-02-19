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
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    pronounCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    additionalInfoCrtl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    result: ['', Validators.required],
  });
  isLinear = false;
  public selectedAdjectives: string = '';

  constructor() {
    this.openai = new OpenAI({
      apiKey: environment.chatGptApiKey,
      dangerouslyAllowBrowser: true
    });
  }

  ngOnInit() {
    console.log("AppComponent initialized");
    // used for testing. So we don't make unnecessary API calls
    // const message = "Karthik is a remarkable individual who exemplifies the qualities of a smart, passionate, and resilient professional. His intellect shines through in every project he undertakes, and his ability to tackle challenges head-on sets him apart from his peers. All clients loved him during our recent engagements, as he consistently went above and beyond to ensure their needs were met and their expectations exceeded.One standout moment was when Karthik created an architecture diagram that the entire team was impressed by. His meticulous attention to detail and innovative thinking not only enriched our understanding of the project but also provided a clear roadmap for our next steps. It’s clear that he possesses a keen understanding of complex concepts and can communicate them effectively to both technical and non-technical stakeholders alike.Moreover, his managerial skills are truly noteworthy; they need to be studied by others who aspire to lead. Karthik’s ability to motivate and inspire his colleagues while maintaining a positive and productive environment is a testament to his leadership potential. He navigates challenges with resilience and grace, making him an invaluable asset to any team.Overall, Karthik is a force to be reckoned with, and I have no doubt that he will continue to achieve great things in his career. Anyone would be fortunate to work alongside him!";
    // this.thirdFormGroup.setValue({result: message});
  } 

  onFinalStep() {
  
    const completion = this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {
          "role": "user", 
          "content": `Generate a review for a person named ${this.firstFormGroup.value.nameCtrl}. Pronouns are ${this.firstFormGroup.value.pronounCtrl}. Use the following words: ${this.selectedAdjectives}. Also use these phrases: ${this.secondFormGroup.value.additionalInfoCrtl}.`},
      ],
    });
    completion.then((result: { choices: { message: any; }[]; }) => {
      console.log(result.choices[0].message.content)
      this.thirdFormGroup.setValue({result: result.choices[0].message.content});
    });

  }

  onValueChange(value: string) {
    this.selectedAdjectives = value;
  }
}

