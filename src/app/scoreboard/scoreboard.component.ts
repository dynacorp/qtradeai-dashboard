import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  readonly rootUrl = 'https://apis.qtradeai.com/public/api';
  obj: any[];
  dataTable: any;

  constructor(private http: HttpClient,
    private chRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.http.get(this.rootUrl + '/get/competitors')
    .subscribe((data: any = []) => {
      this.obj = data.content.data;

        this.chRef.detectChanges();

      const table: any = $('#example2');
    this.dataTable = table.DataTable({responsive: true});
    })
  }

}
