import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service"

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor (private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('access-token')

    if (!token) {
      this.router.navigateByUrl("")
    }
  }
}
