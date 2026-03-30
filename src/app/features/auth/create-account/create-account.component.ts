import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  imports: [RouterLink, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {
  
  email:string = ""
  password:string = ""
  name:string = ""
  apellido:string = ""

  private authService = inject(AuthService);
  private router = inject(Router);
 

  constructor(){}

  create(){
    console.log('¡Respuesta del formulario recibida!', this.email, this.password,this.name,this.apellido);
    
    if(this.email != '' && this.password != '' && this.name != '' && this.apellido != ''  ){    
      let nombreCompleto:string = this.name + " " + this.apellido
      this.authService.register({ email: this.email, password: this.password, nombre: nombreCompleto}).subscribe({                
        next: (respuesta) => {
          console.log('¡Respuesta del servidor recibida!', respuesta)          
          alert('Registro exitoso ' + (respuesta.nombre || this.email));
          this.router.navigate(['/sign-in']);
        },                
        error: (err) => {
          console.error('Error en el registro:', err);
          alert('Error: No se pudo crear la cuenta');
        }
      });
    
    }
  }
}