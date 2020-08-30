import { Component, OnInit, OnDestroy } from '@angular/core';
import { Facility } from '../facility.model';
import { FacilitiesService } from '../facilities.service';
import { Subscription, timer } from 'rxjs';

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
        private facilitiesService: FacilitiesService
    ) {}

    ngOnInit() {
        this.isLoading = true;
        this.facilities = this.facilitiesService.getFacilities();
        this.facilitiesSub = this.facilitiesService.getFacilityUpdateListener()
        .subscribe(facilities => {
            this.isLoading = false;
            this.facilities = facilities; 
        });
    }

    ngOnDestroy() {
        this.facilitiesSub.unsubscribe();
    }
}