export class Game {
  _id: string;
  name: string;
  img: any;
  keyconsole: string[];
  keygenre: string[];

  constructor(obj: Game) {
    this._id = obj._id === undefined ? "" : obj._id;
    this.name = obj.name === undefined ? "" : obj.name;
    this.img = obj.img === undefined ? "" : obj.img;
    this.keyconsole = obj.keyconsole === undefined ? [] : obj.keyconsole;
    this.keygenre = obj.keygenre === undefined ? [] : obj.keygenre;
  } 
}
export class GameModel {
  List: Game[];
  Total: number;
}
