import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacilityCreateComponent } from './Facilities/Creation/facility-create.component';
import { FacilityListComponent } from './Facilities/List/facility-list.component';
import { LoginComponent } from './Users/Login/login.component';
import { SignupComponent } from './Users/Signup/signup.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: FacilityListComponent },
            { path: 'facility/create', component: FacilityCreateComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent }
        ])
    ],

    exports: [RouterModule]
})

export class AppRoutingModule {}