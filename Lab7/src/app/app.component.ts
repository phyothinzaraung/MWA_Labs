import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>
      Welcome to {{title}}!
    </h1>
    <app-one 
    (send_data) = "receiveData($event)">
  </app-one>
    <app-two [receiveData] = "myData" ></app-two>
  `,
  styles: []
})
export class AppComponent {
  title = 'homework07';
  myData: { data: string } = {data: ""};


  receiveData(data: {data: string}){
    this.myData = data;
  }
}
