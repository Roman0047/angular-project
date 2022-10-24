import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  constructor() { }

  @Input() posts: any[] = []

  ngOnInit(): void {
  }

}
