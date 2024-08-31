// product-view.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductModel } from '../model/product.model';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product: ProductModel | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    
    const productId = +this.route.snapshot.paramMap.get('id')! ?? null;

    if (productId) {
      this.loadProductDetails(productId);
    } else {
      this.errorMessage = 'Invalid product ID.';
    }
  }

  loadProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        this.errorMessage = 'Error loading product details. Please try again.';
        console.error('Error:', error);
      }
    });
  }
}

