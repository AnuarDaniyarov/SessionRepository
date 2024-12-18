import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  getProductById(id: string | null): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  updateProduct(id: string | null, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  saveProduct(product: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('brand', product.brand);
    formData.append('category', product.category);
    formData.append('price', product.price);
    formData.append('description', product.description);
    if (product.image) {
      formData.append('image', product.image, product.image.name);
    }

    return this.http.post<any>(this.apiUrl, formData);
  }
}
