import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-self-bank-payment',
  templateUrl: './self-bank-payment.component.html',
  styleUrls: ['./self-bank-payment.component.css']
})
export class SelfBankPaymentComponent implements OnInit {
  @ViewChild('selfBankForm') selfBankForm: NgForm;
  VATvalue = '0';
  VATprint = 'НДС ' + this.VATvalue + '%';
  From = '';
  BIK = '';
  AccNumber = '';
  Sum = '';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }

  resetForm() {
    this.selfBankForm.reset({"VAT": "НДС 0%"});
    this.setDefaultVAT();
  }

  chooseVAT(val: string) {
    let vats = document.getElementsByClassName('VAT');
    for (var i = 0; i < vats.length; i++) {
      if (vats[i].classList.contains('VATactive')) {
        vats[i].classList.remove('VATactive');
      }
    }
    let el = <HTMLElement>event.currentTarget;
    el.classList.add('VATactive');
    this.VATvalue = val;
    this.updPrint();
  }

  updPrint() {
    this.VATprint = 'НДС ' + this.VATvalue + '%';
  }

  setDefaultVAT() {
    let vats = document.getElementsByClassName('VAT');
    for (var i = 0; i < vats.length; i++) {
      if (vats[i].classList.contains('VATactive')) {
        vats[i].classList.remove('VATactive');
      }
    }
    let defVAT = document.getElementById('VATdef');
    defVAT.classList.add('VATactive');
  }

  confirmSP() {
    var args = "from="+this.From+"&bik="+this.BIK+"&acc_num="+this.AccNumber+"&vat="+this.VATvalue+"&sum="+this.Sum;
    var req = new XMLHttpRequest()
      req.onreadystatechange = function() {  
        var a;
        if (req.readyState === 4 && req.status === 200) {
            a = document.createElement('a');
            a.href = window.URL.createObjectURL(req.response);
            a.download = "lala.pdf";
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
        }
      }
      req.open('POST', '../../../assets/download.php', true);  
      req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
      req.responseType = 'blob';
      req.send(args);
  }
}
