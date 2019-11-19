import { Input, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSelectModule, MatTableModule, MatCheckboxModule, MatPaginatorModule, MatTooltipModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LargeTableComponent } from './large-table.component';

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

describe("LargeTableComponent", () => {
    let component: LargeTableComponent;
    let fixture: ComponentFixture<LargeTableComponent>;
    let mockDisplayedColumns: Array<any> = [''];

    mockDisplayedColumns = ["Test 1", "Test 2", "Test 3"];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSelectModule,
                ReactiveFormsModule,
                FormsModule,
                MatTableModule,
                MatCheckboxModule,
                MatPaginatorModule,
                MatTooltipModule,
                BrowserAnimationsModule
            ],
            declarations: [
                LargeTableComponent,
                MockNumericWithCurrencyComponent,
                MockDateCellsComponent,
                MockTableRowCtrlBtnsComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LargeTableComponent);
        component = fixture.componentInstance;
        component.displayedColumns = mockDisplayedColumns;
        fixture.detectChanges();
    }));

    it("should create ", () => {
        expect(component).toBeTruthy();
    });
});