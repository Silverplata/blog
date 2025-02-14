import { Component } from '@angular/core';
import { BlogComponent } from "./components/blog/blog.component";


@Component({
  selector: 'app-root',
  imports: [BlogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blog';
}
