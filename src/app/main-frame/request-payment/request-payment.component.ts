import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-request-payment',
  templateUrl: './request-payment.component.html',
  styleUrls: ['./request-payment.component.css']
})
export class RequestPaymentComponent implements OnInit {
  @ViewChild('reqPayForm') reqPayForm: NgForm;
  ReqVATvalue = '0';
  ReqVATprint = 'НДС ' + this.ReqVATvalue + '%';
  INN = '';
  BIK = '';
  AccNum = '';
  Sum = '';
  Telly = '';
  email = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }

  resetForm() {
    this.reqPayForm.reset({"VAT": "НДС 0%"});
    this.setDefaultVAT();
  }

  chooseVAT(val: string) {
    let vats = document.getElementsByClassName('rVAT');
    for (var i = 0; i < vats.length; i++) {
      if (vats[i].classList.contains('VATactive')) {
        vats[i].classList.remove('VATactive');
      }
    }
    let el = <HTMLElement>event.currentTarget;
    el.classList.add('VATactive');
    this.ReqVATvalue = val;
    this.updPrint();
  }

  updPrint() {
    this.ReqVATprint = 'НДС ' + this.ReqVATvalue + '%';
  }

  setDefaultVAT() {
    let vats = document.getElementsByClassName('rVAT');
    for (var i = 0; i < vats.length; i++) {
      if (vats[i].classList.contains('VATactive')) {
        vats[i].classList.remove('VATactive');
      }
    }
    let defVAT = document.getElementById('rVATdef');
    defVAT.classList.add('VATactive');
  }

  confirmRP() {
    var req = new XMLHttpRequest();
    var args = "inn="+this.INN+"&bik="+this.BIK+"&accNum="+this.AccNum+
    "&nds="+this.ReqVATvalue+"&sum="+this.Sum+"&telly="+this.Telly+"&email="+this.email;
      req.onreadystatechange = function() {  
        if (req.readyState == 4 && req.status == 200) { 
          alert("Ответ сервера: "+req.responseText);
        }
      }
      req.open('POST', '../../../assets/reqpay.php', true);  
      req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
      req.send(args);
  }
}
