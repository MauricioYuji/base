import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConsolesService } from '../../../services/consoles.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { Console } from 'src/app/models/consoles.model';
import { Companies, Consoles } from 'src/app/helpers/enums';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'pick-console',
  templateUrl: './pick-console.component.html',
  styleUrls: ['./pick-console.component.scss']
})
export class PickConsoleComponent implements OnInit {
  category: any = "";
  public consoles: Console[];
  @Input() selectedkey: string;
  @Output() submitted = new EventEmitter();


  constructor(private service: ConsolesService, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getJSON().subscribe(data => {
      //console.log("data: ", data);
      var result = Object.keys(data.Consoles).map(function (key) {
        data.Consoles[key].key = key;
        return data.Consoles[key];
      });
      this.consoles = result;
      //console.log("this.consoles: ", this.consoles);
    });
    //this.service.getAll().subscribe(p => {
    //  this.consoles = p;
    //});

  }

  public getJSON(): Observable<any> {
    return this.http.get("./src/app/helpers/consoles.json")
  }
  emitid(event) {
    const id = event.target.value;
    //console.log(id);
    this.selectedkey = id;
    this.submitted.emit(id);
  }
}
