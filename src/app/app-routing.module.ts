import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacilityCreateComponent } from './Facilities/Creation/facility-create.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: FacilityCreateComponent },
            { path: 'facility/create', component: FacilityCreateComponent },
        ])
    ],

    exports: [RouterModule]
})

export class AppRoutingModule {}