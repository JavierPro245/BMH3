import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    user: '',
    password: ''
  
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

  inicio(){
    this.router.navigate(['/home']);
  }

  registrarse(){
    this.router.navigate(['/registrarse']);
  }
  
  onSubmit() {
    console.log('Submit');
    console.log(this.usuario);
  }

}
