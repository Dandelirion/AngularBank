import { Component, OnInit, Inject } from '@angular/core';

import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-admin-cardpay',
  templateUrl: './admin-cardpay.component.html',
  styleUrls: ['./admin-cardpay.component.css']
})
export class AdminCardpayComponent implements OnInit {
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

  flipSafety(rowID: string) {
    let el = <HTMLElement>event.currentTarget;
    let rowClasses = el.parentElement.parentElement.classList;
    if (rowClasses.contains("danger")) {
      rowClasses.remove("danger");
    }
    else {
      rowClasses.add("danger");
    }
    this.requestDB(this.helper, rowID);
  }

  ngOnInit() {
    this.requestDB(this.helper);
  }

  requestDB(callback: Function, updateID?: string) {
    var args;
    if (updateID) {
      args = "upd_id="+updateID;
    } else {
      args = "sort_field="+this.SortField+"&sort_option="+this.SortOption+"&filter_field="+this.FilterField+"&filter_text="+this.FilterText;
    }
    var req = new XMLHttpRequest();
      req.onreadystatechange = function() {  
        if (req.readyState == 4 && req.status == 200) { 
          if(!updateID) {
            var jsonobj = JSON.parse(req.responseText);
            if (jsonobj.authError) {
              alert(jsonobj.authError);
            }
            callback.apply(this, [jsonobj]);
          } else {
            if (req.responseText != "") {
              var jsonobj = JSON.parse(req.responseText);
              if (jsonobj.authError) {
                alert(jsonobj.authError);
              }
              callback.apply(this, [jsonobj]);
            }
          }
        }
      }
      req.open('POST', '../../../assets/card_admin.php', true);  
      req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
      req.setRequestHeader("Authorization","Bearer " + this.authenticationService.token);
      req.send(args);
  }
}
