import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './learn/products/products.component'; //TODO remove this line
import { ProductComponent } from './learn/product/product.component'; //TODO remove this line
import { TestRoutingComponent } from './learn/test-routing/test-routing.component'; //TODO remove this line

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from '@angular/material/tooltip'; //TODO all materials imports to materials module

import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './pages/home/home.component';
import {MatMenuModule} from "@angular/material/menu";
import { AvatarComponent } from './components/avatar/avatar.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { UserComponent } from './pages/user/user.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { UploadComponent } from './components/upload/upload.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import {MatDividerModule} from "@angular/material/divider";
import { TricksComponent } from './pages/tricks/tricks.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TrickComponent } from './pages/trick/trick.component';
import { TrickItemComponent } from './components/trick-item/trick-item.component';
import { SportsComponent } from './pages/sports/sports.component';
import { SportsListComponent } from './components/sports-list/sports-list.component';
import { SportComponent } from './components/sport/sport.component';
import { SportPageComponent } from './pages/sport-page/sport-page.component';
import {MatTableModule} from "@angular/material/table";
import { FiltersComponent } from './components/filters/filters.component';
import { AutocompleteSingleComponent } from './components/autocomplete-single/autocomplete-single.component';
import {AuthRepository} from "./repository/auth";
import {AuthGuard} from "./guards/auth.guard";
import {HomeGuard} from "./guards/home.guard";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent, //TODO remove this component
    ProductComponent, //TODO remove this component
    TestRoutingComponent, //TODO remove this component

    SignInComponent,
    SignUpComponent,
    AutocompleteComponent,
    ToolbarComponent,
    PostComponent,
    HomeComponent,
    AvatarComponent,
    SubscriptionsComponent,
    SettingsComponent,
    PostPageComponent,
    UserComponent,
    NewPostComponent,
    UploadComponent,
    PostsListComponent,
    TricksComponent,
    TrickComponent,
    TrickItemComponent,
    SportsComponent,
    SportsListComponent,
    SportComponent,
    SportPageComponent,
    FiltersComponent,
    AutocompleteSingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatTooltipModule,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule
  ],
  providers: [AuthRepository, AuthGuard, HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
