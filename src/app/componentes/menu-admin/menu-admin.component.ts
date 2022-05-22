import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from 'src/app/servicio/crud.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { question } from 'src/app/clases/question';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit, OnDestroy {
  auctionsFindSpecificSaleArr: any = [];

  id_e: string = '';
  private clienteapi: Subscription = new Subscription;

  constructor(private crudservice: CrudService, private router: Router, private ar: ActivatedRoute, private fb: FormBuilder) { }
  llega: string = '';
  ngOnInit(): void {
    this.llega = "normal";
    /*  this.tabla(this.llega); */
    this.tabla(this.llega)

  }
  ngOnDestroy(): void {
    //this.clienteapi.unsubscribe();
  }

  tabla(llega: any) {
    this.auctionsFindSpecificSaleArr = [];
    console.log("tabla antes de subscribe");
    console.log(this.auctionsFindSpecificSaleArr);
    /*  this.clienteapi = this.crudservice.consultAll_Questions().subscribe((resultado_tabla: any) => {
       console.log("tabla_" + l);
       console.log("tabla despues de subscribe");
       console.log(this.auctionsFindSpecificSaleArr);
       console.log("pega");
       this.auctionsFindSpecificSaleArr = resultado_tabla;
       console.log(this.auctionsFindSpecificSaleArr);
     }); */
    this.crudservice.consultAll_Questions().subscribe(response => {
      console.log(response);
      this.auctionsFindSpecificSaleArr = response
      /**
       * Aqui faltaba asignar la respuesta del servico al arreglo que se declaro, por eso no se actualizaba
       * del lado del html, no es necesario recibir un argumento en esta funcion, ya que no esta haciendo nada
       */
    })

  }


  doDelete() {
    console.log("<<ENTRA BORRADO>>");
    //console.log(Forma.value);
    //console.log("**********");
    // this.id_e = Forma.value["id"];
    this.id_e = this.ar.snapshot.params['id']

    console.log(this.id_e);

    //console.log(Forma.value["id"]);
    this.crudservice.deletequestion(this.id_e).subscribe(
      resultado => {
        if (resultado['delete']) {
          this.llega = "delete";
          this.clienteapi.unsubscribe();
          /*    this.tabla(this.llega); */
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Borrado',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else {
          //console.log("ERROR MODIFICA");
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'No se pudo borrar',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );

  }

  doUpdate(Forma: NgForm) {
    console.log("<<ENTRA MODIFICAR>>");
    this.id_e = Forma.value["id"];
    console.log(Forma.value["id"]);

   /*  const QUESTION: question = {
      question: Forma.value.question,
      res2: Forma.value.pre2,
      res1: Forma.value.pre1,
      res3: Forma.value.pre3

    } */
   /*  this.crudservice.Update_Question(QUESTION).subscribe(response => {
      console.log(response);
      this.tabla(this.llega)
    }) */
    
    this.router.navigate(['/equestion/', this.id_e]);
    this.tabla(this.llega)
    /**
     * Aqui es la parte de la actualización a la hora de dar click en el boton de update
     * se manda a llamar este metodo, de cierta manera si cargan los datos que estaban para poder editarlos
     * el problema es que carga una version anterior de la data, habra que ver como capturar el id, al momento de 
     * hacer click en update para que con ese id cargemos los datos en el formulario de nuevo
     */
  }


  
  /* forma!: FormGroup
  crearFormulario() {
    this.forma = this.fb.group({
      question: ['', Validators.required],
      pre1: ['', Validators.required],
      pre2: ['', Validators.required],
      pre3: ['', Validators.required]
    })
  } */

}
