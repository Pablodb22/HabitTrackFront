import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  signIn() {
    console.log('¡Respuesta del formulario recibida!', this.email, this.password);
    if(this.email != '' && this.password != ''){            
      this.authService.login({ email: this.email, password: this.password }).subscribe({                
        next: (respuesta) => {
          this.toastService.success('Bienvenido ' + (respuesta.name || this.email));
          localStorage.setItem('email',this.email);
          this.router.navigate(['/']);
        },                
        error: (err) => {
          console.error('Error en el login:', err);
          this.toastService.error('Error: Credenciales no válidas');
        } 
      });

    }
  }
}