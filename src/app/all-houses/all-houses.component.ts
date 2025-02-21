import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Maja_DTO } from '../models/maja-dto.model';

@Component({
  selector: 'app-all-houses',
  imports: [RouterModule, CommonModule],
  providers: [],
  standalone: true,
  templateUrl: './all-houses.component.html',
  styleUrl: './all-houses.component.css'
})
export class AllHousesComponent implements OnInit {
  houses: Maja_DTO[] = [];

  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.apiService.getAllHouses().subscribe(houses => {
      this.houses = houses;
    });
  }
}

// import { Component, OnInit } from '@angular/core';


// @Component({
//   selector: 'app-all-houses',
//   imports: [RouterModule, CommonModule],
//   providers: [],
//   templateUrl: './all-houses.component.html',
//   styleUrl: './all-houses.component.css',
//   standalone: true,
// })
// export class AllHousesComponent implements OnInit{
//   houses: Maja_DTO[] = [];

//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.apiService.getAllHouses().subscribe(houses => {
//       this.houses = houses;
//     });
//   }
// }
