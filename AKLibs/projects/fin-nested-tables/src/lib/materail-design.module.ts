import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    exports: [

        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
    ]
})
export class NGMaterialModule { }

