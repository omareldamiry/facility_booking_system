import { Injectable } from '@angular/core';

import { Facility } from './facility.model';

@Injectable({providedIn: 'root'})
export class FacilitiesService {
    private facilities: Facility[] = [];
    
    constructor() {}

    getFacilities() {
        return this.facilities;
    }
    
    addFacility(facility: Facility) {
        this.facilities.push(facility);

        console.log(this.facilities);
    }
}