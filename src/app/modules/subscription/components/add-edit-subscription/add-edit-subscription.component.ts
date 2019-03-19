import { Component, OnInit, Input, HostListener } from '@angular/core';
import { SubscriptionSearch, MultipleDomain } from '../../view-models/subscription-search';
import { SubscriptionService } from '../../services/subscription.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { noUndefined } from '@angular/compiler/src/util';
import { Location } from '@angular/common';
import * as XLSX from 'ts-xlsx';
import { LoaderService } from '../../../../library/shared/services/loader.service';
import { ConfirmBoxService } from '../../../../library/shared/services/confirm-box.service';
import { MsgBoxService } from '../../../../library/shared/services/msg-box.service';
import { ToastrService } from 'ngx-toastr';
// import { Domain } from 'domain';
@Component({
  selector: 'app-add-edit-subscription',
  templateUrl: './add-edit-subscription.component.html',
  styleUrls: ['./add-edit-subscription.component.css']
})

export class AddEditSubscriptionComponent implements OnInit {
  subSearch: SubscriptionSearch = {};
  subSearchList: SubscriptionSearch[] = [];
  subSearchList1: SubscriptionSearch[] = [];
  multiLineList: string;
  multiLinePriceList: string;
  multiListArr: any[];
  multipriceListArr:any[];
  dat: Date;
  tempString: string;
  // bsValue: string;
  minDate: string;
  maxDate: string;
  subId = '';
  IsEdit = false;
  list: SubscriptionSearch[];
  focusOnMultiBox = false;
  domainid = 0;
  deletedomainindex = 0;
  showProductList = false;
  showCustomerlist = false;
  tempdomainid  = 0;

  multipledomainlist: MultipleDomain[];
  


  constructor(private subscriptionservice: SubscriptionService, private route: ActivatedRoute,private confirmBoxService: ConfirmBoxService,
     private router: Router, private msgBoxService: MsgBoxService, private location: Location, private loaderService: LoaderService, private toastr : ToastrService) {
      this.confirmBoxService.componentMethodCalled$.subscribe(
        res => { 
          debugger;
          this.confirm(); } );

  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter': {
        if (!this.focusOnMultiBox) {
        this.saveSubscriptions();
        }
      }
    }
  }

  AllSubscription() {
    this.router.navigate(['subscription']);
  }
  goBack() {
    this.location.back();
  }
 addMore() {
   debugger;
    this.subSearch = {};
    this.domainid = this.domainid + 1;
    this.subSearch.DomainId = this.domainid;
    this.subSearch.dublicatecheck = 'red';
    this.subSearch.articleID="6000";
    this.subSearchList.push(this.subSearch);
  }
  removeRow() {
    this.subSearchList.pop();
  }

  saveSubscriptions() {
    debugger
    this.loaderService.Start();
    if (this.IsEdit) {
      let msg = '';
      if ( this.isNullOrEmpty (this.subSearch.customerID ) || this.isNullOrEmpty(this.subSearch.customerName) ||
      this.isNullOrEmpty(this.subSearch.domainName) || this.isNullOrEmpty(this.subSearch.articleID) ||
      this.isNullOrEmpty(this.subSearch.tld) || this.isNullOrEmpty(this.subSearch.price) ||
      this.isNullOrEmpty(this.subSearch.nextBillDate)) {
       msg = 'All fields are required.';
       this.loaderService.Stop();
     }
     if (msg !== '') {
      this.msgBoxService.ShowMsg(msg, 'Error');
    } else {
      this.subscriptionservice.updateSubscription(this.subSearch).subscribe(res => {
        this.router.navigate(['/subscription']);
        this.toastr.success('Subscription updated successfully!!!');
      }, err => { console.log(err);
          this.msgBoxService.ShowMsg(err.error, 'Error');
          this.loaderService.Stop();
       });
      }

    } else {
      let msg = '';
      for ( let i = 0; i < this.subSearchList.length; i++) {
        if (this.isNullOrEmpty (this.subSearchList[i].customerID ) || this.isNullOrEmpty(this.subSearchList[i].customerName) ||
         this.isNullOrEmpty(this.subSearchList[i].domainName) || this.isNullOrEmpty(this.subSearchList[i].articleID) ||
         this.isNullOrEmpty(this.subSearchList[i].tld) || this.isNullOrEmpty(this.subSearchList[i].price) ||
         this.isNullOrEmpty(this.subSearchList[i].nextBillDate)) {
          msg = 'All fields are required.';
          this.loaderService.Stop();
        }
      }
      if (msg !== '') {
        this.msgBoxService.ShowMsg(msg, 'Error');
        this.loaderService.Stop();
      } else {
      this.subscriptionservice.addSubscriptions(this.subSearchList).subscribe(res => {
        this.router.navigate(['/subscription']);
        this.toastr.success('Subscription added successfully!!!');
      }, err => { console.log(err); 
        this.msgBoxService.ShowMsg(err.error, 'Error'); 
        this.loaderService.Stop();
      });
    }
    }
   }

   confirm(): void {
     debugger; 
     if(this.deletedomainindex != undefined && this.deletedomainindex > 0)
     {
      var a = this.subSearchList.findIndex(x=>x.DomainId == this.deletedomainindex);
      this.subSearchList.splice(a, 1);        
      if(this.importlist != undefined && this.importlist.length > 0)
      { 
        this.importlist.splice(a, 1);   
      }
     }
    }

    deletelistdata(domainid : number)
    {
      debugger;
      this.deletedomainindex = domainid;
      this.confirmBoxService.Confirm();
    }


  //  domainlist() {  
  //   this.multipledomainlist = [
  //     {
  //       CustomerId: "1",
  //       CustomerName: "Bipul",
  //       ArticleId : "11",
  //       Domain: "test.com",
  //       TLD : "T-1",
  //       Price: "50",
  //       BillingDate : null
  //     },
  //     {
  //       CustomerId: "2",
  //       CustomerName: "Vipul",
  //       ArticleId : "111",
  //       Domain: "test1.com",
  //       TLD : "T-2",
  //       Price: "500",
  //       BillingDate : null
  //     },
  //     {
  //       CustomerId: "3",
  //       CustomerName: "Bipul Singh",
  //       ArticleId : "112",
  //       Domain: "test3.com",
  //       TLD : "T-3",
  //       Price: "400",
  //       BillingDate : null
  //     }
  //   ];
  // }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.subId = params['id'];
      this.initComponent();
    });

    // this.domainlist();
    // this.addMultipleDomaindata();
  }
  initComponent() {
    debugger;
    this.domainid = this.domainid + 1;
    if (!this.subId) {
      this.subSearch.DomainId = this.domainid;
      this.subSearch.dublicatecheck = 'red';
      this.subSearch.articleID="6000";
      this.subSearchList.push(this.subSearch);
    } else {
       this.IsEdit = true;
       this.subscriptionservice.getSubscriptionById(this.subId).subscribe(res => {
        this.subSearch = res.body;
        this.dat = new Date(res.body.nextBillDate);
        this.subSearch.nextBillDate = Object({});
        this.subSearch.nextBillDate['year'] = this.dat.getFullYear();
        this.subSearch.nextBillDate['month'] = (this.dat.getMonth() + 1);
        this.subSearch.nextBillDate['day'] = this.dat.getDate();
        this.subSearch.DomainId = this.domainid;
        this.subSearch.dublicatecheck = 'red';
        this.subSearch.articleID="6000";
        this.subSearchList.push(this.subSearch);
      }, err => {
        debugger;
        console.log(err); });
    }
  }

  addMultipleDomaindata()
  {
    debugger;
    this.loaderService.Start();
    debugger;
    this.subSearchList = [];
    this.domainid = 0;
  //   if(this.multiLineList != "" && this.multiLineList != undefined)
  //   {
  //     this.subSearchList = [];
  //   this.subSearch = {};
  //   this.multiListArr = this.multiLineList.trim().split('\n');
  //   for (let i = 0; i < this.multiListArr.length; i++) {
  //     this.domainid = this.domainid + 1;
  //     let str = [];
  //     str = this.multiListArr[i].split('.');
  //     if (i > 0) {
  //       this.subSearch = {};
  //     }

  //     if(this.subSearchList.length > 0)
  //     {
  //       var dublicate = this.subSearchList.find(x=> x.domainName == this.multiListArr[i]);
  //     }

  //     this.subSearch.DomainId = this.domainid;
  //     this.subSearch.domainName = this.multiListArr[i];
  //     this.subSearch.tld = str[1];
  //     this.subSearch.dublicatecheck = dublicate == undefined ? "red" : '';
  //     this.subSearchList.push(this.subSearch);
  //   }
  //   for ( let i = 0; i < this.subSearchList.length; i++ ) {
  //     this.subSearchList[i].customerID = this.subSearchList[0].customerID;
  //     this.subSearchList[i].customerName = this.subSearchList[0].customerName;
  //     this.subSearchList[i].price = this.subSearchList[0].price;
  //     this.subSearchList[i].nextBillDate = this.subSearchList[0].nextBillDate;
  //     this.subSearchList[i].articleID = this.subSearchList[0].articleID;
  //   }
  // }
    this.multiLineList = '';
    this.multipledomainlist = [];
    this.importlist.forEach(element=>{
      this.domainid = this.domainid + 1;
      this.multipledomainlist.push(
        {
          DomainId : this.domainid,
          CustomerId : element.CustomerId == undefined ? "" : element.CustomerId,
          CustomerName : element.CustomerName == undefined ? "" : element.CustomerName,
          ArticleId : element.ArticleId == undefined ? "" : element.ArticleId,
          Domain : element.Domain == undefined ? "" : element.Domain,
          TLD : element.TLD == undefined ? "" : element.TLD,
          Price : element.Price == undefined ? "" : element.Price,
          BillingDate : element.BillingDate == undefined ? "" : new Date(element.BillingDate)
        }
      );
    });

    debugger
    this.subscriptionservice.validateSubscriptionById(this.multipledomainlist).subscribe(res => {
      debugger
      this.multipledomainlist = [];
      this.multipledomainlist = res.body.data.SubscriptionsModelList ;

      for (let i = 0; i < this.multipledomainlist.length; i++) {
        this.subSearch = {};
        if(this.subSearchList.length > 0)
        {
          var dublicate = this.subSearchList.find(x=> x.domainName == this.multipledomainlist[i].Domain);
        }
        this.subSearch.DomainId = this.multipledomainlist[i].DomainId;
        this.subSearch.customerID = this.multipledomainlist[i].CustomerId;
        this.subSearch.customerName = this.multipledomainlist[i].CustomerName;
        this.subSearch.articleID = this.multipledomainlist[i].ArticleId;
        this.subSearch.domainName = this.multipledomainlist[i].Domain;
        this.subSearch.tld = this.multipledomainlist[i].TLD;
        this.subSearch.price = this.multipledomainlist[i].Price;      
        this.subSearch.nextBillDate = this.multipledomainlist[i].BillingDate == "" ? "" : {year: new Date(this.multipledomainlist[i].BillingDate).getFullYear(), month: new Date(this.multipledomainlist[i].BillingDate).getMonth() + 1, day: new Date(this.multipledomainlist[i].BillingDate).getDate()};
        this.subSearch.dublicatecheck = dublicate == undefined ? "red" : '';
        this.subSearch.recordStatus = this.multipledomainlist[i].recordStatus;
        this.subSearchList.push(this.subSearch);
      }
      this.loaderService.Stop();
    }, err => {
        this.toastr.error(err.error.Message);
        this.loaderService.Stop();
    });
  }

  addMultipleDomains() {
    debugger;
    console.log(this.focusOnMultiBox);
    debugger;
    this.subSearchList1 = [];
    this.subSearchList1 = this.subSearchList;
    this.subSearchList = [];
    this.subSearch = {};
    this.multiListArr = this.multiLineList.trim().split('\n');
    this.domainid = 0;
    for (let i = 0; i < this.multiListArr.length; i++) {
      this.domainid = this.domainid + 1;
      let str = [];
      str = this.multiListArr[i].split('.');
      if (i > 0) {
        this.subSearch = {};
      }

      if(this.subSearchList.length > 0)
      {
        var dublicate = this.subSearchList.find(x=> x.domainName == this.multiListArr[i]);
      }

      this.subSearch.DomainId = this.domainid;
      this.subSearch.domainName = this.multiListArr[i];
     // this.subSearch.price = this.multipriceListArr[i];
     this.subSearch.articleID="6000";
      this.subSearch.tld = str[1];
      this.subSearch.dublicatecheck = dublicate == undefined ? "red" : '';
      this.subSearchList.push(this.subSearch);
    }
    debugger
    if(this.subSearchList.length == this.subSearchList1.length)
    {
      for ( let i = 0; i < this.subSearchList.length; i++ ) {
        this.subSearchList[i].customerID = this.subSearchList1[i].customerID;
        this.subSearchList[i].customerName = this.subSearchList1[i].customerName;
        this.subSearchList[i].price = this.subSearchList1[i].price;
        this.subSearchList[i].nextBillDate = this.subSearchList1[i].nextBillDate;
        this.subSearchList[i].articleID = this.subSearchList1[i].articleID;
      }
    }
    else if(this.subSearchList1.length > this.subSearchList.length)
    {debugger;
      for ( let i = 0; i < this.subSearchList.length; i++ ) {
        this.subSearchList[i].customerID = this.subSearchList1.find(x=> x.domainName == this.subSearchList[i].domainName && x.tld == this.subSearchList[i].tld).customerID;
        this.subSearchList[i].customerName = this.subSearchList1.find(x=> x.domainName == this.subSearchList[i].domainName && x.tld == this.subSearchList[i].tld).customerName;
        this.subSearchList[i].price = this.subSearchList1.find(x=> x.domainName == this.subSearchList[i].domainName && x.tld == this.subSearchList[i].tld).price;
        this.subSearchList[i].nextBillDate = this.subSearchList1.find(x=> x.domainName == this.subSearchList[i].domainName && x.tld == this.subSearchList[i].tld).nextBillDate;
        this.subSearchList[i].articleID = this.subSearchList1.find(x=> x.domainName == this.subSearchList[i].domainName && x.tld == this.subSearchList[i].tld).articleID;
      }
    }
    else
    {debugger;
    for ( let i = 0; i < this.subSearchList.length - 1; i++ ) {
      this.subSearchList[i].customerID = this.subSearchList1[i].customerID;
      this.subSearchList[i].customerName = this.subSearchList1[i].customerName;
      this.subSearchList[i].price = this.subSearchList1[i].price;
      this.subSearchList[i].nextBillDate = this.subSearchList1[i].nextBillDate;
      this.subSearchList[i].articleID = this.subSearchList1[i].articleID;
    }
  }
    
    // if(this.importlist != undefined && this.importlist.length > 0)
    // {
    //   this.addMultipleDomaindata();
    // }
  }

  setAll() {
    let id = '';
    id = this.subSearchList[0].customerID;
    let name = '';
    name = this.subSearchList[0].customerName;
    for (let i = 0; i < this.subSearchList.length; i++) {
      this.subSearchList[i].customerID = id;
      this.subSearchList[i].customerName = name;
    }
  }

  isNullOrEmpty(str: string): boolean {
    if ( str === '' || str === undefined || str === null) {
      return  true;
    }
    return false;
  }

  arrayBuffer:any;
  file:File;
  importlist: MultipleDomain [];
  incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  }

  Upload() {    
    debugger;
    this.loaderService.Start();
    this.multipledomainlist = [];
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:false}));
          this.importlist = XLSX.utils.sheet_to_json(worksheet,{raw:true});
      }
      if(this.file != undefined)
      {
        fileReader.readAsArrayBuffer(this.file);

        setTimeout(() => {
          this.addMultipleDomaindata();
        }, 2000);
      }
      else
      {
        this.loaderService.Stop();
      }
    }

    showProductPopup(rowvalue : any)
    {
      debugger;
      this.tempdomainid = rowvalue.DomainId;
      if(rowvalue.articleID == undefined)
      {
        localStorage.setItem('articleid','');
      }
      else
      {
        localStorage.setItem('articleid',rowvalue.articleID);
      }
      this.showProductList = true;
    }

    closePodlst(e: any) {
      debugger;
      this.showProductList = false;
      
      //this.subSearchList[1].articleID = '1';
      this.subSearchList.find(x=> x.DomainId == this.tempdomainid).articleID = e;
      //this.subSearchFilter.articleID = e;
      //this.getSubscriptionSearch();
    }

    showCustomerPopup(rowvalue : any)
    {
      debugger;
      this.tempdomainid = rowvalue.DomainId;
      if(rowvalue.customerName == undefined)
      {
        localStorage.setItem('cusname','');
      }
      else
      {
        localStorage.setItem('cusname',rowvalue.customerName);
      }
      this.showCustomerlist = true;
    }

    closeCustomerlist(e: any)
    {
      debugger;
      this.showCustomerlist = false;
      this.subSearchList.find(x=> x.DomainId == this.tempdomainid).customerID = e.CustomerNumber;
      this.subSearchList.find(x=> x.DomainId == this.tempdomainid).customerName = e.Name;
    }
   
    getProduct_Customer(){
      debugger;
      this.subscriptionservice.getProduct_Customer(this.multiLineList).subscribe(res => {
        debugger
        //this.multipledomainlist = [];
        //this.multipledomainlist = res.body.data.SubscriptionsModelList ;
  
      });
    }
  

    updatePrice() {
      debugger;
      console.log(this.focusOnMultiBox);
      debugger;
      this.subSearchList1 = [];
      this.subSearchList1 = this.subSearchList;
      this.subSearchList = [];
      this.subSearch = {};
      this.multipriceListArr = this.multiLinePriceList.trim().split('\n');
      this.domainid = 0;
      for (let i = 0; i < this.multipriceListArr.length; i++) {
        this.domainid = this.domainid + 1;
        let str = [];
        str = this.multiListArr[i].split('.');
        if (i > 0) {
          this.subSearch = {};
        }
  
        if(this.subSearchList.length > 0)
        {
          var dublicate = this.subSearchList.find(x=> x.price == this.multipriceListArr[i]);
        }
  
        this.subSearch.DomainId = this.domainid;
        this.subSearch.price = this.multipriceListArr[i];
        this.subSearch.domainName=this.multiListArr[i];
        this.subSearch.articleID="6000";
        this.subSearch.tld = str[1];
        this.subSearch.dublicatecheck = dublicate == undefined ? "red" : '';
        this.subSearchList.push(this.subSearch);
      }
      debugger
      if(this.subSearchList.length == this.subSearchList1.length)
      {
        for ( let i = 0; i < this.subSearchList.length; i++ ) {
          this.subSearchList[i].customerID = this.subSearchList1[i].customerID;
          this.subSearchList[i].customerName = this.subSearchList1[i].customerName;
          //this.subSearchList[i].price = this.subSearchList1[i].price;
          this.subSearchList[i].domainName = this.subSearchList1[i].domainName;
          this.subSearchList[i].nextBillDate = this.subSearchList1[i].nextBillDate;
          this.subSearchList[i].articleID = this.subSearchList1[i].articleID;
        }
      }
      else if(this.subSearchList1.length > this.subSearchList.length)
      {
        for ( let i = 0; i < this.subSearchList.length; i++ ) {
          this.subSearchList[i].customerID = this.subSearchList1.find(x=> x.price == this.subSearchList[i].price && x.tld == this.subSearchList[i].tld).customerID;
          this.subSearchList[i].customerName = this.subSearchList1.find(x=> x.price == this.subSearchList[i].price && x.tld == this.subSearchList[i].tld).customerName;
          this.subSearchList[i].domainName = this.subSearchList1.find(x=> x.price == this.subSearchList[i].price && x.tld == this.subSearchList[i].tld).domainName;
          //this.subSearchList[i].price = this.subSearchList1.find(x=> x.price == this.subSearchList[i].price && x.tld == this.subSearchList[i].tld).price;
          this.subSearchList[i].nextBillDate = this.subSearchList1.find(x=> x.price == this.subSearchList[i].price && x.tld == this.subSearchList[i].tld).nextBillDate;
          this.subSearchList[i].articleID = this.subSearchList1.find(x=> x.price == this.subSearchList[i].price && x.tld == this.subSearchList[i].tld).articleID;
        }
      }
      else
      {
      for ( let i = 0; i < this.subSearchList.length - 1; i++ ) {
        this.subSearchList[i].customerID = this.subSearchList1[i].customerID;
        this.subSearchList[i].customerName = this.subSearchList1[i].customerName;
        //this.subSearchList[i].price = this.subSearchList1[i].price;
        this.subSearchList[i].domainName = this.subSearchList1[i].domainName;
        this.subSearchList[i].nextBillDate = this.subSearchList1[i].nextBillDate;
        this.subSearchList[i].articleID = this.subSearchList1[i].articleID;
      }
    }
  }
}
