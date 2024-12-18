import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-create-product',
  templateUrl: './create.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  products: any = {
    name: '',
    brand: '',
    category: '',
    price: null,
    description: '',
    image: null
  };
  imageError: boolean = false;
  errorMessage: string = '';

  constructor(private productService: ProductsService, private router: Router) {}

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.products.image = file;
      this.imageError = false;
    }
  }

  createProducts(): void {
    if (!this.products.image) {
      this.imageError = true;
      return;
    }

    const formData = new FormData();
    formData.append('name', this.products.name);
    formData.append('brand', this.products.brand);
    formData.append('category', this.products.category);
    formData.append('price', this.products.price.toString());
    formData.append('description', this.products.description);
    formData.append('image', this.products.image);

    this.productService.createProduct(formData).subscribe(
      response => {
        this.router.navigate(['/list.component.html']);
      },
      error => {
        this.errorMessage = 'Failed to create product. Please try again.';
        console.error(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  saveProduct(): void {
    this.productService.saveProduct(this.products).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to save product. Please try again.';
        console.error(error);
        this.router.navigate(['/products']);
      }
    });
  }
}
