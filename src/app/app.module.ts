import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MarcaComponent } from './marca/marca.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { Route, RouterModule } from '@angular/router';
import { ModeloComponent } from './modelo/modelo.component';
import { CocheComponent } from './coche/coche.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ReservaCocheComponent } from './reserva-coche/reserva-coche.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { FooterComponent } from './footer/footer.component';
import { RegistroComponent } from './registro/registro.component';

const APP_ROUTES: Route[] = [

  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'marcas', component: MarcaComponent },
  { path: 'modelos', component: ModeloComponent },
  { path: 'coches', component: CocheComponent },
  { path: 'reserva-coche', component: ReservaCocheComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'registro', component: RegistroComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    MarcaComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ModeloComponent,
    CocheComponent,
    ReservaCocheComponent,
    MisReservasComponent,
    FooterComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    NgbModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
