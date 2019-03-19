import { Component, OnInit, TemplateRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { SubscriptionSearch, SubscriptionFilter } from '../../view-models/subscription-search';
import { NgModule } from '@angular/core';
import { ROUTES } from '@angular/router/src/router_config_loader';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';
import { MatSort, MatSortable, MatTableDataSource, Sort } from '@angular/material';
import {NgbDateStruct, NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../../library/shared/services/loader.service';
import { ConfirmBoxService } from '../../../../library/shared/services/confirm-box.service';
import { MsgBoxService } from '../../../../library/shared/services/msg-box.service';
import { ToastrService } from 'ngx-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { SubscriptionId } from '../../view-models/user-model';
import * as FileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { empty } from 'rxjs/Observer';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})

export class SubscriptionListComponent implements OnInit{
  displayedColumns = ['checkItem', 'customerID', 'customerName', 'domainName', 'articleID', 'tld', 'price', 'nextBillDate', 'edit' ];
  subSearch: SubscriptionSearch = {articleID: '', customerID: '', customerName: '', domainName: '', nextBillDate: '', price: '', tld: ''};
  subSearchFilter: SubscriptionFilter = {articleID: '', customerID: '', customerName: '',
   domainName: '', nextBillDate: '', price: '', tld: '', fromDate: '', toDate: ''};
  subSearchList: SubscriptionSearch[] = [];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  minDate: string;
  maxDate: string;
  checkAll: boolean;
  msgList: any[] = [];
  animal: string;
  name: string;
  idForDelete: string;
  showProductList = false;
  idleState = 'Not started.';
  timedOut = false;
  IsadminRole : string;
  selected = [];
  subs:any;
  showDomainSearch:boolean=false;
  subscriptionid:SubscriptionId[]=[];
  multiLineDomainList: string;
  multiListDomainArr: any[];
  searchTerm: string;
  results: any[];
  constructor(
    private router: Router, private activateRoute: ActivatedRoute,private sanitizer: DomSanitizer,
    private subscriptionservice: SubscriptionService, private loaderService: LoaderService, private msgBoxService: MsgBoxService,
    private confirmBoxService: ConfirmBoxService, private toastr: ToastrService, private idle: Idle) 
    {
      idle.setIdle(10);
        idle.setTimeout(5);
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            this.logout();
        });

     this.confirmBoxService.componentMethodCalled$.subscribe(
        () => { this.confirm(); } );
    }

  
    reset() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
    }

  ngOnInit() {
    debugger
    this.checkAll = false;
    this.loaderService.Start();
    if (JSON.parse(localStorage.getItem('subscriptionFilter')) != null) {
    this.subSearchFilter = JSON.parse(localStorage.getItem('subscriptionFilter'));
    console.log('Get Storage');
    if (this.isModelEmpty(this.subSearchFilter)) {
      this. getSubscriptions();
    } else {
      this.getSubscriptionSearch();
    }
    localStorage.setItem('subscriptionFilter', null);
  } else {
    this. getSubscriptions();
  }

  this.IsadminRole = localStorage.getItem('IsadminRole');
  debugger
  }
  getSubscriptions() {
      this.subscriptionservice.getSubscriptions().subscribe(res => {
      this.subSearchList = res.body;
      this.dataSource = new MatTableDataSource(this.subSearchList);
      this.dataSource.sort = this.sort;
      this.loaderService.Stop();
    }, err => {  
      this.toastr.error(err.error);
      this.loaderService.Stop();
    });

  }

  getAllSubscriptionsToExcel() {
    debugger;
    let filename = 'Inbrand_subscription.csv'
    this.subscriptionservice.getAllSubscriptionsToExcel().subscribe(res => {
   
    debugger;
    if (res.status == 400) {
      return "FAILURE";
  } else if (res.status == 200) {
  
    debugger;
    this.subSearchList = res.body;
    var mediaType = 'text/csv';
    var blob = new Blob([res.body], { type: mediaType });
    FileSaver.saveAs(blob, filename);
    //this.hideDropItem();
   // this.dataSource = new MatTableDataSource(this.subSearchList);
   // this.dataSource.sort = this.sort;
    // this.loaderService.Stop();
  }
  }, err => {  
    this.toastr.error(err.error);
    this.loaderService.Stop();
  });

}

  showUserlist()
  {
    this.router.navigate(['subscription/userlist']);
  }

  addSubscription() {
    this.router.navigate(['subscription/add-edit-subscription']);
  }
  editSubscription(model: SubscriptionSearch) {
    localStorage.setItem('subscriptionFilter', JSON.stringify(this.subSearchFilter));
    console.log('Log Storage');
    console.log(localStorage.getItem('subscriptionFilter'));
    this.router.navigate(['subscription/add-edit-subscription', model.Id]);
  }
  deleteSubscription(template: TemplateRef<any>, id: string) {
    this.idForDelete = id;
    this.confirmBoxService.Confirm();
    // this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  dateSearch() {
    this.getSubscriptionSearch();
  }
  getSubscriptionSearch() {
    debugger;
    if (this.isModelEmpty(this.subSearchFilter)) {
    this.getSubscriptions();
    } else {
      debugger;
      let x: SubscriptionFilter = {};
      x.articleID = this.subSearchFilter.articleID;
      x.customerID = this.subSearchFilter.customerID;
      x.customerName = this.subSearchFilter.customerName;
      x.domainName = this.subSearchFilter.domainName;
      x.Id = this.subSearchFilter.Id;
      x.nextBillDate = this.subSearchFilter.nextBillDate === null ? '' : this.subSearchFilter.nextBillDate;
      x.tld = this.subSearchFilter.tld;
      x.price = this.subSearchFilter.price;
      x.fromDate = this.subSearchFilter.fromDate === null ? '' : this.subSearchFilter.fromDate;
      x.toDate = this.subSearchFilter.toDate === null ? '' : this.subSearchFilter.toDate;
      this.subscriptionservice.getSubscriptionSearch(x).subscribe(res => {
        debugger;
        this.subSearchList = res.body;
        this.dataSource = new MatTableDataSource(this.subSearchList);
        this.dataSource.sort = this.sort;
        this.loaderService.Stop();
      }, err => { //console.log(err); 
        this.toastr.error(err.error);
        this.loaderService.Stop();
      });
    }

  }
  closePodlst(e: any) {
    debugger;
    this.showProductList = false;
    this.subSearchFilter.articleID = e;
    this.getSubscriptionSearch();
  }
isModelEmpty(model: SubscriptionFilter ) {
    if ((model.customerID).trim()) {
        return false;
    }
    if ((model.customerName).trim()) {
      return false;
    }
    if ((model.domainName).trim()) {
      return false;
    }
    if ((model.articleID).trim()) {
      return false;
    }
    if ((model.tld).trim()) {
      return false;
    }
    if ((model.price).trim()) {
      return false;
    }
    if (model.nextBillDate) {
      return false;
    }
    if (model.fromDate) {
      return false;
    }
    if (model.toDate) {
      return false;
    }
    return true;

  }

  selectAllItem() {
    debugger;
    for ( let i = 0; i < this.subSearchList.length; i++) {
      this.subSearchList[i].checkItem = this.checkAll;
    }
  }
  onSelect(template: TemplateRef<any>, id: any) {
    debugger;
    for ( let i = 0; i < this.subSearchList.length; i++) {
      this.selected= id;
    }
    let subscriptions = new SubscriptionId();
    subscriptions.SubscriptionId=id;   
    this.subscriptionid.push(subscriptions);
    this.subs=this.subscriptionid;
    console.log(this.subscriptionid);
    //this.selected.splice(0, this.selected.length);
    //this.selected.push(...id);
  }


  deleteMultiple(event) {
    debugger;
    this.subscriptionservice.deleteMultiple(this.subs).subscribe(res => {
      this.getSubscriptions();
     // this.msgList = res.body;
     // this.getSubscriptionSearch();
     // this.loaderService.Stop();
      }, err => { 
        //console.log(err); 
        this.loaderService.Stop(); 
        this.toastr.error(err.error);
        //this.msgBoxService.ShowMsg(err.error, 'Error');
       });
  }


  genrateInvoice() {
    this.loaderService.Start();
    let subCheckedList = [];
    for ( let i = 0; i < this.subSearchList.length; i++) {
      debugger;
      if (this.subSearchList[i].checkItem) {
          subCheckedList.push(this.subSearchList[i]);
      }
     }
     this.subscriptionservice.generateInvoice(subCheckedList).subscribe(res => {
      this.msgList = res.body;
      this.getSubscriptionSearch();
      this.loaderService.Stop();
      }, err => { 
        //console.log(err); 
        this.loaderService.Stop(); 
        this.toastr.error(err.error);
        //this.msgBoxService.ShowMsg(err.error, 'Error');
       });
    }
   confirm(): void {
      if ( Number( this.idForDelete ) > 0 && this.idForDelete != undefined ) {
          this.subscriptionservice.deleteSubscription(this.idForDelete).subscribe(res => {
          this.getSubscriptions();
          this.idForDelete = '0';
      }, err => {
         //console.log(err);
         //this.msgBoxService.ShowMsg(err.error, 'Error');
         this.toastr.error(err.error);
      });
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.idle.stop();
  }

  showProductListPopup()
  {
    this.showProductList = true;
    localStorage.setItem('articleid','');
  }

  showIPAddresslist()
  {
    this.router.navigate(['subscription/ipaddresslist']);
  }

  ExportToExcel() {
    let filename = 'Inbrand_subscription.csv'
    debugger;
    if (this.isModelEmpty(this.subSearchFilter)) {
    this.getAllSubscriptionsToExcel();
    } else {
      debugger;
      let x: SubscriptionFilter = {};
      x.articleID = this.subSearchFilter.articleID;
      x.customerID = this.subSearchFilter.customerID;
      x.customerName = this.subSearchFilter.customerName;
      x.domainName = this.subSearchFilter.domainName;
      x.Id = this.subSearchFilter.Id;
      x.nextBillDate = this.subSearchFilter.nextBillDate === null ? '' : this.subSearchFilter.nextBillDate;
      x.tld = this.subSearchFilter.tld;
      x.price = this.subSearchFilter.price;
      x.fromDate = this.subSearchFilter.fromDate === null ? '' : this.subSearchFilter.fromDate;
      x.toDate = this.subSearchFilter.toDate === null ? '' : this.subSearchFilter.toDate;
      this.subscriptionservice.exportToExcel(x).subscribe(res => {
        debugger;
        if (res.status == 400) {
          return "FAILURE";
      } else if (res.status == 200) {
      //     var contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      //     var blob = new Blob([res.arrayBuffer()], { type: contentType });
      //     return blob;
      // }
        debugger;
        this.subSearchList = res.body;
        var mediaType = 'text/csv';
        var blob = new Blob([res.body], { type: mediaType });
        FileSaver.saveAs(blob, filename);
        //this.hideDropItem();
       // this.dataSource = new MatTableDataSource(this.subSearchList);
       // this.dataSource.sort = this.sort;
        // this.loaderService.Stop();
      }
      }, err => { //console.log(err); 
        this.toastr.error(err.error);
        this.loaderService.Stop();
      });
    }

  }

  showdomainSearch(){
    debugger;
this.showDomainSearch=true;
  }
  closemodal(){
    this.showDomainSearch=false;
    this.multiLineDomainList="";
    this.results.length=0;
    //this.getSubscriptions();
  }
  
  searchMultipleDomains() {
    debugger;
    this.multiListDomainArr = this.multiLineDomainList.trim().split('\n');
    this.subscriptionservice.searchMultipleDomain(this.multiListDomainArr).subscribe(res => {
      debugger;
      this.results =res.body;

     //this.updateSearch(this.results);
    }, err => {
        this.toastr.error(err.error.Message);
        this.loaderService.Stop();
    });
}


searchMultipleDomainslist() {
  debugger;
  this.multiListDomainArr = this.multiLineDomainList.trim().split('\n');
  this.subscriptionservice.searchMultipleDomainslist(this.multiListDomainArr).subscribe(res => {
    debugger;
    this.subSearchList = res.body;
    this.dataSource = new MatTableDataSource(this.subSearchList);
    this.dataSource.sort = this.sort;
    this.loaderService.Stop();

   //this.updateSearch(this.results);
  }, err => {
      this.toastr.error(err.error.Message);
      this.loaderService.Stop();
  });
}
}
