import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from 'src/app/core/auth/services/store.service';
import { ErrorResponse } from 'src/app/core/typings/common';

@Component({
  selector: 'crng-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Output() signedIn = new EventEmitter<void>();

  password = new FormControl('', [Validators.required]);
  username = new FormControl('', [Validators.required, Validators.email]);
  loginForm = new FormGroup({ username: this.username, password: this.password });

  constructor(private readonly authStore: AuthStoreService) {}

  login() {
    if (this.loginForm.invalid) return;

    this.loginForm.disable();
    this.loginForm.setErrors(null);
    this.authStore.signIn(this.password.value).subscribe(
      () => {
        this.loginForm.enable();
        this.signedIn.next();
      },
      (err: ErrorResponse) => {
        this.loginForm.enable();
        this.loginForm.setErrors({ serverError: err });
      },
    );
  }
}
