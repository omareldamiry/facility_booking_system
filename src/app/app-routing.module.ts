import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacilityCreateComponent } from './Facilities/Creation/facility-create.component';
import { FacilityListComponent } from './Facilities/List/facility-list.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: FacilityListComponent },
            { path: 'facility/create', component: FacilityCreateComponent }
        ])
    ],

    exports: [RouterModule]
})

export class AppRoutingModule {}