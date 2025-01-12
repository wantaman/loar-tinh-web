import { Component, OnInit } from '@angular/core';
import { LocationService } from '../core/location.service';


@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.component.html',
  styleUrls: ['./current-location.component.css'],
})
export class CurrentLocationComponent implements OnInit {
  location: { latitude: number; longitude: number; accuracy: number ,  locationName?: string;} | null = null;
  errorMessage: string | null = null;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.fetchLocation();
  }

  fetchLocation(): void {
    this.locationService
      .getCurrentLocation()
      .then((location) => {
        this.location = location;
        console.log('User location:', location);
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error(error);
      });
  }
  
}
