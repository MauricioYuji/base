export class FileUpload {

  key: string;
  name: string;
  url: string;
  file: File;
  category: string

  constructor(file: File) {
    this.file = file;
  }
}
export class typeUpload {
  category: string;
  aspect: number;
  maintainAspectRatio: boolean;
}
