import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {
  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
