import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { CompaniesService } from '../../../services/companies.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { Company } from 'src/app/models/companies.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'pick-company',
  templateUrl: './pick-company.component.html',
  styleUrls: ['./pick-company.component.scss']
})
export class PickCompanyComponent implements OnInit {
  public companies: Company[];
  @Input() selectedkey: string;
  @Output() submitted = new EventEmitter();


  constructor(private service: CompaniesService, private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getAll().subscribe(p => {
      this.companies = p;
    });

  }
  emitid(id) {
    this.selectedkey = id;
    this.submitted.emit(id);
  }
}
