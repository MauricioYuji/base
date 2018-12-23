import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesService } from '../../services/companies.service';
import { Observable } from 'rxjs';
import { Company } from '../../models/companies.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  public companies: Observable<Company[]>;
  model: FormGroup;
  search = '';

  constructor(private modalService: NgbModal, private companiesService: CompaniesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.companies = this.companiesService.getCompanies();
    this.model = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
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
      return;
    }

    var obj = JSON.stringify(this.model.value);
    console.log('SUCCESS!! :-)\n\n' + obj)

    this.companiesService.insertConsole(this.model.value.name);
    this.modalService.dismissAll();
  }

  changefilter() {
    console.log("this.search: ", this.search);
    //var regex = new RegExp(this.search.toLowerCase(), 'g');
    //this.games = this.service.getgames().pipe(
    //  map(a => a.filter(
    //    function (item) {
    //      var match = false;
    //      match = item.nome.toLowerCase().match(regex) != null;
    //      console.log(item);
    //      for (var i = 0; i < item.categorias.length; i++) {
    //        match = (item.categorias[i].toLowerCase().match(regex) != null || match)
    //      }
    //      if (match) {
    //        return true;
    //      }

    //    }
    //  ))
    //);
  }

}
