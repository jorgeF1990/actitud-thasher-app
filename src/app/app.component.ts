import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  // Removed invalid 'imports' property
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ← ojo, era `styleUrls` (plural)
})
export class AppComponent {
  title = 'actitud-thasher-app';
}
