import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public valid: boolean;
  
  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
