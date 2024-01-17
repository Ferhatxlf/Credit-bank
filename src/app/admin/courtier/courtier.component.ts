
import { HttpClient } from '@angular/common/http';
import { ModalComponent } from '../component/modal/modal.component';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
interface Compte {
  id: number;
  nin: string;
  role: string;
  agenceId: number;
  createdAt: string; // Update the type based on your data
  // Add other properties as needed
}
@Component({
  selector: 'app-courtier',
  templateUrl: './courtier.component.html',
  styleUrls: ['./courtier.component.css'],
})
export class CourtierComponent implements OnInit {


  comptes: Compte[] = []; 
  isModalOpen = false;
  private elRef: ElementRef;
  constructor(private http: HttpClient, elRef: ElementRef) {
    this.elRef = elRef;
  }

  ngOnInit(): void {
    this.fetchComptes();
  }

  fetchComptes() {
    this.http.get<any[]>('https://thin-laugh-production.up.railway.app/banque/comptes').subscribe(
      (data) => {
        this.comptes = data;
      },
      (error) => {
        console.error('Error fetching comptes:', error);
      }
    );
  }

  isDropdownOpen =false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  /////////
  currentPage: number = 1;
  itemsPerPage: number = 10;
// Your array of Compte objects (replace this with your data)
  // Initialize or fetch your data into the comptes array

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  getPaginatedData(): Compte[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.comptes.slice(startIndex, endIndex);
  }

  // Calculate the total number of pages based on data length and itemsPerPage
  get totalNumberOfPages(): number[] {
    return Array(Math.ceil(this.comptes.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }


  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


}
