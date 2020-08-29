import { Component, OnInit } from '@angular/core';
import { Facility } from '../facility.model';
import { FacilitiesService } from '../facilities.service';

@Component({
    selector: 'app-facility-list',
    templateUrl: './facility-list.component.html',
    styleUrls: ['./facility-list.component.css']
})

export class FacilityListComponent implements OnInit{
    facilities: Facility[] = [];

    constructor(
        private facilitiesService: FacilitiesService
    ) {}

    ngOnInit() {
        
        this.facilities = this.facilitiesService.getFacilities();
        console.log(this.facilities);
    }
}