import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service"; // Import your Product service
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../model/product.model"; // Ensure correct import path
import {Inventory} from "../../inventory/inventory/model/inventory.model";
import {InventoryService} from "../../inventory/inventory/inventory.service";
import {NotifyUtil} from "../../util/notify.util";
import {ApiResponse} from "../../util/api.response"; // Import Inventory model

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  product: Product = new Product();
  products: Product[] = [];
  inventories: Inventory[] = [];

  constructor(
    private productService: ProductService,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadInventories();
  }

  public loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.products = response.data['products'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadInventories(): void {
    this.inventoryService.getAllInventories().subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.inventories = response.data['inventories'];
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response: ApiResponse) => {
        if (response && response.success) {
          this.product = response.data['product'];
        } else {
          NotifyUtil.error(response);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public getByNameAndUnitPrice(): void {
    if (this.product.name && this.product.unitPrice) {
      this.productService.getByNameAndUnitPrice(this.product.name, this.product.unitPrice).subscribe({
        next: (response: ApiResponse) => {
          if (response && response.success) {
            this.product = response.data['product'];
          } else {
            NotifyUtil.error(response);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }


  public onSubmit(): void {
    if (!this.product.inventory.id) {
      NotifyUtil.error('Please select an inventory before saving the product.');
      return;
    }

    const productObservable = this.product.id
      ? this.productService.updateProduct(this.product)
      : this.productService.saveProduct(this.product);

    productObservable.subscribe({
      next: (response: ApiResponse) => {
        if (response.success) {
          this.resetProductForm();
          NotifyUtil.success(response);
        } else {
          NotifyUtil.error(response.message);
        }
      },
      error: (error) => {
        NotifyUtil.error(error);
      }
    });
  }

  public resetProductForm(): void {
    // Reset the form for new product entry
    this.product = new Product();
    this.loadProducts(); // Reload products
  }

  public deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProductById(id).subscribe({
        next: (response: ApiResponse) => {
          if (response.success) {
            this.resetProductForm(); // Optionally reset form after deletion
            NotifyUtil.success(response);
          } else {
            NotifyUtil.error(response.message);
          }
        },
        error: (error) => {
          NotifyUtil.error(error);
        }
      });
    }
  }

  public editProduct(productId: number): void {
    this.loadProduct(productId);
  }
}
