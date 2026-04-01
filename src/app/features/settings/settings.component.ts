import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  datos: any;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.datos = this.route.snapshot.data['data'];
    console.log('User settings from route resolver:', this.datos);
  }

}