import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatTableModule, MatMenuModule, MatFormFieldModule, MatIconModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SmallTableComponent } from "./small-table.component";

@Component({
    selector: "ak-numeric-with-currency",
    template: "<p> Mock Numeric With Currency Component </p>"
})

export class MockNumericWithCurrencyComponent {
    @Input() num: number = 0;
    @Input() col: string = '';
    @Input() currency: string;
    @Input() indicator: string;
    @Input() currencyType: string;
};

@Component({
    selector: "ak-date-cells",
    template: "<p> Mock Date Cells Component </p>"
})

export class MockDateCellsComponent {
    @Input() isFullDate: boolean = false;
    @Input() colName: string;
    @Input() cellId: any;
    @Input() date: Date;
};

@Component({
    selector: "ak-table-row-ctrl-btns",
    template: "<p> Mock Table Row Ctrl Btns Component </p>"
})

export class MockTableRowCtrlBtnsComponent {
    @Input() row: any;
    @Input() editableRowId: string;
};

describe("SmallTableComponent ", () => {
    let component: SmallTableComponent;
    let fixture: ComponentFixture<SmallTableComponent>;
    let mockDisplayedColumns: Array<any> = [''];

    mockDisplayedColumns = ["Test 1", "Test 2", "Test 3"];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MatTableModule,
                MatCheckboxModule,
                MatPaginatorModule,
                MatIconModule,
                MatMenuModule,
                MatFormFieldModule,
                MatTooltipModule,
                BrowserAnimationsModule
            ],
            declarations: [
                SmallTableComponent,
                MockNumericWithCurrencyComponent,
                MockDateCellsComponent,
                MockTableRowCtrlBtnsComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SmallTableComponent);
        component = fixture.componentInstance;
        component.displayedColumns = mockDisplayedColumns;
        fixture.detectChanges();
    }));

    it("should create ", () => {
        expect(component).toBeTruthy();
    });

    afterEach(() => {
        fixture.destroy();
    });

});