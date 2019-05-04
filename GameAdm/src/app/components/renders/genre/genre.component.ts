import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { map } from 'rxjs/operators';

import { GenresService } from '../../../services/genres.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { Genre } from 'src/app/models/genres.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  @Input() key: string;
  obj: Genre = new Genre();


  constructor(private service: GenresService, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getJSON().subscribe(data => {
      this.obj = data.Genres[this.key];
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
