import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: any;
  error: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Cambiado a 'email'
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
  this.loginForm.markAllAsTouched(); // Marca todos los campos como tocados
  if (this.loginForm.valid) {
    this.http.post(`${environment.apiUrl}/api/usuario/login`, this.loginForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('Login successful:', res);
          localStorage.setItem('usuarios', JSON.stringify(res));
          // Guarda el NIF (como string) y el nombre si existen en la respuesta
          if (res && typeof res.nif === 'number') {
            localStorage.setItem('nif', res.nif);
          }
          if (res && typeof res.nombre === 'string') {
            localStorage.setItem('username', res.nombre);
          }
          this.router.navigate(['/menu']);
        },
        error: () => {
          this.error = 'Usuario o contraseña incorrectos';
        }
      });
  }
}
}