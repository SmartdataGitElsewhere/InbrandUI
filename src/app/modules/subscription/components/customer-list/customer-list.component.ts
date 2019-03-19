import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { CustomerService } from '../../../products/Service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  displayedColumns = ['CustomerNumber', 'Name'];
  datasource;
  @ViewChild(MatSort) sort: MatSort;
  @Output() customerclosePopup = new EventEmitter<string>();
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.GetCustomersList();
  }

  close(customer: any) {
    debugger
    if (customer == null) {
      this.customerclosePopup.next('');   
    } else {
    this.customerclosePopup.next(customer);
    }
  }
  GetCustomersList() {
    debugger
    this.customerService.GetCustomerList(localStorage.getItem("cusname")).subscribe(res => {
      this.datasource = new MatTableDataSource(res.body);
      this.datasource.sort = this.sort;
    }, er => { 
      //console.log(er);
     });
  }

}
