import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clientlayout',
  templateUrl: './clientlayout.component.html',
  styleUrl: './clientlayout.component.css',
})
export class ClientlayoutComponent {
  constructor(private location: Location) {
    this.url = this.location.path();
    // Écouter les changements d'URL
    this.location.onUrlChange((url) => {
      this.url = url;
      console.log(this.url);
    });
  }
  url: string = '';

  ngOnInit() {}

  goBack(): void {
    this.location.back();
  }
}
