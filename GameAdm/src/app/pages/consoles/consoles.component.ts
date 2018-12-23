import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ConsolesService } from '../../services/consoles.service';
import { Observable } from 'rxjs';
import { Console } from '../../models/consoles.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consoles',
  templateUrl: './consoles.component.html',
  styleUrls: ['./consoles.component.scss']
})
export class ConsolesComponent implements OnInit {
  public consoles: Observable<Console[]>;
  model: FormGroup;
  search = '';

  constructor(private modalService: NgbModal, private consolesService: ConsolesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.consoles = this.consolesService.getConsoles();

    this.consolesService.getConsoles().subscribe(p => {
      console.log("p: ", p);
    });
    console.log("this.consoles: ", this.consoles);
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

    this.consolesService.insertConsole(this.model.value.name);
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
