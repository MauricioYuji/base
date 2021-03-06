import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TesteComponent } from './pages/teste/teste.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { GamesComponent } from './pages/games/games.component';
import { ConsolesComponent } from './pages/consoles/consoles.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { ListUploadComponent } from './pages/uploads/list-upload/list-upload.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teste', component: TesteComponent },
  //{ path: 'user', component: UserComponent, resolve: { data: UserResolver } },
  //{
  //  path: '',
  //  component: HomeComponent,
  //},
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'games', component: GamesComponent },
      { path: 'listupload', component: ListUploadComponent },
      { path: 'listupload/:category', component: ListUploadComponent },
      { path: 'consoles', component: ConsolesComponent },
      { path: 'companies', component: CompaniesComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
