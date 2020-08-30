import { Component, OnInit } from '@angular/core';
import { Facility } from '../facility.model';
import { FacilitiesService } from '../facilities.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-facility-list',
    templateUrl: './facility-list.component.html',
    styleUrls: ['./facility-list.component.css']
})

export class FacilityListComponent implements OnInit{
    facilities: Facility[] = [];
    private facilitiesSub: Subscription;

    constructor(
        private facilitiesService: FacilitiesService
    ) {}

    ngOnInit() {
        this.facilities = this.facilitiesService.getFacilities();
        this.facilitiesSub = this.facilitiesService.getFacilityUpdateistener()
        .subscribe(facilities => {
            this.facilities = facilities;
        });
    }
}