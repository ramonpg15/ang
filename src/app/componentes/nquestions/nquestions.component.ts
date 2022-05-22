import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { question } from "../../clases/question"

@Component({
  selector: 'app-nquestions',
  templateUrl: './nquestions.component.html',
  styleUrls: ['./nquestions.component.css']
})
export class NquestionsComponent implements OnInit {
  question = new question(0, '', '', '', '');
  preguntas: question[] = []
  constructor(private crudservice: CrudService, private router: Router, private fb: FormBuilder) {
    this.crearFormulario()
  }
  forma!: FormGroup

  ngOnInit(): void {
    this.crearFormulario()
  }
  crearFormulario() {
    this.forma = this.fb.group({
      question: ['', Validators.required],
      pre1: ['', Validators.required],
      pre2: ['', Validators.required],
      pre3: ['', Validators.required]
    })
  }

  pre1: any = [];
  res1: any = [];
  res2: any = [];
  res3: any = [];

  showModal() {
    //console.log(Forma.value);
    console.log(this.forma.value);
    //console.log(this.question);
    const QUESTION: question = {
      question: this.forma.value.question,
      res2: this.forma.value.pre2,
      res1: this.forma.value.pre1,
      res3: this.forma.value.pre3

    }
    /**
     * Esta parte es importante para agregar una pregunta mas, 
     * lo primero que se hizo es cargar o crear un objeto con las propiedades del formulario
     * del html, entonces una vez cargado el objeto mandamos a llamar la funcion del servicio 
     * que tiene el metodo pots, y mandamos como parametro el objeto que creamos, eso nos permite ver
     * en el html las preguntas completas
     */
    this.crudservice.Add_Question(QUESTION).subscribe(resultado_inserta => {
      if (resultado_inserta['insert']) {
        console.log("OK insert");
        this.preguntas = resultado_inserta
        console.log(this.preguntas);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Save',
          showConfirmButton: false,
          timer: 1500
        });


        this.router.navigate(['/menu_admin',]);
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Not Save',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    /*
    this.pre1 = Forma.value['pre1'];
    this.res1 = Forma.value['res1'];
    this.res2 = Forma.value['res2'];
    this.res3 = Forma.value['res3'];

    console.log("pregunta" + this.pre1);
    console.log("R1" + this.res1);
    //console.log("R2" + this.res2);
    //console.log("R3" + this.res3);
  
    this.crudservice.Add_Question(this.pre1, this.res1, this.res2, this.res3).subscribe( resultado =>{
      console.log(resultado);
      //this.auctionsFindSpecificSaleArr[0] = resultado;
      console.log("************************************");
      //console.log(this.auctionsFindSpecificSaleArr[0][0]["question_200"]);
    });
    


*/
  }
}
