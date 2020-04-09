import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  public message: string;
  public messageTitle: string;
  public messageType: string;
  public extraInfo: boolean;

  constructor(@Inject(MAT_SNACK_BAR_DATA)public data: any) {
    this.message = data.message;
    this.messageTitle = data.messageTitle;
    this.messageType = data.messageType;
    this.extraInfo = data.extraInfo;
  }

  ngOnInit() {
  }

}
