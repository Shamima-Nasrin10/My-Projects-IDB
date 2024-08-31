

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../product.service';
import { ProductModel } from '../model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  productForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      photoUrl: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      features: this.fb.array([this.createFeature()]),  
      benefits: this.fb.array([this.createBenefit()])  
    });
  }

 
  get features(): FormArray {
    return this.productForm.get('features') as FormArray;
  }

  
  get benefits(): FormArray {
    return this.productForm.get('benefits') as FormArray;
  }

 
  createFeature(): FormGroup {
    return this.fb.group({
      feature: ['', Validators.required]
    });
  }

  
  createBenefit(): FormGroup {
    return this.fb.group({
      benefit: ['', Validators.required]
    });
  }

 
  addFeature(): void {
    this.features.push(this.createFeature());
  }

 
  removeFeature(index: number): void {
    this.features.removeAt(index);
  }

 
  addBenefit(): void {
    this.benefits.push(this.createBenefit());
  }

  
  removeBenefit(index: number): void {
    this.benefits.removeAt(index);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: ProductModel = this.productForm.value;
      
      product.features = this.features.value.map((f: any) => f.feature);
      product.benefits = this.benefits.value.map((b: any) => b.benefit);

      this.productService.addProduct(product).subscribe({
        next: () => {
          this.successMessage = 'Product created successfully!';
          this.router.navigate(['/products']); 
        },
        error: (error) => {
          this.errorMessage = 'Error creating product. Please try again.';
          console.error('Error:', error);
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
