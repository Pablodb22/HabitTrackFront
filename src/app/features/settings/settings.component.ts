import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  datos: any;
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  nombre: string = "";
  username: string = "";
  biografia: string = "";
  fotoperfil: string = "";  

  ngOnInit(): void {
    this.datos = this.route.snapshot.data['data'];
    if (this.datos) {
      this.nombre = this.datos.nombre || '';
      this.username = this.datos.username || '';
      this.biografia = this.datos.biografia || '';
      this.fotoperfil = this.datos.fotoPerfil || '';
    }
    console.log('User settings from route resolver:', this.datos);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) {
        alert("La imagen no puede pesar más de 800KB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoperfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardar() {
    const payload = {
      nombre: this.nombre,
      username: this.username,
      biografia: this.biografia,
      fotoPerfil: this.fotoperfil
    };

    if (this.datos && this.datos.email) {      
      this.authService.updateUserSettings(this.datos.email, payload).subscribe({
        next: (res: any) => {
          alert("Cambios guardados con éxito");
        },
        error: (err: any) => {
          console.error("Error al guardar:", err);
          alert("Error al guardar cambios. Verifica si el backend tiene el endpoint PUT.");
        }
      });
    }
  }

  borrar() {
    alert("Se ha eliminado tu cuenta")
  }

}