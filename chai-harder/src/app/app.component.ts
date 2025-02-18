import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import OpenAI from "openai";
import { environment } from '../../environment.dev';

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

}
