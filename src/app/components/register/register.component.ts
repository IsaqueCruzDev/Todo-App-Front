import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcherService } from '../../state-matcher/error-state-matcher.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../services/user/user-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required, Validators.min(4)])
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  passwordFormControl = new FormControl('', [Validators.required, Validators.min(4)])
  matcher = new ErrorStateMatcherService()

  formValues = {
    name: "",
    email: "",
    password: ""
  }

  constructor(private router: Router, private userService: UserServiceService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.nameFormControl.valueChanges.subscribe(value => {
      this.formValues.name = value!
    })

    this.emailFormControl.valueChanges.subscribe(value => {
      this.formValues.email = value!
    })

    this.passwordFormControl.valueChanges.subscribe(value => {
      this.formValues.password = value!
    })
  }

  createUser(event: Event) {
    event.preventDefault()
    this.userService.register(this.formValues).subscribe(response => {
      console.log(response)
    },
    error => {
      this.messageService.add({severity: 'error', summary: 'Erro ao criar usuário', detail: 'Falha ao criar usuário, tente novamente mais tarde!'})
    }
    )
  }

  redirectToLogin() {
    this.router.navigateByUrl('')
  }
}
