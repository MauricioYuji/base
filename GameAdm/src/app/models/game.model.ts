export class Game {
  key: string;
  name: string;
  img: string;
  keyconsole: string[];
  state: false;

  constructor(obj: Game) {
    this.key = obj.key === undefined ? "" : obj.key;
    this.name = obj.name === undefined ? "" : obj.name;
    this.img = obj.img === undefined ? "" : obj.img;
    this.keyconsole = obj.keyconsole === undefined ? [] : obj.keyconsole;
  }
}
