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

  addProduct(){}
  onEdit(){}
}
