import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth';
import { WelcomeComponent } from './components/welcome/welcome';
import { AuthenticationGuard } from './security/authentication-guard';
import { Prueba } from './components/prueba/prueba';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, /* http://localhost:4200/ */
    { path: 'login', component: AuthComponent },
    { path: "registro", component: AuthComponent },
    { path: 'password', component: AuthComponent }, //le debo crear un GuidGuard
    { path: 'inicio', component: WelcomeComponent, canActivate: [AuthenticationGuard] },
    { path: 'prueba', component: Prueba, canActivate: [AuthenticationGuard] }
];