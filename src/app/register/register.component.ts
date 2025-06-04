import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: any;
  error: string = '';
  imagen: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      nif: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      imagen: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imagen = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('nif', this.registerForm.get('nif')?.value!);
      formData.append('nombre', this.registerForm.get('nombre')?.value!);
      formData.append('email', this.registerForm.get('email')?.value!);
      formData.append('contrasena', this.registerForm.get('contrasena')?.value!);
      if (this.imagen) {
        formData.append('imagen', this.imagen);
      }

      this.http.post('http://localhost:8080/api/usuario/register', formData)
      .subscribe({
        next: res => {
          this.router.navigate(['/menu']);
        },
        error: () => {
          this.error = 'Error al registrar usuario';
        }
      });
    }
  }
}