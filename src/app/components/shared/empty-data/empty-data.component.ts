import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styles: []
})
export class EmptyDataComponent implements OnInit {
  @Input() typeTable: string;
  @Input() len: number;
  @Input() limitPower: boolean;
  @Input() error: boolean;
  @Input() errorMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
