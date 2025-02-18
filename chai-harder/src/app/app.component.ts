import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import OpenAI from "openai";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chai-harder';
  openai: any;

  constructor() {
    this.openai = new OpenAI({
      apiKey: "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", dangerouslyAllowBrowser: true
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

}
