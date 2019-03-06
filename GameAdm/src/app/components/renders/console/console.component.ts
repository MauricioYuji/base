import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';

import { ConsolesService } from '../../../services/consoles.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { Console } from 'src/app/models/consoles.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  @Input() key: string;
  obj: Console = new Console();


  constructor(private service: ConsolesService, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getJSON().subscribe(data => {
      this.obj = data.Consoles[this.key];
      //console.log("this.obj: ", this.obj);
    });
    //console.log("this.key: ", this.key);
    //this.service.getbykey(this.key).subscribe(p => {
    //  this.obj = p;
    //  //console.log("p ", p);
    //});
  }

  public getJSON(): Observable<any> {
    return this.http.get("./src/app/helpers/consoles.json")
  }
  //ngOnChanges(changes: SimpleChanges) {
  //  // only run when property "data" changed
  //  if (changes['key']) {
  //    this.service.getbykey(this.key).subscribe(p => {
  //      this.obj = p;
  //      console.log("this.obj: ", this.obj);
  //    });
  //  }
  //}
}
