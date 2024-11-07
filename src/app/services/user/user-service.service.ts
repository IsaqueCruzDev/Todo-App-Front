import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { LoginInterface } from '../../interfaces/login-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  login(user: LoginInterface): Observable<any> {
    const data = {
      email: user.email,
      password: user.password
    }

    return this.http.post("https://localhost:7083/User/login", data)
  }

  register(user: UserInterface): Observable<any> {
    return this.http.post('https://localhost:7083/User/register', user)
  }
}
