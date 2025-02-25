import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Maja_DTO } from './models/maja-dto.model';
import { Dzivoklis_DTO } from './models/dzivoklis-dto.model';
import { Iedzivotajs_DTO } from './models/iedzivotajs-dto.model';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface TokenResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})

export class AppService {

  private apiUrl = 'https://localhost:7271/api';

  constructor(private http: HttpClient) { }

  login(loginData: { username: string, password: string }): Observable<TokenResponse> {
    console.log('Attempting to login with', loginData);
    return this.http.post<TokenResponse>(`${this.apiUrl}/Auth/token`, loginData).pipe(
      tap((response: TokenResponse) => {
        localStorage.setItem('access_token', response.token);
        console.log('Stored Token:', response.token);
      })
    );
  }

  public get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  getAllHouses(): Observable<Maja_DTO[]> {
    return this.http.get<Maja_DTO[]>(`${this.apiUrl}/maja`);
  }

  getHouse(id: number): Observable<Maja_DTO> {
    return this.http.get<Maja_DTO>(`${this.apiUrl}/maja/${id}`);
  }

  getApartmentsByHouse(houseId: number): Observable<Dzivoklis_DTO[]> {
    return this.http.get<Dzivoklis_DTO[]>(`${this.apiUrl}/maja/${houseId}/dzivokli`);
  }

  getApartment(id: number): Observable<Dzivoklis_DTO> {
    return this.http.get<Dzivoklis_DTO>(`${this.apiUrl}/dzivoklis/${id}`);
  }

  updateApartment(apartment: Dzivoklis_DTO): Observable<Dzivoklis_DTO> {
    return this.http.put<Dzivoklis_DTO>(`${this.apiUrl}/dzivoklis/${apartment.id}`, apartment);
  }

  getResident(id: number): Observable<Iedzivotajs_DTO> {
    return this.http.get<Iedzivotajs_DTO>(`${this.apiUrl}/iedzivotajs/${id}`);
  }

  getResidentsByApartment(apartmentId: number): Observable<Iedzivotajs_DTO[]> {
    return this.http.get<Iedzivotajs_DTO[]>(`${this.apiUrl}/dzivoklis/${apartmentId}/iedzivotaji`);
  }

  updateResident(resident: Iedzivotajs_DTO): Observable<Iedzivotajs_DTO> {
    return this.http.put<Iedzivotajs_DTO>(`${this.apiUrl}/Iedzivotajs/${resident.id}`, resident);
  }
}
