import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { LocalizacionComponent } from './components/localizacion/localizacion.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    // {path: 'signup', component: SignupComponent},
    {path: 'inicio', component: LocalizacionComponent} //canActivate:[autenticacionGuard]
];
