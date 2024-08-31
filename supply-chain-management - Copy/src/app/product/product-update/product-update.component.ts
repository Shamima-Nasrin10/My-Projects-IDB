// src/app/components/product-update/product-update.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProductService} from "../product.service";
import {ProductModel} from "../model/product.model";

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
  productId: number = 0; // Default value of 0
  // Allowing null as a possible value


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(this.productId).subscribe(
      (product: ProductModel) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      (response: ProductModel) => {
        console.log('Product updated successfully:', response);
        this.router.navigate(['/products']); // Redirect to the product list page after successful update
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
}

