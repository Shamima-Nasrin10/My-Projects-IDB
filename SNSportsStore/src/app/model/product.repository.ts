import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];
    


    constructor(private dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data
                .map(p => p.category)
                .filter((c): c is string => c !== undefined) // Filter out undefined values
                .sort();
        });
    }
    

    getProducts(category: string | null = null): Product[] {
        if (category === null) {
            return this.products;
        }
        return this.products.filter(p => p.category === category);
    }


    getProduct(id: number): Product {
        return this.products.find(p => p.id === id) as Product;
    }
    

    getCategories(): string[] {
        return this.categories;
    }
}