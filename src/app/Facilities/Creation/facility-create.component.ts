import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Facility } from '../facility.model';
import { FacilitiesService } from '../facilities.service';

@Component({
    selector: 'app-facility-create',
    templateUrl: './facility-create.component.html',
    styleUrls: ['./facility-create.component.css']
})

export class FacilityCreateComponent implements OnInit {
    form: FormGroup;
    facility: Facility;

    constructor(
        private facilitiesService: FacilitiesService
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            'name': new FormControl(null, {
                validators: [Validators.required]
            }),
            'seats': new FormControl(null, {
                validators: [Validators.required]
            }),
        });
    }

    onSubmit() {
        if(this.form.invalid){
            return;
        }

        this.facility = {
            name: this.form.value.name,
            seats: this.form.value.seats,
            isAvailable: true
        };

        this.facilitiesService.addFacility(this.facility);

    }
}