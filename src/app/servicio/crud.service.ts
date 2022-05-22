import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Usuario } from './Usuarios';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //API3:string = 'http://localhost/ARGENTINA/PHP1/index.php';
  API3: string = 'https://masanchez.com.mx/ARGENTINA/PHP1/index.php';
  private _refresh$ = new Subject<void>();

  constructor(private clienteHttp: HttpClient) { }

  consultarUsuarios(): Observable<any> {
    return this.clienteHttp.get(this.API3);
  }

  //OK
  deletequestion(id: any): Observable<any> {
    //console.log(this.API3);
    console.log("CRUD delete-Service:" + id);
    //return 
    //return this.clienteHttp.delete(this.API3+'?id=' + id);
    //http://localhost/ARGENTINA/PHP1/index.php?id=29

    /* return this.clienteHttp.delete(this.API3 + '?id=' + id).pipe(
      tap(() => { this._refresh$.next(); })
    ); */
    return this.clienteHttp.delete(`${this.API3}/id`)
  }

  //OK
  consultaSpecific(usu: string, contra: string): Observable<any> {
    return this.clienteHttp.get(this.API3 + '?user=' + usu);
  }

  Update_Question(pregunta: any): Observable<any> {
    console.log("service update");
    return this.clienteHttp.put(`${this.API3}`, JSON.stringify(pregunta));
  }

  //OK
  consultSpecificQuestion(id: number): Observable<any> {
    return this.clienteHttp.get(this.API3 + '?id=' + id);
  }

  get refresh$() {
    return this._refresh$;
  }
  //OK
  consultAll_Questions():Observable<any> {
    /* let respuest = this.clienteHttp.get(this.API3 + '?nada=0');
    console.log(respuest);
    return respuest; */
    return this.clienteHttp.get(`${this.API3}`) // Esta parte igual se modifico, asi como lo tenias tu no hacia que pudieramos ver la parte en el html
  }

  //OK
  Add_Question(pregunta: any): Observable<any> {
    /* console.log("Service --Add");
    console.log(pregunta); */
    //https://www.youtube.com/watch?v=098HQiw8dAA
    //ENVIA nombre, ap, am, fecha, genero
    //https://www.youtube.com/watch?v=V3_e5A-jj9E  
    //  https://www.youtube.com/watch?v=zeriWHrl1fU   

    //return this.clienteHttp.post(`${this.API3}`, JSON.stringify(pregunta));

    return this.clienteHttp.post(`${this.API3}`, JSON.stringify(pregunta)).pipe(
      tap(() => { this._refresh$.next(); })
    );
  }

}
