import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Facility } from './facility.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + 'facilities/';

@Injectable({providedIn: 'root'})
export class FacilitiesService {
    private facilities: Facility[] = [];
    private facilitiesUpdated = new Subject<Facility[]>();
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    getFacilities() {
        // this.facilities = [
        //     { id: null, name: 'Lecture Hall', seats: 80, isAvailable: true },
        //     { id: null, name: 'Dewan Sultan Iskandar', seats: 200, isAvailable: false },
        //     { id: null, name: 'Lecture Room', seats: 40, isAvailable: true },
        //     { id: null, name: 'Computer Lab', seats: 20, isAvailable: true },
        //     { id: null, name: 'Digitals Lab', seats: 20, isAvailable: false },
        // ];

        this.http.get<{ message: String, facilities: any }>(BACKEND_URL)
        .pipe(map(facilityData => {
            return { facilities: facilityData.facilities.map(facility => {
                return {
                    id: facility._id,
                    name: facility.name,
                    seats: facility.seats,
                    isAvailable: facility.isAvailable
                };
            }) };
        }))
        .subscribe(transformedFacilitiesData => {
            this.facilities = transformedFacilitiesData.facilities;
            this.facilitiesUpdated.next([...this.facilities]);
        });
    }

    getFacilityUpdateListener() {
        return this.facilitiesUpdated.asObservable();
    }
    
    addFacility(facility: Facility) {
        
        this.http.post<{ message: String, facility: Facility }>(BACKEND_URL, facility)
        .subscribe(responseData => {
            console.log(responseData.facility);
            this.router.navigate(['/']);
        });

    }

    setAvailability(id: string, avail: Boolean) {
        this.http.patch(BACKEND_URL + id, { availability: avail })
        .subscribe(responseData => {

        });
    }

    deleteFacility(id: String) {
        
        return this.http.delete(BACKEND_URL + id);
    }
}