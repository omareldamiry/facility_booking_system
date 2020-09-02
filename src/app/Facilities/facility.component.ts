import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FacilitiesService } from './facilities.service';
import { Facility } from './facility.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-facility',
    templateUrl: './facility.component.html',
    styleUrls: ['./facility.component.css']
})

export class FacilityComponent implements OnInit, OnDestroy {
    isLoading = false;
    facility: Facility;
    private facilityId: string;
    private facilitySub: Subscription;
    
    constructor(
        private router: Router,
        private facilitiesService: FacilitiesService
    ) {}

    ngOnInit() {
        this.facilityId = this.router.url.split('=')[1];

        if (!this.facilityId) {
            this.router.navigate(['/']);
            return;
        }

        this.facilitiesService.getFacility(this.facilityId);
        this.facilitySub = this.facilitiesService.getFacilityUpdateListener()
        .subscribe(facility => {
            this.facility = facility;
        });

    }

    onDelete(id: string) {
        this.isLoading = true;
        this.facilitiesService.deleteFacility(id)
        .subscribe(() => {
            this.router.navigate(['/']);
        });
    }

    onToggle(avail: boolean) {
        this.facility.isAvailable = avail;        
        this.facilitiesService.setAvailability(this.facility.id, avail);
    }

    ngOnDestroy() {
        this.facilitySub.unsubscribe();
    }
}