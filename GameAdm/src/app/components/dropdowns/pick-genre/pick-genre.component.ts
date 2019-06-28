import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { GenresService } from '../../../services/genres.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";
import { AngularFireList } from 'angularfire2/database';
import { Genre } from 'src/app/models/genres.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'pick-genre',
  templateUrl: './pick-genre.component.html',
  styleUrls: ['./pick-genre.component.scss']
})
export class PickGenreComponent implements OnInit {
  category: any = "";
  public genres: Genre[];
  public genre: string;
  @Input() selectedkey: string;
  @Output() submitted = new EventEmitter();


  constructor(private service: GenresService, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.getJSON().subscribe(data => {
      //console.log("data: ", data);
      var result = Object.keys(data.Genres).map(function (key) {
        data.Genres[key].key = key;
        return data.Genres[key];
      });
      this.genres = result;
      //genre.log("this.genres: ", this.genres);
    });
    //this.service.getAll().subscribe(p => {
    //  this.genres = p;
    //});

  }

  public getJSON(): Observable<any> {
    return this.http.get("./src/app/helpers/consoles.json")
  }
  emitid(event) {
    //const id = event.target.value;
    ////genre.log(id);
    //this.selectedkey = id;
    this.submitted.emit(this.genre);
    this.genre = "";
  }
}
