import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-one',
  template: `
    <p>
      Component One
    </p>
    <button (click)="sendData()">Send Data</button>
  `,
  styles: [
  ]
})
export class OneComponent {
  @Output() send_data: EventEmitter<{data: string}> = new EventEmitter()
  sendData(){
    const data_obj = {data: "Data from Component 1"}
    this.send_data.emit(data_obj)
  }

  constructor(){
    console.log("Component 1: Constructor");
  }

  ngOnChanges(){
    console.log("Component 1: ngOnChanges");
  }

  ngOnInit(){
    console.log("Component 1: ngOnInit");
  }

  ngDoCheck(){
    console.log("Component 1: ngDoCheck");
  }

  ngAfterContentInit(){
    console.log("Component 1: ngAfterContentInit");
  }

  ngAfterContentCheck(){
    console.log("Component 1: ngAfterContentCheck");
  }

  ngAfterViewInit(){
    console.log("Component 1: ngAfterViewInit");
  }

  ngAfterViewCheckd(){
    console.log("Component 1: ngAfterViewChecked");
  }

  ngOnDestroy(){
    console.log("Component 1: ngOnDestroy");
  }
}
