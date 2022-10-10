import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-test-routing',
  templateUrl: './test-routing.component.html',
  styleUrls: ['./test-routing.component.scss']
})
export class TestRoutingComponent implements OnInit {
  routeQuery = {}

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.routeQuery = params;
    });
  }

}
