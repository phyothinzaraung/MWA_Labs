import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-two',
  template: `
    <p>
      Component Two - {{receiveData.data}}
    </p>
  `,
  styles: [
  ]
})
export class TwoComponent {
  @Input() receiveData: {data: string} = {data : ''};

  constructor(){
    console.log("Component 2: Constructor");
  }

  ngOnChanges(){
    console.log("Component 2: ngOnChanges");
  }

  ngOnInit(){
    console.log("Component 2: ngOnInit");
  }

  ngDoCheck(){
    console.log("Component 2: ngDoCheck");
  }

  ngAfterContentInit(){
    console.log("Component 2: ngAfterContentInit");
  }

  ngAfterContentCheck(){
    console.log("Component 2: ngAfterContentCheck");
  }

  ngAfterViewInit(){
    console.log("Component 2: ngAfterViewInit");
  }

  ngAfterViewCheckd(){
    console.log("Component 2: ngAfterViewChecked");
  }

  ngOnDestroy(){
    console.log("Component 2: ngOnDestroy");
  }
}
