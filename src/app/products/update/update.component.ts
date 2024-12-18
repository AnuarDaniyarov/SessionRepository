import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  product: any = { name: '', brand: '', category: '', price: 0, description: '', createdDate: '', fileName: '' };


  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data;
      });
    }
  }


  updateProduct(): void {
    this.productService.updateProduct(this.product.id, this.product).subscribe(
      () => {
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error updating product', error);
      }
    );
  }

}
