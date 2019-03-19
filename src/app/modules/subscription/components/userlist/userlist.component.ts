import { Component, OnInit, TemplateRef, ViewChild, Compiler } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../../library/shared/services/loader.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms'
import { User } from '../../view-models/user-model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { CustomvalidatorsComponent } from '../../../../library/shared/components/customvalidators/customvalidators.component';
import { ConfirmBoxService } from '../../../../library/shared/services/confirm-box.service';
import { Location } from '@angular/common';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DeviceDetectorService } from 'ngx-device-detector';



@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  // public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  userForm: FormGroup;
  modalRef: BsModalRef;
  @ViewChild(MatSort) sort: MatSort;
  userdata: User = {};
  userlistdata: User[];
  dataSource;
  hideform: boolean = true;
  idForDelete: string;
  ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false    
};
deviceInfo;
  

  displayedColumns = ['UserId', 'FirstName', 'Email', 'PhoneNumber', 'edit'];
  // subSearch: User = {UserId: '', FirstName: '', Email: '', PhoneNumber: '', Status: false,};
  constructor(
    private modalService: BsModalService, private userservice: UserService,
    private router: Router, private toastr: ToastrService,
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private confirmBoxService: ConfirmBoxService,
    private location: Location,
    private _compiler: Compiler,
    private deviceService: DeviceDetectorService
  ) {
    this.setInititalformdata();
    this.confirmBoxService.componentMethodCalled$.subscribe(
      () => { this.confirm(); } );
      this.deviceInfo = this.deviceService.getDeviceInfo();
      }

  ngOnInit() {
    this.getUserList();

  }

  deleteUser(template: TemplateRef<any>, id: string) {    
    this.idForDelete = id;
    this.confirmBoxService.Confirm();
  }

  confirm(): void {
    debugger; 
    this.loaderService.Start();
      this.userservice.deleteUser(this.idForDelete).subscribe(res => {
        this.getUserList();
  }, err => {
     this.toastr.error(err.error);
     this.loaderService.Stop();
  });
}

  setInititalformdata() {
    this.userForm = this.fb.group({
      'UserId': [0],
      'FirstName': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      'LastName': [null],
      'Email': [null, Validators.email],
      'PhoneNumber': [null, Validators.required],
      'Password': [null, Validators.compose([Validators.required,CustomvalidatorsComponent.ConfirmPassword, Validators.minLength(6), Validators.maxLength(20)])],
      'ConfirmPassword': [null, Validators.compose([Validators.required ,CustomvalidatorsComponent.ConfirmPassword, Validators.minLength(6), Validators.maxLength(20)])],
      // 'ConfirmPassword': [data.Password, Validators.compose([CustomValidation.ComparePassword, Validators.required, Validators.minLength(6), Validators.maxLength(20)])],     
      // 'Status': [null]
    });
  }

  setdatainlist() {
    this.userForm;
    this.userdata = {};
    this.userdata.UserId = this.userForm.value.UserId;
    this.userdata.FirstName = this.userForm.value.FirstName;
    this.userdata.LastName = this.userForm.value.LastName;
    this.userdata.Email = this.userForm.value.Email;
    this.userdata.Password = this.userForm.value.Password;
    this.userdata.ConfirmPassword = this.userForm.value.ConfirmPassword;
    this.userdata.PhoneNumber = this.userForm.value.PhoneNumber;
  }

  onformSubmit(template: TemplateRef<any>) {
    debugger
    this.loaderService.Start();
    this.setdatainlist();
    if (this.userdata.UserId == '0') {
      this.onAddNewUserSave(template);
    }
    else {
      if (this.hideform == true) {
        this.onEditUserDetails(template);
        this.hideform = true;
      }
      else {
        this.loaderService.Stop();
        this.hideform = true;
      }
    }
  }

  onAddNewUserSave(template) {
    this.userservice.addNewUser(this.userdata).subscribe(res => {
      //location.reload();
      this.getUserList();            
      this.toastr.success('New User added successfully!!!');
      this.modalRef.hide();
    }, err => {
      debugger
      if (err.error.ModelState.$id == "2") {
      
        this.toastr.error('Password and confirmation password do not match.');
        // this.modalRef = this.modalService.show(template, ngbModalOptions);
        //this.modalRef = this.modalService.show(template, this.ngbModalOptions);
      }
      else {
        this.toastr.error(err.error.Message);
      }
      this.loaderService.Stop();
    });
    //this.modalRef.hide();
  }

  onEditUserDetails(template) {
    this.userservice.editUserDetails(this.userdata).subscribe(res => {
      //this._compiler.clearCache();
      //location.reload();/
      this.getUserList();
      this.toastr.success('User Details updated successfully');
      this.modalRef.hide();
    }, err => {

      if (err.error.ModelState.$id == "2") {
        this.toastr.error('Password must contain at least one uppercase ,lowercase ,special character and number.');
        //this.modalRef = this.modalService.show(template,this.ngbModalOptions);
      }
      else {
        this.toastr.error(err.error.Message);
      }
      //this.modalRef =this.modalService.show(template);
      this.loaderService.Stop();
    });
    //this.modalRef.hide();
  }

  getUserList() {
    this.loaderService.Start();
    this.userlistdata = [];
    this.userservice.getUserlist().subscribe(res => {
      this.userlistdata = res.body.data.UsersList;
      this.dataSource = new MatTableDataSource(this.userlistdata);
      this.dataSource.sort = this.sort;
      this.loaderService.Stop();
      debugger;
    }, err => {
        this.toastr.error(err.error);
        this.loaderService.Stop();
      });

  }

  Showpopup(template: TemplateRef<any>) {
    
    this.setInititalformdata();
    this.modalRef = this.modalService.show(template,this.ngbModalOptions);
  }

  editUser(template: TemplateRef<any>, data) {
    debugger;
    this.loaderService.Start();
    this.userForm = this.fb.group({
      'UserId': [data.UserId],
      'FirstName': [data.FirstName, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(20)])],
      'LastName': [data.LastName],
      'Email': [data.Email, Validators.email],
      'PhoneNumber': [data.PhoneNumber, Validators.required],
      'Password': [data.Password, Validators.compose([Validators.required,CustomvalidatorsComponent.ConfirmPassword, Validators.minLength(6), Validators.maxLength(20)])],
      'ConfirmPassword': [data.ConfirmPassword, Validators.compose([Validators.required,CustomvalidatorsComponent.ConfirmPassword, Validators.minLength(6), Validators.maxLength(20)])],
      // 'ConfirmPassword': [data.Password, Validators.compose([CustomValidation.ComparePassword, Validators.required, Validators.minLength(6), Validators.maxLength(20)])],     
      // 'Status': [null]
    });
    this.modalRef = this.modalService.show(template, this.ngbModalOptions);
    this.loaderService.Stop();
  }

  hidePopup() {
    this.hideform = false;
    this.modalRef.hide();
  }

  goBack()
  {
    this.location.back();
  }

}
