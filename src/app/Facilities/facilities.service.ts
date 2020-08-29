import { Injectable } from '@angular/core';

import { Facility } from './facility.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class FacilitiesService {
    private facilities: Facility[] = [];
    
    constructor(
        private router: Router
    ) {}

    getFacilities() {
        // this.facilities = [
        //     { id: null, name: 'Lecture Hall', seats: 80, isAvailable: true },
        //     { id: null, name: 'Dewan Sultan Iskandar', seats: 200, isAvailable: false },
        //     { id: null, name: 'Lecture Room', seats: 40, isAvailable: true },
        //     { id: null, name: 'Computer Lab', seats: 20, isAvailable: true },
        //     { id: null, name: 'Digitals Lab', seats: 20, isAvailable: false },
        // ];
        
        return this.facilities;
    }
    
    addFacility(facility: Facility) {
        this.facilities.push(facility);

        this.router.navigate(['/']);
    }
}