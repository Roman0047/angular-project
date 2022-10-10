import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './learn/products/products.component'; //TODO remove this line
import { TestRoutingComponent } from "./learn/test-routing/test-routing.component"; //TODO remove this line
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {HomeComponent} from "./pages/home/home.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {SubscriptionsComponent} from "./pages/subscriptions/subscriptions.component";
import {UserComponent} from "./pages/user/user.component";
import {NewPostComponent} from "./pages/new-post/new-post.component";
import {PostPageComponent} from "./pages/post-page/post-page.component";
import {TricksComponent} from "./pages/tricks/tricks.component";
import {TrickComponent} from "./pages/trick/trick.component";
import {SportsComponent} from "./pages/sports/sports.component";
import {SportPageComponent} from "./pages/sport-page/sport-page.component";

const routes: Routes = [
  { path: 'test-routing', component: TestRoutingComponent }, //TODO remove this line
  { path: 'products', component: ProductsComponent }, //TODO remove this line


  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'new-post', component: NewPostComponent },
  { path: 'user', component: UserComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'post', component: PostPageComponent },
  { path: 'tricks', component: TricksComponent },
  { path: 'trick', component: TrickComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'sport', component: SportPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
