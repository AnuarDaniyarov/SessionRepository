import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    DatePipe
  ],
  standalone: true
})
export class ListComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: any) => (this.products = data),
      error: (error: any) =>
        (this.errorMessage = 'Failed to load products.'),
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.getProducts();
      },
      (error) => {
        this.errorMessage = 'Не удалось удалить продукт';
      }
    );
  }
}
