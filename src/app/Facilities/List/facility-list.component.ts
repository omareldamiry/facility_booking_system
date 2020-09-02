import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Facility } from '../facility.model';
import { FacilitiesService } from '../facilities.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-facility-list',
    templateUrl: './facility-list.component.html',
    styleUrls: ['./facility-list.component.css']
})

export class FacilityListComponent implements OnInit, OnDestroy{
    facilities: Facility[] = [];
    isLoading = false;
    private facilitiesSub: Subscription;

    constructor(
        private facilitiesService: FacilitiesService,
        private router: Router
    ) {}

    ngOnInit() {
        this.isLoading = true;
        this.facilitiesService.getFacilities();

        this.facilitiesSub = this.facilitiesService.getFacilitiesUpdateListener()
        .subscribe(facilities => {
            this.isLoading = false;
            this.facilities = facilities;
            console.log(this.facilities);
        });
    }

    onView(facility: Facility) {
        this.router.navigate(['/facility/view'], { queryParams: { facility: facility.id } });
    }

    ngOnDestroy() {
        this.facilitiesSub.unsubscribe();
    }
}