import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { imagesService } from '../../services/imagesService';
import { ImageModel } from '../../models/image.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {
  title = 'GameAdm 2';
  closeResult: string;
  public images = [];
  public newimages = [];
  public img = "";
  public imgoriginal = "";
  constructor(private modalService: NgbModal, private service: imagesService) { }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  confirm() {
    this.modalService.dismissAll("Confirm");
    console.log("Confirm");
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
  ngOnInit() {
    var _self = this;
    this.service.getAll(1, 500).subscribe(p => {
      p.List.map((item) => this.performSomething(item));

      console.log(" this.images: ", this.images);
      for (var item in this.images) {
        var obj: any = this.images[item];
        //this.imgoriginal = obj.img;
        //console.log("obj: ", obj);

        this.loadImg(obj);
      }
    });
  }
  loadImg(obj) {
    var _self = this;
    var image = new Image();
    image.onload = function () {
      var img: any = this;
      //console.log(this.width + 'x' + this.height);
      _self.compressbase64(obj.img, img.width, img.height, obj.name, obj._id);

      //_self.compressbase64(obj.img, img.width, img.height, obj.name, obj._id).then(p => {
      //  console.log("p: ", p);
      //  var objimg = new ImageModel({ name: name, img: p, _id: obj.id, width: obj.width, height: obj.height });
      //  console.log("objimg: ", objimg);
      //  _self.newimages.push(objimg);
      //});

    }
    //console.log(" obj.img: ", obj.img);
    image.src = obj.img;
  }
  getBase64(file) {
    var _self = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //console.log(reader.result);
      _self.img = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  compressbase64(base, w, h, name, id) {
    var _self = this;

    //console.log(w + 'x' + h);
    var extension = undefined;
    // do something like this
    var lowerCase = base.toLowerCase();
    if (lowerCase.indexOf("png") !== -1) extension = "png"
    else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
      extension = "jpg"
    else extension = "tiff";

    const width = w;
    const height = h;
    const img = new Image();
    img.src = base;
    img.onload = () => {

      var newW = 600;
      var newH = 600 / width * height;

      const elem = document.createElement('canvas');
      elem.width = newW;
      elem.height = newH;
      const ctx = elem.getContext('2d');
      // img.width and img.height will contain the original dimensions
      ctx.drawImage(img, 0, 0, newW, newH);
      ctx.canvas.toBlob((blob) => {
        const file = new File([blob], name + "." + extension, {
          type: 'image/' + extension,
          lastModified: Date.now()
        });

        //console.log("file: ", file);

      }, 'image/' + extension, 0.7);


      var objimg = new ImageModel({ name: name, img: ctx.canvas.toDataURL("image/jpeg", 0.7), _id: id, width: newW, height: newH });
      //console.log("objimg: ", objimg);
      //this.newimages.push(objimg);
      //console.log(id);

      //if (width > 600) {

      //this.service.update(id, objimg).subscribe(p => {
      //  console.log("p: ", p);
      //});
      //}

      //return new Observable(o => o.next(ctx.canvas.toDataURL("image/jpeg", 0.7))
      
      //return ctx.canvas.toDataURL("image/jpeg", 0.7);
      //this.img = ;
      //_self.getBase64(file);
    };
  }
  performSomething(item) {

    //if (item.img != undefined && item.img != "")
    //  item.img = JSON.parse(item.img);

    //console.log("item: ", item);
    this.images.push(item);
  };
}
