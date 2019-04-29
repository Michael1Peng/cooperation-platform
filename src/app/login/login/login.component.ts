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
      email: ['', Validators.compose([Validators.required, this.emailValidate])],
      password: ['', Validators.required]
    });
  }

  onSubmit({value, valid}, event: Event) {
    console.log(JSON.stringify(value));
    console.log(valid);
  }

  emailValidate(formControl: FormControl): { [key: string]: any } {
    if (!formControl.value) {
      return null;
    }

    const reg = /\w+@\w+.\w+/;

    if (reg.test(formControl.value)) {
      return null;
    } else {
      return {
        emailNotValid: 'Please input a email'
      };
    }
  }

}
