import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authService.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  constructor(public authService: AuthService, private router: Router) {}

  handleLogout() {
    this.authService
      .logoutUser()
      .pipe(take(1))
      .subscribe({
        next: () => {
          localStorage.removeItem('authToken');
          sessionStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        },
      });
  }
}
