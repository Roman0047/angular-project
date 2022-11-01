import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalService} from "../../global.service";
import {environment} from "../../../environments/environment";
import {SubscribersRepository} from "../../repository/subscribers";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  constructor(public globalService: GlobalService, private subscribersRepo: SubscribersRepository) { }

  apiUrl = environment.apiUrl

  @Input() isSubscribeButton: boolean = false
  @Input() small: any
  @Input() post: any
  @Output() updateSubscription = new EventEmitter<any>();
  @Output() setSportTags = new EventEmitter<any>();
  @Output() setTrickTags = new EventEmitter<any>();

  async subscribe() {
    try {
      await this.subscribersRepo.subscribe(this.post.user.id)
      this.updateSubscription.emit()
    } catch (error) {
      console.error(error)
    }
  }

  ngOnInit(): void {
  }

}
