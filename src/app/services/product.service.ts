import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { flatMap, first, shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


    export class ProductService {

    constructor(private http: HttpClient) { }

    private baseUrl = 'https://localhost:44371/api/products/getproducts';

    private productUrl = 'https://localhost:44371/api/products/addproduct';

    private deleteUrl = 'https://localhost:44371/api/products/deleteproduct/';

    private updateUrl = 'https://localhost:44371/api/products/updateproduct/';

    private product$: Observable<Product[]>;


    getProducts(): Observable<Product[]>
    {
        if (!this.product$)
        {
            this.product$ = this.http.get<Product[]>(this.baseUrl).pipe(shareReplay());
        }

         // if products cache exists return it
        return this.product$;

    }

    // Get Product by its ID
    getProductById(id: number): Observable<Product>
    {
        return this.getProducts().pipe(flatMap(result => result), first(product => product.id === id));
    }

    // Insert the Product
    insertProduct(newProduct: Product): Observable<Product>
    {
        return this.http.post<Product>(this.productUrl, newProduct);
    }

    // Update the Product

    updateProduct(id: number, editProduct: Product): Observable<Product>
    {
        return this.http.put<Product>(this.updateUrl + id, editProduct);
    }

    // Delete Product

    deleteProduct(id: number): Observable<any>
    {
        return this.http.delete(this.deleteUrl + id);
    }


    // Clear Cache
    clearCache()
    {
        this.product$ = null;
    }
}
