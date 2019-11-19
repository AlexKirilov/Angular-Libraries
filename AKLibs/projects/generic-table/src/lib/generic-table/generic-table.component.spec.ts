// import { By } from '@angular/platform-browser';
// import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
// import { Input, Component } from "@angular/core";
// import { MatTableDataSource } from '@angular/material';

// import { DataTableComponent } from "./generic-table.component";
// import { TablePropertiesI, pagginationDataI, SettingsI } from '../data-table.models';

// @Component({
//     selector: "ak-table-paginator",
//     template: "<p> Mock Table Paginator Component </p>"
// })

// export class MockTablePaginatorComponent {
//     @Input() pagginationData: pagginationDataI = new Object() as pagginationDataI;
// };

// @Component({
//     selector: "ak-large-table",
//     template: "<p> Mock Large Table Component </p>"
// })

// export class MockLargeTableComponent {
//     @Input() settings: SettingsI;
//     @Input() properties: TablePropertiesI;
//     @Input() displayedColumns: Array<any> = [''];
//     @Input() dataSource = new MatTableDataSource([]);
// };

// @Component({
//     selector: "ak-medium-table",
//     template: "<p> Mock Medium Table Component </p>"
// })

// export class MockMediumTableComponent {
//     @Input() settings: SettingsI;
//     @Input() properties: TablePropertiesI;
//     @Input() displayedColumns: Array<any> = [''];
//     @Input() dataSource = new MatTableDataSource([]);
// };

// @Component({
//     selector: "ak-small-table",
//     template: "<p> Mock Small Table Component </p>"
// })

// export class MockSmallTableComponent {
//     @Input() settings: SettingsI;
//     @Input() properties: TablePropertiesI;
//     @Input() displayedColumns: Array<any> = [''];
//     @Input() dataSource = new MatTableDataSource([]);
// };

// describe("DataTableComponent", () => {
//     let component: DataTableComponent;
//     let fixture: ComponentFixture<DataTableComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 DataTableComponent,
//                 MockTablePaginatorComponent,
//                 MockLargeTableComponent,
//                 MockMediumTableComponent,
//                 MockSmallTableComponent
//             ]
//         }).compileComponents();

//         fixture = TestBed.createComponent(DataTableComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     }));

//     it("should create", () => {
//         expect(component).toBeTruthy();
//     });

//     it("should display top table paginator if data is over 25", fakeAsync(() => {

//         const mockDataSourceData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
//         const mockDataSource: any = new MatTableDataSource([]);

//         component.dataSource = mockDataSource;
//         component.dataSource.data = mockDataSourceData;
//         fixture.detectChanges();
//         tick();

//         fixture.whenStable().then(() => {
//             const topPag = fixture.debugElement.query(By.css('#top-pagination'));
//             expect(topPag).toBeTruthy();
//         });

//     }));

//     describe("should display", () => {
//         let largeTable, mediumTable, smallTable;

//         it("large table when displayLSize is true", () => {
//             component.displayLSize = true;
//             fixture.detectChanges();

//             largeTable = fixture.debugElement.query(By.css('.large-table'));
//             expect(largeTable).toBeTruthy();
//         });

//         it("medium table when displayMSize is true", () => {
//             component.displayMSize = true;
//             fixture.detectChanges();

//             mediumTable = fixture.debugElement.query(By.css('.medium-table'));
//             expect(mediumTable).toBeTruthy();
//         });

//         it("small table when displaySSize is true", () => {
//             component.displaySSize = true;
//             fixture.detectChanges();

//             smallTable = fixture.debugElement.query(By.css('.small-table'));
//             expect(smallTable).toBeTruthy();
//         });

//     });

//     afterEach(() => {
//         fixture.destroy();
//     });
// });
