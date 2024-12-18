import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class UpdateComponent implements OnInit {
  product = { name: '', price: 0, description: '' };

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }

  updateProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.updateProduct(id, this.product).subscribe({
      next: () => alert('Product updated successfully!'),
      error: () => alert('Error updating product.'),
    });
  }
}
