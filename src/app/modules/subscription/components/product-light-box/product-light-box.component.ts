import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource, Sort } from '@angular/material';
import {ProductService} from '../../../products/Service/product.service';
import {Product} from '../../../products/View-Model/product';

@Component({
  selector: 'app-product-light-box',
  templateUrl: './product-light-box.component.html',
  styleUrls: ['./product-light-box.component.css']
})
export class ProductLightBoxComponent implements OnInit {
  displayedColumns = ['ArticleNumber', 'Description'];
  datasource;
  @ViewChild(MatSort) sort: MatSort;
  @Output() closePopup = new EventEmitter<string>();
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.Getproduct();
  }
  close(product: any) {
    debugger
    if (product == null) {
      this.closePopup.next('');   
    } else {
    this.closePopup.next(product.ArticleNumber);
    }
  }
  Getproduct() {
    debugger
    this.productService.GetProduct(localStorage.getItem('articleid')).subscribe(res => {
      this.datasource = new MatTableDataSource(res.body);
      this.datasource.sort = this.sort;
    }, er => { console.log(er); });
  }
}
