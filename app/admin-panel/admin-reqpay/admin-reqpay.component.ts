import { Component, OnInit, Inject } from '@angular/core';

import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-admin-reqpay',
  templateUrl: './admin-reqpay.component.html',
  styleUrls: ['./admin-reqpay.component.css']
})
export class AdminReqpayComponent implements OnInit {
  rows = [];
  isAuth = false;
  SortField = 'Нет';
  SortOption = 'ASC';
  FilterField = 'Нет';
  FilterText = '';

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  helper = (returned_data)=>{
    if (returned_data.authError) {
      this.isAuth = false;
      this.rows = [];
      this.authenticationService.validToken = false;
    } else {
      this.isAuth = true;
      this.rows = returned_data;
      this.authenticationService.validToken = true;
    }
   }

  confirm() {
    this.requestDB(this.helper);
  }

  ngOnInit() {
    this.requestDB(this.helper);
  }

  requestDB(callback: Function) {
    var args = "sort_field="+this.SortField+"&sort_option="+this.SortOption+"&filter_field="+this.FilterField+"&filter_text="+this.FilterText;
    var req = new XMLHttpRequest();
      req.onreadystatechange = function() {  
        if (req.readyState == 4 && req.status == 200) { 
          var jsonobj = JSON.parse(req.responseText);
          callback.apply(this, [jsonobj]);
        }
      }
      req.open('POST', '../../../assets/req_admin.php', true);  
      req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
      req.setRequestHeader("Authorization","Bearer " + this.authenticationService.token);
      req.send(args);
  }
}
