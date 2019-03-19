import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../library/shared/services/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxService } from '../../../../library/shared/services/confirm-box.service';
import { IPAddress } from '../../view-models/ipaddress-model';
import { IpaddressService } from '../../services/ipaddress.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Location } from '@angular/common';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ipaddresslist',
  templateUrl: './ipaddresslist.component.html',
  styleUrls: ['./ipaddresslist.component.css']
})
export class IpaddresslistComponent implements OnInit {

  ipaddresslistdata : IPAddress[];
  ipaddressdata : IPAddress;
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  modalRef: BsModalRef;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
  };
  userForm: FormGroup;
  idForDelete: string;
  hideform: boolean = true;

  displayedColumns = ['SystemIPId', 'IPAddress', 'edit'];
  constructor(
    private modalService: BsModalService,
    private router: Router, private toastr: ToastrService,
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private confirmBoxService: ConfirmBoxService,
    private ipaddressService: IpaddressService,
    private location: Location,
  ) { 
    this.setInititalformdata();
    this.confirmBoxService.componentMethodCalled$.subscribe(
      () => { this.confirm(); } );
  }

  ngOnInit() {
    this.getIPAddresslist();
  }

  confirm(): void {
    debugger; 
    this.loaderService.Start();
      this.ipaddressService.deleteIPAddress(this.idForDelete).subscribe(res => {
        this.getIPAddresslist();
  }, err => {
     this.toastr.error(err.error);
     this.loaderService.Stop();
  });
}

deleteUser(template: TemplateRef<any>, id: string) {
  this.idForDelete = id;
  this.confirmBoxService.Confirm();
}

  getIPAddresslist() {
    debugger
    this.loaderService.Start();
    this.ipaddresslistdata = [];
    this.ipaddressService.getIPAddresslist().subscribe(res => {
      this.ipaddresslistdata = res.body.data.IPAddressModellist;
      this.dataSource = new MatTableDataSource(this.ipaddresslistdata);
      this.dataSource.sort = this.sort;
      this.loaderService.Stop();
      debugger;
    }, err => {
        this.toastr.error(err.error);
        this.loaderService.Stop();
      });

  }

  goBack()
  {
    this.location.back();
  }

  setInititalformdata() {
    this.userForm = this.fb.group({
      'SystemIPId': 0,
      'IPAddress': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])]
    });
  }

  Showpopup(template: TemplateRef<any>) {
    this.setInititalformdata();
    this.modalRef = this.modalService.show(template,this.ngbModalOptions);
  }

  hidePopup() {
    debugger
    this.hideform = false;
    this.modalRef.hide();
  }

  setdatainlist() {
    this.userForm;
    this.ipaddressdata = {};
    this.ipaddressdata.SystemIPId = this.userForm.value.SystemIPId;
    this.ipaddressdata.IPAddress = this.userForm.value.IPAddress;
  }

  onformSubmit(template: TemplateRef<any>) {
    debugger;
    this.loaderService.Start();
    debugger;
    this.setdatainlist();
    if(this.ipaddressdata.SystemIPId == 0)
    {
      this.addIPAddressDetails();
    }
    else
    {
      debugger;
      if(this.hideform == true)
      {
        this.editIPAddressDetails();
        //this.hideform = false;
      }
      else {
        this.loaderService.Stop();
        this.hideform = true;
      }
    }

  }

  addIPAddressDetails()
  {
    this.ipaddressService.addNewIPAddress(this.ipaddressdata).subscribe(res => {
      this.getIPAddresslist();            
      this.toastr.success('IPAddress added successfully!!!');
      this.modalRef.hide();
      this.loaderService.Stop();
    }, err => {
        this.toastr.error(err.error.Message);
      this.loaderService.Stop();
    });
  }

  editIPAddressDetails()
  {
    this.ipaddressService.editIPAddressDetails(this.ipaddressdata).subscribe(res => {
      this.getIPAddresslist();
      this.toastr.success('IPAddress updated successfully.');
      this.modalRef.hide();
      this.loaderService.Stop();
    }, err => {
      this.toastr.error(err.error.Message);
      this.loaderService.Stop();
    });
  }

  showEditform(template: TemplateRef<any>, data)
  {
    this.loaderService.Start();
    this.userForm = this.fb.group({
      'SystemIPId': data.SystemIPId,
      'IPAddress': [data.IPAddress, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(30)])]
    });
    this.modalRef = this.modalService.show(template, this.ngbModalOptions);
    this.loaderService.Stop();
  }

}
