import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private formService: FormService) { }

  ngOnInit() {
  }

  username = '';
  password = '';
  error = '';


  login() {
    this.auth.login(this.username, this.password).subscribe(users => {
      if (users.length > 0) {
        const user = users[0];
        this.auth.setUser(user);
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (user.role === 'USER') {
          // 👇 Fetch first form for users
          this.formService.getForms().subscribe(forms => {
            if (forms.length > 0) {
              this.router.navigate(['/form', forms[0].id]);
            } else {
              this.error = 'No forms available.';
            }
          });
        }
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }

}
