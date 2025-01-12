import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  
  // OpenStreetMap Nominatim API URL
  private readonly geocodingApiUrl = 'https://nominatim.openstreetmap.org/reverse'; 

  constructor(private http: HttpClient) {}

  getCurrentLocation(): Promise<{
    latitude: number;
    longitude: number;
    accuracy: number;
    locationName?: string;
  }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser.');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            this.getLocationName(latitude, longitude)
              .then((locationName) => {
                resolve({ latitude, longitude, accuracy, locationName });
              })
              .catch(() => {
                resolve({ latitude, longitude, accuracy, locationName: 'Unknown location' });
              });
          },
          (error) => {
            reject(`Geolocation error: ${error.message}`);
          }
        );
      }
    });
  }

  private getLocationName(latitude: number, longitude: number): Promise<string> {
    const url = `${this.geocodingApiUrl}?lat=${latitude}&lon=${longitude}&format=json`;
    return this.http
      .get<any>(url)
      .toPromise()
      .then((response) => {
        if (response && response.display_name) {
          return response.display_name; 
        } else {
          throw new Error('Unable to fetch location name.');
        }
      });
  }
}
