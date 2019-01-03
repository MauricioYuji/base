import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { Observable } from 'rxjs';
import { Company } from '../../models/companies.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public companies: Company[];
  public model: FormGroup;
  public search = '';
  @ViewChild('content') content: ElementRef;
  @ViewChild('confirm') confirm: ElementRef;

  constructor(private modalService: NgbModal, private companiesService: CompaniesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.companiesService.getAll().subscribe(p => {
      this.companies = p;
    });
    this.model = this.formBuilder.group({
      key: [],
      name: ['', [Validators.required]],
      img: ['', [Validators.required]]
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.model.setValue({ name: "", img: "", key: "" });
    }, (reason) => {
      this.model.setValue({ name: "", img: "", key: "" });
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    if (this.model.invalid) {
      //console.log("MODEL INVALIDA: ", this.model);
      return;
    }

    var objstring = JSON.stringify(this.model.value);
    //console.log('SUCCESS!! :-)\n\n' + objstring);
    var obj = new Company();
    obj.key = this.model.value.key;
    obj.name = this.model.value.name;
    obj.img = this.model.value.img;

    if (obj.key == null) {
      this.companiesService.insert(obj);
    } else {
      this.companiesService.update(obj.key, obj);
    }

    this.modalService.dismissAll();
  }

  changefilter() {
    //console.log("this.search: ", this.search);
    var regex = new RegExp(this.search.toLowerCase(), 'g');
    this.companiesService.getAll().pipe(
      map(a => a.filter(
        function (item) {
          var match = false;
          match = item.name.toLowerCase().match(regex) != null;
          if (match) {
            return true;
          }

        }
      ))
    ).subscribe(p => {
      this.companies = p;
    });
  }
  deleteitem(key) {
    //console.log("DELETE: ", key);
    this.companiesService.delete(key);
    this.modalService.dismissAll("Confirm");
  }
  private setedit(key: string) {
    var obj = this.companies.filter(p => p.key == key)[0];
    this.model.setValue({ name: obj.name, img: obj.img, key: key });
    this.open(this.content);
  }
  private progressreturn(obj) {
    //console.log("this.model: ", this.model);
    this.model.setValue({ name: this.model.value.name, img: obj, key: this.model.value.key })

  }
  private confirmdelete(key: string) {
    var obj = this.companies.filter(p => p.key == key)[0];
    this.model.setValue({ name: obj.name, img: obj.img, key: key });
    this.open(this.confirm);
  }
}
