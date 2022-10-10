import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = 'Products'
  icon = 'https://simg.nicepng.com/png/small/356-3563301_instagram-instagram-circle-icon.png'
  count = 1
  products = [
    {
      id: 1,
      title: 'test 1',
      description: 'description 1'
    },
    {
      id: 2,
      title: 'test 2',
      description: 'description 2'
    },
    {
      id: 3,
      title: 'test 3',
      description: 'description 3'
    },
  ]

  getDescription() {
    return 'test description'
  }

  changeImage() {
    this.icon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/240px-Angular_full_color_logo.svg.png'
  }

  updateTitle(event: any) {
    this.title = event.target.value
  }

  constructor() { }

  ngOnInit(): void {
  }

}
