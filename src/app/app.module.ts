import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MarcaComponent } from './marca/marca.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { Route, RouterModule } from '@angular/router';
import { ModeloComponent } from './modelo/modelo.component';

const APP_ROUTES: Route[] = [

  { path: '', component: HomeComponent },
  { path: 'marcas', component: MarcaComponent },
  { path: 'modelos', component: ModeloComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    MarcaComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ModeloComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
