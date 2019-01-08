import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConsolesService } from '../../services/consoles.service';
import { Observable } from 'rxjs';
import { Console } from '../../models/consoles.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-consoles',
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.scss']
})
export class ConsolesComponent implements OnInit {
  public consoles: Console[];
  public model: FormGroup;
  public search = '';
  @ViewChild('content') content: ElementRef;
  @ViewChild('confirm') confirm: ElementRef;

  constructor(private modalService: NgbModal, private consolesService: ConsolesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.consolesService.getAll().subscribe(p => {
      this.consoles = p;
    });
    this.model = this.formBuilder.group({
      key: [],
      name: ['', [Validators.required]],
      keycompany: ['', [Validators.required]]
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.model.setValue({ name: "", keycompany: "", key: null });
    }, (reason) => {
      this.model.setValue({ name: "", keycompany: "", key: null });
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
    
    var obj = new Console();
    obj.key = this.model.value.key;
    obj.name = this.model.value.name;
    obj.keycompany = this.model.value.keycompany;

    if (obj.key == null || obj.key == "") {
      this.consolesService.insert(obj);
    } else {
      this.consolesService.update(obj.key, obj);
    }

    this.modalService.dismissAll();
  }

  changefilter() {
    var regex = new RegExp(this.search.toLowerCase(), 'g');
    this.consolesService.getAll().pipe(
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
      this.consoles = p;
    });
  }
  deleteitem(key) {
    this.consolesService.delete(key);
    this.modalService.dismissAll("Confirm");
  }
  private setedit(key: string) {
    var obj = this.consoles.filter(p => p.key == key)[0];
    this.model.setValue({ name: obj.name, keycompany: obj.keycompany, key: key });
    this.open(this.content);
  }
  private progressreturn(obj) {
    this.model.setValue({ name: this.model.value.name, keycompany: obj, key: this.model.value.key });

  }
  private confirmdelete(key: string) {
    var obj = this.consoles.filter(p => p.key == key)[0];
    this.model.setValue({ name: obj.name, keycompany: obj.keycompany, key: key });
    this.open(this.confirm);
  }
}
