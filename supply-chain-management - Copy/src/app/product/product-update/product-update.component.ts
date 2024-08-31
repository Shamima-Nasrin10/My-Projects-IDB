// src/app/components/product-update/product-update.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ProductModel } from '../model/product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: ProductModel = {
    id: 0,
    name: '',
    photo: '',
    price: 0,
    stock: 0,
    features: [],
    benefits: []
  };
  productId!: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe({
      next: (product: ProductModel) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe({
      next: (response: ProductModel) => {
        console.log('Product updated successfully:', response);
        this.router.navigate(['/products']); 
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  addFeature(): void {
    this.product.features.push(''); 
  }

  removeFeature(index: number): void {
    this.product.features.splice(index, 1); 
  }

  addBenefit(): void {
    this.product.benefits.push(''); 
  }

  removeBenefit(index: number): void {
    this.product.benefits.splice(index, 1); 
  }
}
