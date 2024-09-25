import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  // product: ProductModel | null = null;
  // errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const productId = this.route.snapshot.paramMap.get('id');
    //
    // if (productId) {
    //   // Directly use the productId as a string
    //   this.productService.getProductById(productId).subscribe({
    //     next: (product: ProductModel) => {
    //       this.product = product;
    //     },
    //     error: (error) => {
    //       console.error('Error fetching product details:', error);
    //       this.errorMessage = 'Error loading product details. Please try again.';
    //       this.handleInvalidProductId(productId);
    //     }
    //   });
    // } else {
    //   // Handle the case where the 'id' parameter is missing
    //   console.error('Product ID parameter is missing');
    //   this.handleInvalidProductId(productId!);
    // }
  }

  // handleInvalidProductId(productId: string): void {
  //   console.error('Invalid product ID:', productId);
  //   this.router.navigate(['/products']); // Redirect or show an error message
  // }
  //
  // loadProductDetails(productId: string): void {
  //   this.productService.getProductById(productId).subscribe({
  //     next: (product) => {
  //       this.product = product;
  //     },
  //     error: (error) => {
  //       this.errorMessage = 'Error loading product details. Please try again.';
  //       console.error('Error:', error);
  //     }
  //   });
  // }
}
