import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private renderer: Renderer2){}
  link: string = '';

  checkUrl() {
    return this.link.includes('/admin');
  }

  ngOnInit(): void {
    console.log(window.location.href);

    this.link = window.location.href;
  }

  ngAfterViewInit() {
    this.renderer.listen(window, 'load', () => {
      const preLoadingElement = document.getElementById('preLoading');
      this.renderer.setStyle(preLoadingElement, 'display', 'none');
    });
  }
}
