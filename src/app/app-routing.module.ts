import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostComponent } from './components/post/post.component';
import { authGuard } from './guards/auth.guard';
import { FollowersComponent } from './components/followers/followers.component';


const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent},
    { path: "signup", component: SignupComponent },
    { path: "home", component: HomeComponent,canActivate:[authGuard]},
    { path: "add-blog", component: AddBlogComponent,canActivate:[authGuard] },
    { path: "about/:id", component: AboutComponent },
    {path:"edit-post/:id",component:EditPostComponent,canActivate:[authGuard] },
    {path:"post/:id",component:PostComponent,canActivate:[authGuard]},
    {path:"followers",component:FollowersComponent,canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
