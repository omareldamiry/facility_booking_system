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
        this.facilitiesService.getFacilities();
        this.facilitiesSub = this.facilitiesService.getFacilityUpdateListener()
        .subscribe(facilities => {
            this.isLoading = false;
            this.facilities = facilities;
            console.log(this.facilities);
        });
    }

    onDelete(id: String) {
        this.isLoading = true;
        this.facilitiesService.deleteFacility(id)
        .subscribe(() => {
            this.facilitiesService.getFacilities();
        });
    }

    onToggle(id: string, avail: boolean) {
        this.facilities.find(value => value.id == id)
        .isAvailable = avail;        
        this.facilitiesService.setAvailability(id, avail);
    }

    ngOnDestroy() {
        this.facilitiesSub.unsubscribe();
    }
}