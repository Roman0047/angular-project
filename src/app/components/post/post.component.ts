import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GlobalService} from "../../global.service";
import {environment} from "../../../environments/environment";
import {SubscribersRepository} from "../../repository/subscribers";
import {AuthService} from "../../auth.service";
import {RatingsRepository} from "../../repository/ratings";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  constructor(
    public globalService: GlobalService,
    private subscribersRepo: SubscribersRepository,
    public authService: AuthService,
    private ratingsRepo: RatingsRepository
  ) { }

  apiUrl = environment.apiUrl

  @Input() isSubscribeButton: boolean = false
  @Input() small: any
  @Input() post: any
  @Output() updateSubscription = new EventEmitter<any>();
  @Output() setSportTags = new EventEmitter<any>();
  @Output() setTrickTags = new EventEmitter<any>();
  @Output() updateRating = new EventEmitter<any>();

  async subscribe() {
    try {
      await this.subscribersRepo.subscribe(this.post.user.id)
      this.updateSubscription.emit()
    } catch (error) {
      console.error(error)
    }
  }

  async rate(rating: string) {
    try {
      const newRating = await this.ratingsRepo.create(this.post.id, { rating })
      await this.authService.getProfile()
      this.updateRating.emit(newRating)
    } catch (error) {
      console.error(error)
    }
  }

  get isLiked() {
    const rating = this.getRating()
    return rating && rating.rating === "positive"
  }

  get isDisliked() {
    const rating = this.getRating()
    return rating && rating.rating === "negative"
  }

  getRating() {
    return this.authService.user.ratings.find((item: any) => item.postId === this.post.id)
  }

  ngOnInit(): void {
  }

}
