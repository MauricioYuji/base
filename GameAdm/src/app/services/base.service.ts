import { Injectable } from '@angular/core';
import { Headers, Http, Response, ResponseContentType } from '@angular/http';
import * as moment from 'moment';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable()
export class BaseService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  private readonly jwtheader = 'jwtsession';

  public eventError: Subject<Response> = new Subject<Response>();

  constructor(private http: Http, private router: Router, ) { }

  public get token(): string {
    const val = JSON.parse(sessionStorage.getItem('user'));
    //console.log("val:", val.token);
    //const val = 'bW9iaWxlOnNlY3JldA==';
    var token = "";
    if (val != null) {
      token = val.token;
    }
    return token;
  }
  public set token(val: string) {
    sessionStorage.setItem('token', val);
  }

  private dateTimeParser(key: any, value: any): any {
    const regex = /^(dt_)/g;
    if (typeof value === 'string' && regex.test(key)) {
      const dtMoment = moment.utc(value);
      if (dtMoment.isValid()) {
        return dtMoment.toDate();
      }
    }
    return value;
  }

  private handleError(error: Response | any): Observable<any> {
    console.log("ERROR: ", error);
    if (error instanceof Response) {
      // se o token veio no header busca o token
      if (error.headers.has(this.jwtheader)) {
        this.token = error.headers.get(this.jwtheader);
      }

      sessionStorage.removeItem('user');
      this.router.navigate(['/']);
      this.eventError.next(error);
      //return new Observable(o => o.next(false));
      //return Observable.throw(error);
      return throwError(error);
    }


    //return null;
  }

  private handleResponse(resp: Response): any {
    //console.log("SUCESSO: ", resp);
    // se o token veio no header busca o token
    if (resp.headers.has(this.jwtheader)) {
      this.token = resp.headers.get(this.jwtheader);
    }
    return JSON.parse(resp.text() || '{}', this.dateTimeParser);
  }

  get(url: string): Observable<any> {
    const hd: Headers = this.headers;
    if (this.token) {
      hd.set('Authorization', 'Bearer ' + this.token);
    }
    hd.set('Content-Type', 'application/json');
    hd.set('Accept', 'application/json');
    hd.set('Access-Control-Allow-Headers', 'Content-Type');
    hd.set('Access-Control-Allow-Origin', '*');
    
    return this.http.get(url, { headers: hd })
      .pipe(map((resp) => this.handleResponse(resp)))
      .pipe(catchError((error) => this.handleError(error)));
  }

  post(url: string, data: any, removeContentType = false): Observable<any> {
    const hd: Headers = this.headers;
    if (this.token) {
      hd.set('Authorization', 'Bearer ' + this.token);
    }
    hd.set('Content-Type', 'application/json');
    hd.set('Accept', 'application/json');
    hd.set('Access-Control-Allow-Headers', 'Content-Type');
    hd.set('Access-Control-Allow-Origin', '*');

    //if (removeContentType)
    //  hd.delete("content-type");

    return this.http.post(url, data, { headers: hd })
      .pipe(map((resp) => this.handleResponse(resp)))
      .pipe(catchError((error) => this.handleError(error)));
  }

  put(url: string, data: any): Observable<any> {
    const hd: Headers = this.headers;
    if (this.token) {
      hd.set('Authorization', 'Bearer ' + this.token);
    }
    hd.set('Content-Type', 'application/json');
    hd.set('Accept', 'application/json');
    hd.set('Access-Control-Allow-Headers', 'Content-Type');
    hd.set('Access-Control-Allow-Origin', '*');

    return this.http.put(url, data, { headers: hd })
      .pipe(map((resp) => this.handleResponse(resp)))
      .pipe(catchError((error) => this.handleError(error)));
  }

  delete(url: string): Observable<any> {
    const hd: Headers = this.headers;
    if (this.token) {
      hd.set('Authorization', 'Bearer ' + this.token);
    }
    hd.set('Content-Type', 'application/json');
    hd.set('Accept', 'application/json');
    hd.set('Access-Control-Allow-Headers', 'Content-Type');
    hd.set('Access-Control-Allow-Origin', '*');

    return this.http.delete(url, { headers: hd })
      .pipe(map((resp) => this.handleResponse(resp)))
      .pipe(catchError((error) => this.handleError(error)));
  }

  download(url: string, data: any, strType: string): Observable<Blob> {
    const hd: Headers = this.headers;

    if (this.token) {
      hd.set('Authorization', this.token);
    }

    return this.http.post(url, data, { headers: hd, responseType: ResponseContentType.Blob })
      .pipe(map((resp) => resp.blob()))
      .pipe(catchError((error) => this.handleError(error)));
  }

  private downloadFile(data: Response, strType: string): Blob {
    // const blob = data.blob();
    // blob.type = strType;
    const blob = new Blob([data], { type: strType });
    return blob;
  }
}
