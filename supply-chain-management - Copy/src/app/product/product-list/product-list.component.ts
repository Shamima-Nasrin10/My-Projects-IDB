

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // products: ProductModel[] = [];
  // isAdmin: boolean = false;
  //
  // constructor(
  //   private productService: ProductService,
  //   private authService: AuthService,
  //   private router: Router
  // ) { }

  ngOnInit(): void {
    // this.loadProducts();
    // this.checkAdmin();
  }

  // loadProducts(): void {
  //   this.productService.getProducts().subscribe(products => {
  //     this.products = products;
  //   });
  // }
  //
  // checkAdmin(): void {
  //
  //   const userRole = this.authService.getUserRole();
  //   this.isAdmin = userRole === 'ADMIN';
  // }
  //
  // editProduct(product: ProductModel): void {
  //
  //   this.router.navigate(['/products/update', product.id]);
  // }
  //
  // deleteProduct(product: ProductModel): void {
  //   if (confirm(`Are you sure you want to delete the product: ${product.name}?`)) {
  //     this.productService.deleteProduct(product.id).subscribe(() => {
  //       this.loadProducts();
  //     });
  //   }
  // }
  //
  // viewProductDetails(product: ProductModel): void {
  //   this.router.navigate(['/products/view', product.id]);
  // }
  //
  // addProduct(): void {
  //   this.router.navigate(['/product-create']);
  // }
  //
  // listenForStockUpdates(): void {
  //   // Listen for stock updates
  //   this.productService.stockUpdated.subscribe(updatedProduct => {
  //     const index = this.products.findIndex(p => p.id === updatedProduct.id);
  //     if (index !== -1) {
  //       this.products[index].stock = updatedProduct.stock;
  //     }
  //   });
  // }
}
