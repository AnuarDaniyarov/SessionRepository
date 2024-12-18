import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import {Router, RouterLink} from '@angular/router';
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink,
    DatePipe
  ],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load products';
      }
    );
  }

  goToProductDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        this.errorMessage = 'Failed to delete product';
      }
    );
  }
}
