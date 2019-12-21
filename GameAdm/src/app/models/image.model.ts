export class ImageModel {
    [x: string]: any;
  _id: string;
  name: string;
  img: any;
  width: number;
  height: number;

  constructor(obj: ImageModel) {
    this._id = obj._id === undefined ? "" : obj._id;
    this.name = obj.name === undefined ? "" : obj.name;
    this.img = obj.img === undefined ? "" : obj.img;
    this.width = obj.width === undefined ? 0 : obj.width;
    this.height = obj.height === undefined ? 0 : obj.height;
  } 
}
