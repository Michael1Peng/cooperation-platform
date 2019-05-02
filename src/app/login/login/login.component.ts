import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import {QuoteService} from '../../service/quote.service';
import {Quote} from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    id: 1,
    cn: 'Being defeated is often a temporary condition. Giving up is what makes it permanent.',
    pic: '/assets/img/quotes/1.jpg'
  };

  constructor(
    private formBuilder: FormBuilder,
    private quoteService$: QuoteService) {
    this.quoteService$
      .getQuotes()
      .subscribe(q => this.quote = q[0]);
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
