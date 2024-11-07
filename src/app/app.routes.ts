import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "home", component: HomeComponent},
    {path: "register", component: RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)] 
})

export class AppRouteModule {}
