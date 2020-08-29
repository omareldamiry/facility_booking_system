import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacilityCreateComponent } from './Facilities/Creation/facility-create.component';
import { FacilityListComponent } from './Facilities/List/facility-list.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: FacilityCreateComponent },
            { path: 'facility/create', component: FacilityCreateComponent },
            { path: 'facility/list', component: FacilityListComponent },
        ])
    ],

    exports: [RouterModule]
})

export class AppRoutingModule {}