// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { Maja_DTO } from '../models/maja-dto.model';
import { Dzivoklis_DTO } from '../models/dzivoklis-dto.model';

@Component({
  selector: 'app-house-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './house-detail.component.html',
  styleUrl: './house-detail.component.css',
  //   selector: 'app-house-detail',
  // templateUrl: './house-detail.component.html',
  standalone: true,
  // imports: [CommonModule, RouterModule],
  providers: [],
})
export class HouseDetailComponent  implements OnInit {
  house!: Maja_DTO;
  dzivokli: Dzivoklis_DTO[] = [];

  constructor(private route: ActivatedRoute, private apiService: AppService) { }

  ngOnInit(): void {
    const houseId = this.route.snapshot.paramMap.get('id');
    if (houseId) {
      this.apiService.getHouse(Number(houseId)).subscribe({
        next: (house) => {
          this.house = house;
        },
        error: (err) => {
          console.error('Error fetching house details', err);
        }
      });

      // Fetch related apartments
      this.apiService.getApartmentsByHouse(Number(houseId)).subscribe({
        next: (dzivokli) => {
          this.dzivokli = dzivokli;
        },
        error: (err) => {
          console.error('Error fetching apartments', err);
        }
      });
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ApiService } from '../api.service';
// import { Maja_DTO } from '../models/maja-dto.model';
// import { Dzivoklis_DTO } from '../models/dzivoklis-dto.model';

// @Component({
//   selector: 'app-house-detail',
//   templateUrl: './house-detail.component.html',
//   styleUrls: ['./house-detail.component.css'],
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   providers: [],
// })
// export class HouseDetailComponent implements OnInit {
//   house!: Maja_DTO;
//   dzivokli: Dzivoklis_DTO[] = [];

//   constructor(private route: ActivatedRoute, private apiService: ApiService) { }

//   ngOnInit(): void {
//     const houseId = this.route.snapshot.paramMap.get('id');
//     if (houseId) {
//       this.apiService.getHouse(Number(houseId)).subscribe({
//         next: (house) => {
//           this.house = house;
//         },
//         error: (err) => {
//           console.error('Error fetching house details', err);
//         }
//       });

//       // Fetch related apartments
//       this.apiService.getApartmentsByHouse(Number(houseId)).subscribe({
//         next: (dzivokli) => {
//           this.dzivokli = dzivokli;
//         },
//         error: (err) => {
//           console.error('Error fetching apartments', err);
//         }
//       });
//     }
//   }
// }
