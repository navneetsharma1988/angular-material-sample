import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        SharedModule,
        DashboardRoutingModule
    ],
    exports: []
})
export class DashboardModule { }
