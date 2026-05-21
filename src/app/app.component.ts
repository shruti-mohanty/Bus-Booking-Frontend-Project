import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { RouterOutlet } from '@angular/router';

import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, FormsModule],

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bus-booking2';

  isLoginForm: boolean = true;

  loggedUserData: any;

  // =========================
  // REGISTER OBJECT
  // =========================

  registerObj: any = {
    userId: 0,

    userName: '',

    emailId: '',

    fullName: '',

    role: '',

    createdDate: new Date(),

    password: '',

    projectName: '',

    refreshToken: '',

    refreshTokenExpiryTime: new Date(),
  };

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(private masterSrv: MasterService) {
    const localUser = localStorage.getItem('redBusUser');

    if (localUser != null) {
      this.loggedUserData = JSON.parse(localUser);
    }
  }

  // =========================
  // OPEN MODAL
  // =========================

  openModal() {
    const model = document.getElementById('myModal');

    if (model != null) {
      model.style.display = 'block';

      model.classList.add('show');
    }
  }

  // =========================
  // CLOSE MODAL
  // =========================

  closeModal() {
    const model = document.getElementById('myModal');

    if (model != null) {
      model.style.display = 'none';

      model.classList.remove('show');
    }
  }

  // =========================
  // REGISTER USER
  // =========================

  onRegister() {
    this.masterSrv.onRegisterUser(this.registerObj);

    this.loggedUserData = this.registerObj;

    localStorage.setItem('redBusUser', JSON.stringify(this.loggedUserData));

    alert('User Registered Successfully');

    this.closeModal();
  }

  logoff() {
    localStorage.removeItem('redBusUser');

    this.loggedUserData = undefined;
  }
}
