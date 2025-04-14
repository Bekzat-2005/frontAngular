import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // ✅ Қосамыз!

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule], // ✅ Қостық
  template: `<h2> беті</h2>`,
})
export class AdminComponent {
  data: any;

  constructor(private http: HttpClient) {}

}
