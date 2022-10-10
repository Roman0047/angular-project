import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: any
  @Input() index: any

  date = Date.now()

  constructor() { }

  ngOnInit(): void {
  }

}
