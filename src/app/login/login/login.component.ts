import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, event: Event) {
    console.log(JSON.stringify(value));
    console.log(valid);
  }

}
