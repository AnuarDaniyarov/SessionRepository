import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import {FormsModule} from "@angular/forms";
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

  constructor(private productService: ProductsService) {}

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

    this.productService.createProduct(formData).subscribe(response => {
    }, error => {
    });
  }

  cancel(): void {

  }

  saveProducts(): void {
    console.log(this.products); // Для отладки
  }

}
