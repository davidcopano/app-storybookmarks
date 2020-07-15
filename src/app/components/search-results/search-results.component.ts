import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {

  @Input() query: string;

  constructor() { }

  ngOnInit() {
    console.log('query en search-results = ');
    console.log(this.query);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.query = changes.query.currentValue;
  }
}
