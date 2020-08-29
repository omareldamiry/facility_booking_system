import { Injectable } from '@angular/core';

import { Facility } from './facility.model';

@Injectable({providedIn: 'root'})
export class FacilitiesService {
    private faciliies: Facility[] = [];
    
    constructor() {}

    getFacilities() {
        return this.faciliies;
    }
    
    addFacility(facility: Facility) {
        this.faciliies.push(facility);

        console.log(this.faciliies);
    }
}