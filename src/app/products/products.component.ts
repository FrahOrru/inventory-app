import { ProductService } from './../product.service';
import { ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product.service';

@Component({
  selector: 'in-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  products$: Observable<IProduct[]> = this.productService.products$;
  delete = false;
  productToBeDeleted;
  productOpen;
  selectedProduct: IProduct;

  constructor(private productService: ProductService) { }

  trackById(index, item){
    return item.id;
  }

  ngOnInit(): void {
  }

  onDelete(product){
    this.delete = true;
    this.productToBeDeleted = product;
  }

  handleCancel(){
    this.delete = false;
  }

  confirmDelete(){
    this.handleCancel();
    this.productService.removeProduct(this.productToBeDeleted);
  }

  addProduct(){
    this.productOpen = true;
    this.selectedProduct = undefined;
  }

  onEdit(product){
    this.productOpen = true;
    this.selectedProduct = product;
  }

  handleFinish(event){
    if(event && event.product){
      if(this.selectedProduct){
        this.productService.editProduct(this.selectedProduct.id, event.product)
      }
      else{
        this.productService.addProduct(event.product);
      }
    }
    this.productOpen = false;
  }

}
