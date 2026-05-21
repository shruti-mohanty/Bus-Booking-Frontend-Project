import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { LOCATIONS } from '../data/locations';
import { BUSES } from '../data/bus';

@Injectable({
  providedIn: 'root',
})

export class MasterService {

  constructor() {}

  // =========================
  // GET ALL LOCATIONS
  // =========================
  getLocations(): Observable<any[]> {

    return of(LOCATIONS);

  }

  // =========================
  // SEARCH BUS
  // =========================
  searchBus(
    from: number,
    to: number,
    travelDate: string
  ): Observable<any[]> {

    const filteredBuses = BUSES.filter(

      (bus: any) =>

        bus.fromLocation == from &&
        bus.toLocation == to &&
        bus.travelDate == travelDate

    );

    return of(filteredBuses);

  }

  // =========================
  // GET BUS BY ID
  // =========================
  getBusById(busId: number): Observable<any> {

    const bus = BUSES.find(

      (bus: any) => bus.busId == busId

    );

    return of(bus);

  }

  // =========================
  // SAVE BOOKING
  // =========================
  saveBooking(bookingData: any) {

    let oldBookings = localStorage.getItem('busBookings');

    if (oldBookings) {

      let bookings = JSON.parse(oldBookings);

      bookings.push(bookingData);

      localStorage.setItem(
        'busBookings',
        JSON.stringify(bookings)
      );

    } else {

      let bookings = [bookingData];

      localStorage.setItem(
        'busBookings',
        JSON.stringify(bookings)
      );

    }

  }

  // =========================
  // GET ALL BOOKINGS
  // =========================
  getBookings() {

    const bookings = localStorage.getItem('busBookings');

    if (bookings) {

      return JSON.parse(bookings);

    } else {

      return [];

    }

  }

  // =========================
  // GET BOOKED SEATS
  // =========================
  getBookedSeats(busId: number) {

    const bookings = localStorage.getItem('busBookings');

    if (bookings) {

      const allBookings = JSON.parse(bookings);

      return allBookings.filter(

        (item: any) => item.busId == busId

      );

    } else {

      return [];

    }

  }

  // =========================
  // DELETE BOOKING
  // =========================
  deleteBooking(index: number) {

    const bookings = this.getBookings();

    bookings.splice(index, 1);

    localStorage.setItem(
      'busBookings',
      JSON.stringify(bookings)
    );

  }

  // =========================
// REGISTER USER
// =========================

onRegisterUser(userData: any) {

  let oldUsers = localStorage.getItem('busUsers');

  if(oldUsers){

    let users = JSON.parse(oldUsers);

    users.push(userData);

    localStorage.setItem(
      'busUsers',
      JSON.stringify(users)
    );

  } else {

    let users = [userData];

    localStorage.setItem(
      'busUsers',
      JSON.stringify(users)
    );

  }

  return true;

}

}