import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TesteComponent } from './pages/teste/teste.component';

const routes: Routes = [
  {
    path: '',
    component: TesteComponent,
  },
  {
    path: 'teste',
    component: TesteComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
