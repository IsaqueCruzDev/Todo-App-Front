import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppRouteModule } from './app.routes';
import { ToastModule } from "primeng/toast"
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppRouteModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'todo';

  constructor(private cookieService: CookieService, private router: Router){}

  ngOnInit(): void {
    const token = this.cookieService.get('access-token')

    if (!token) {
      this.router.navigateByUrl("")
    } else {
      this.router.navigateByUrl("/home")
    }
  }
}
