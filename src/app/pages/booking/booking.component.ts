import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-booking',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './booking.component.html',

  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

  // =========================
  // BUS DETAILS
  // =========================

  busId: number = 0;

  busData: any;

  // =========================
  // SEAT DETAILS
  // =========================

  seats: any[] = [];

  selectedSeats: number[] = [];

  bookedSeats: number[] = [];

  // =========================
  // PASSENGER DETAILS
  // =========================

  passengerArray: any[] = [];

  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(

    private activatedRoute: ActivatedRoute,

    private masterSrv: MasterService

  ) {

    // GET BUS ID

    this.activatedRoute.params.subscribe(
      (res: any) => {

        this.busId = res.id;

      }
    );

  }

  // =========================
  // NG ON INIT
  // =========================

  ngOnInit(): void {

    this.getBusDetailsById();

    this.createSeats();

    this.loadBookedSeats();

  }

  // =========================
  // GET BUS DETAILS
  // =========================

  getBusDetailsById() {

    this.masterSrv
      .getBusById(this.busId)
      .subscribe((res: any) => {

        this.busData = res;

        console.log(this.busData);

      });

  }

  // =========================
  // CREATE SEATS
  // =========================

  createSeats() {

    for(let i = 1; i <= 32; i++) {

      this.seats.push({

        seatNo: i,

        isBooked: false

      });

    }

  }

  // =========================
  // SELECT SEAT
  // =========================

  selectSeat(seatNo: number) {

    // CHECK IF BOOKED

    if(this.bookedSeats.includes(seatNo)) {

      return;

    }

    const index =
      this.selectedSeats.indexOf(seatNo);

    // REMOVE SEAT

    if(index > -1) {

      this.selectedSeats.splice(index, 1);

      // REMOVE PASSENGER

      this.passengerArray =
        this.passengerArray.filter(
          x => x.seatNo != seatNo
        );

    }

    // ADD SEAT

    else {

      this.selectedSeats.push(seatNo);

      // CREATE PASSENGER FORM

      this.passengerArray.push({

        seatNo: seatNo,

        passengerName: '',

        age: '',

        gender: ''

      });

    }

  }

  // =========================
  // LOAD BOOKED SEATS
  // =========================

  loadBookedSeats() {

    const oldBookings =
      localStorage.getItem('busBookings');

    if(oldBookings != null) {

      const bookings =
        JSON.parse(oldBookings);

      const currentBusBookings =
        bookings.filter(
          (x: any) =>
            x.scheduleId == this.busId
        );

      currentBusBookings.forEach(
        (booking: any) => {

          booking.busBookingPassengers.forEach(
            (passenger: any) => {

              this.bookedSeats.push(
                passenger.seatNo
              );

            });

        });

    }

  }

  // =========================
  // CONFIRM BOOKING
  // =========================

  confirmBooking() {

    if(this.passengerArray.length == 0) {

      alert('Please Select Seats');

      return;

    }

    const bookingObj = {

      bookingId: 0,

      custId: 1,

      bookingDate: new Date(),

      scheduleId: this.busId,

      busBookingPassengers:
        this.passengerArray

    };

    // SAVE BOOKINGS

    const oldBookings =
      localStorage.getItem('busBookings');

    if(oldBookings != null) {

      const bookings =
        JSON.parse(oldBookings);

      bookings.push(bookingObj);

      localStorage.setItem(
        'busBookings',
        JSON.stringify(bookings)
      );

    }

    else {

      const bookings = [bookingObj];

      localStorage.setItem(
        'busBookings',
        JSON.stringify(bookings)
      );

    }

    // UPDATE BOOKED SEATS

    this.passengerArray.forEach(
      (x: any) => {

        this.bookedSeats.push(
          x.seatNo
        );

      });

    // CLEAR SELECTION

    this.selectedSeats = [];

    this.passengerArray = [];

    alert('Booking Confirmed Successfully');

    console.log(bookingObj);

  }

  // =========================
  // AVAILABLE SEATS
  // =========================

  getAvailableSeatsCount() {

    return (
      this.seats.length -
      this.bookedSeats.length
    );

  }

}