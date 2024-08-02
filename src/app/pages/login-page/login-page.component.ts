import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  form: FormGroup = new FormGroup( {
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  })

  onSubmit(): void {
    // console.log(this.form.value); получаем значение формы
    if (this.form.valid) { // Если форма валидна - там точно строки, а не null
      this.authService.login(this.form.value)
        .subscribe(res => {
          // console.log(res);
          this.router.navigate(['']);
        })
    }
  }
}
