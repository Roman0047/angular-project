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
import {HomeGuard} from "./guards/home.guard";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {UserGuard} from "./guards/user.guard";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

const routes: Routes = [
  { path: 'test-routing', component: TestRoutingComponent }, //TODO remove this line
  { path: 'products', component: ProductsComponent }, //TODO remove this line

  { path: '', component: HomeComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [HomeGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [HomeGuard] },
  { path: 'subscriptions', component: SubscriptionsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'new-post', component: NewPostComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'post/:id', component: PostPageComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'sports-tricks/:id', component: TricksComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'trick/:id', component: TrickComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'sports', component: SportsComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'sport/:id', component: SportPageComponent, canActivate: [AuthGuard, UserGuard] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: '**', pathMatch: 'full', component: NotFoundComponent },
  { path: '404', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
