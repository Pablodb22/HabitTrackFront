import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

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

  signIn() {
    console.log('¡Respuesta del formulario recibida!', this.email, this.password);
    if(this.email != '' && this.password != ''){            
      this.authService.login({ email: this.email, password: this.password }).subscribe({                
        next: (respuesta) => {
          console.log('¡Respuesta del servidor recibida!', respuesta)          
          alert('Bienvenido ' + (respuesta.name || this.email));
        },                
        error: (err) => {
          console.error('Error en el login:', err);
          alert('Error: Credenciales no válidas');
        }
      });

    }
  }
}