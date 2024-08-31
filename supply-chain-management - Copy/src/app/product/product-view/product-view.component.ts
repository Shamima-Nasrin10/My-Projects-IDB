
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');

if (idParam !== null) {
  const productId = +idParam; // Convert to number

  if (isNaN(productId)) {
    // Handle invalid ID (NaN) case
    console.error('Invalid product ID:', idParam);
    this.router.navigate(['/products']); // Redirect or show an error message
  } else {
    // Valid productId, proceed with your logic
    this.productService.getProductById(productId).subscribe({
      next: (product: ProductModel) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      }
    });
  }
} else {
  // Handle the case where the 'id' parameter is missing
  console.error('Product ID parameter is missing');
  this.router.navigate(['/products']); // Redirect or show an error message
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

