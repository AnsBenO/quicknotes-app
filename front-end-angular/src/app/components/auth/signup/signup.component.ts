import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { matchPasswords } from './match-paswords-validaor';
import { TrimInputDirective } from '../trim-input.directive';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/authService.service';
import { take } from 'rxjs';
import { ErrorResponse } from '../../../types/error-response';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TrimInputDirective,
    FontAwesomeModule,
  ],
  templateUrl: './signup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: '../auth.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: WritableSignal<string | null> = signal(null);
  pswIcon = faLock;
  userIcon = faUser;
  emailIcon = faEnvelope;

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchPasswords,
      }
    );
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.errorMessage.set(null);
      this.authService
        .signUpUser(
          this.signupForm.value.username,
          this.signupForm.value.email,
          this.signupForm.value.password
        )
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (response) => {
            this.errorMessage.set((response.error as ErrorResponse).error);
          },
        });
    }
  }

  // Check if the form control is invalid and if it has been both touched and dirty.
  // If both conditions are met, return true; otherwise, return false.
  public isInvalidInput(inputName: string): boolean {
    return !!(
      this.signupForm.get(inputName)?.invalid &&
      this.isDirtyAndTouched(inputName)
    );
  }

  // Check if the form control is both dirty and touched.
  // If both conditions are met, return true; otherwise, return false.
  // A control is marked touched once the user has triggered a blur event on it.
  // A control is dirty if the user has changed the value in the UI.
  public isDirtyAndTouched(inputName: string): boolean {
    return !!(
      this.signupForm.get(inputName)?.dirty &&
      this.signupForm.get(inputName)?.touched
    );
  }
}
