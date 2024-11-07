import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from "@angular/material/input"
import { ErrorStateMatcherService } from '../../state-matcher/error-state-matcher.service';
import { MatButtonModule } from "@angular/material/button" 
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user/user-service.service';
import { MessageService } from 'primeng/api';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required, Validators.min(4)])
  matcher = new ErrorStateMatcherService()

  formValues = {
    email: "",
    password: ""
  }

  constructor(private router: Router, 
    private userService: UserServiceService, 
    private messageService: MessageService,
    private cookieService: CookieService) {}
  
  ngOnInit(): void {
    this.emailFormControl.valueChanges.subscribe(value => {
      this.formValues.email = value!
    })

    this.passwordFormControl.valueChanges.subscribe(value => {
      this.formValues.password = value!
    })
  }

  login(event: Event) {
    event.preventDefault()
    this.userService.login(this.formValues).subscribe(response => {
      console.log(response)
      this.cookieService.set('access-token', response.token)
      this.router.navigateByUrl("/home")
    },
    error => {
      this.messageService.add({severity: 'error', summary: 'Error de Login', detail: 'Falha ao fazer login. Verifique suas credenciais' })
    }
  )
  }

  redirectToRegister() {
    this.router.navigateByUrl('/register')
  }
}
