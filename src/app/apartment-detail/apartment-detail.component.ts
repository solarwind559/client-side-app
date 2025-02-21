// import { Component } from '@angular/core';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppService } from '../app.service';
import { Dzivoklis_DTO } from '../models/dzivoklis-dto.model';
import { Iedzivotajs_DTO } from '../models/iedzivotajs-dto.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-apartment-detail',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.css',
  // selector: 'app-apartment-detail',
  standalone: true,
  // imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  // templateUrl: './apartment-detail.component.html',
  // styleUrls: ['./apartment-detail.component.css'],
})
// export class ApartmentDetailComponent {

// }


// import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { ActivatedRoute, RouterModule } from '@angular/router';
// import { AppService } from '../app.service';
// import { Dzivoklis_DTO } from '../models/dzivoklis-dto.model';
// import { Iedzivotajs_DTO } from '../models/iedzivotajs-dto.model';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-apartment-detail',
//   standalone: true,
//   imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
//   templateUrl: './apartment-detail.component.html',
//   styleUrls: ['./apartment-detail.component.css'],
// })
export class ApartmentDetailComponent implements OnInit {
  apartment!: Dzivoklis_DTO;
  apartmentForm!: FormGroup;
  editingField: string | null = null;
  residents: Iedzivotajs_DTO[] = [];
  selectedResident: any = {};
  @ViewChild('residentModal') residentModal!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private apiService: AppService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    const apartmentId = this.route.snapshot.paramMap.get('id');
    if (apartmentId) {
      this.apiService.getApartment(Number(apartmentId)).subscribe({
        next: (apartment) => {
          this.apartment = apartment;
          this.initForm(apartment);
        },
        error: (err) => {
          console.error('Error fetching apartment details', err);
        }
      });

      this.apiService.getResidentsByApartment(Number(apartmentId)).subscribe({
        next: (residents) => {
          console.log('Fetched residents:', residents);
          this.residents = residents;
        },
        error: (err) => {
          console.error('Error fetching residents', err);
        }
      });
    }
  }

  initForm(apartment: Dzivoklis_DTO): void {
    this.apartmentForm = this.fb.group({
      numurs: [apartment.numurs],
      stavs: [apartment.stavs],
      istabu_skaits: [apartment.istabu_Skaits],
      iedzivotaju_skaits: [apartment.iedzivotaju_Skaits],
      pilna_platiba: [apartment.pilna_Platiba],
      dzivojama_platiba: [apartment.dzivojama_Platiba],
    });
  }

  startEditing(field: string): void {
    this.editingField = field;
  }

  stopEditing(): void {
    this.editingField = null;
  }

  onSubmit(): void {
    if (this.apartmentForm.valid) {
      const updatedApartment: Dzivoklis_DTO = this.apartmentForm.value;
      updatedApartment.id = this.apartment.id;

      this.apiService.updateApartment(updatedApartment).subscribe({
        next: () => {
          console.log('Apartment updated successfully');
          this.stopEditing();
        },
        error: (err) => {
          console.error('Error updating apartment', err);
        }
      });
    }
  }

  openModal(event: MouseEvent, id: number): void {
    event.preventDefault(); // Prevent default navigation
    this.apiService.getResident(id).subscribe(data => {
      this.selectedResident = data;
      this.modalService.open(this.residentModal, { ariaLabelledBy: 'residentModalLabel' });
    });
  }

  saveChanges(): void {
    this.apiService.updateResident(this.selectedResident).subscribe(() => {
      // Refresh residents list or handle success notification
      this.modalService.dismissAll(); // No arguments passed here
    });
  }
}
