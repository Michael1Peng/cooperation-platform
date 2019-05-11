import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
  }

  items: string[];

  ngOnInit() {
    const nums = [];
    for (let i = 1; i <= 16; i++) {
      nums.push(i);
    }
    this.items = nums.map(num => `avatars:svg-${num}`);
    const img = `avatars:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.required],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
      ageInput: ['1990-01-01'],
      avatar: [img]
    });
  }
}
