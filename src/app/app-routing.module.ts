import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormViewerComponent } from './components/form-viewer/form-viewer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: FormBuilderComponent,
    canActivate: [AuthGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'user',
    component: FormViewerComponent,
    canActivate: [AuthGuard],
    data: { role: 'USER' }
  },
  { path: 'form/:id', component: FormViewerComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
