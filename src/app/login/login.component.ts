import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [""],
      password: [""]
    })
  }

  handleLogin() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: data => {
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin")
      },
      error: err => {
        console.error(err)
      }
    })
  }
}
