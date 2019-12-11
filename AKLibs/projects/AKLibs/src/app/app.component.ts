import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatashareService } from './services/datashare.service';
import { DatastoreService } from './services/datastore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AK-libs';

  routeLinks = [
    { label: 'Handler', link: 'handler' },
    { label: 'Nested Table', link: 'nested' },
    { label: 'Generic Table', link: 'gTables' }
  ];

  constructor(
    private router: Router,
    public datashare: DatashareService,
    public datastore: DatastoreService,
    // private errorHandler: ErrorHandlerService,
  ) { }

  navigateTo(link: string) {
    this.router.navigate([`/${link}`]);
  }

  errorEvent($error: any): void {
    // this.errorHandler.handleErrors($error);
  }

  // onTableChange($event: NewColumnListLayerDataI): void {
  //   this.datashare.updateColumnDataList($event.fullData);
  // }

  ngOnInit() {
    // this.datashare.updateColumnDataList({
    //   tables: WifClients,
    //   tableName: 'WifClients'
    // });
  }
}
