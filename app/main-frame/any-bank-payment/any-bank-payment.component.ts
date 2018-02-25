import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-any-bank-payment',
  templateUrl: './any-bank-payment.component.html',
  styleUrls: ['./any-bank-payment.component.css']
})
export class AnyBankPaymentComponent implements OnInit {
  @ViewChild('anyBankForm') anyBankForm: NgForm;
  cardNum = '';
  validThru = '';
  cvc = '';
  sum = '';
  comment = '';
  email = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.anyBankForm)
  }

  confirmAP() {
    var req = new XMLHttpRequest();
    var args = "cardNum="+this.cardNum+"&validThru="+this.validThru+
    "&cvc="+this.cvc+"&sum="+this.sum+"&comment="+this.comment+"&email="+this.email;
      req.onreadystatechange = function() {  
        if (req.readyState == 4 && req.status == 200) { 
          console.log(req);
          alert("Ответ сервера: "+req.responseText);
        }
      }
      req.open('POST', '../../../assets/cardpay.php', true);  
      req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
      req.send(args);
  }
}
