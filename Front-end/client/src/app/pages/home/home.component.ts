import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  ImagenesUrl: string[] = [
    'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_616x353.jpg',
    'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1240930/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/343594/capsule_616x353.jpg',
    'https://cdn.akamai.steamstatic.com/steam/apps/2215430/header.jpg?t=1712313893',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/capsule_616x353.jpg',
   
  ].concat([
    'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/capsule_616x353.jpg',
    'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1240930/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/343594/capsule_616x353.jpg',
    'https://cdn.akamai.steamstatic.com/steam/apps/2215430/header.jpg?t=1712313893',//rev
    'https://cdn.cloudflare.steamstatic.com/steam/apps/945360/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_616x353.jpg',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/252950/capsule_616x353.jpg',
  ]);

}
