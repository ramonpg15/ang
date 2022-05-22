import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar
import { CrudService } from 'src/app/servicio/crud.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { question } from "../../clases/question"

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  forma!:FormGroup
  id = new FormControl('');
  pre1 = new FormControl('');
  res1 = new FormControl('');
  res2 = new FormControl('');
  res3 = new FormControl('');
  idQuestion:any = []
  auctionsFindSpecificSaleArr:any = [];
  question = new question(0,'','','','');
 

  constructor(private crudservice:CrudService, private route: ActivatedRoute, private router:Router, private params: ActivatedRoute) { }


  ngOnInit(): void {
    console.log("{{");
    console.log(this.params.snapshot.paramMap.get('id'));
    console.log("}}");

    
    this.idQuestion = this.route.snapshot.paramMap.get("id");

    
    this.crudservice.consultSpecificQuestion(this.idQuestion).subscribe( resultado_recibe =>
      {
      console.log("----------------");
      console.log(resultado_recibe);
      this.auctionsFindSpecificSaleArr = resultado_recibe;
      //console.log("************************************");
      console.log(this.auctionsFindSpecificSaleArr[0]);
      //this.id.setValue(this.auctionsFindSpecificSaleArr[0]["id_question"]);
      this.question.id = this.auctionsFindSpecificSaleArr[0]["id_question"];
      this.question.question = this.auctionsFindSpecificSaleArr[0]["question_200"];
      this.question.res1 = this.auctionsFindSpecificSaleArr[0]["answer1_200"];
      this.question.res2 = this.auctionsFindSpecificSaleArr[0]["answer2_200"];
      this.question.res3 = this.auctionsFindSpecificSaleArr[0]["answer3_200"];
      
      
    });
    

    
    //console.log("MAS" + this.idQuestion);
  }

  id_Q1:any = [];
  pre_M1:any = [];
  res_M1:any = [];
  res_M2:any = [];
  res_M3:any = [];

  showModal(){
    //console.log("MODIFICAR");
    //console.log(this.question);
    this.crudservice.Update_Question(this.question).subscribe(
      resultado_update=>{
        //console.log ("------------");
        //console.log(resultado);

        
      if(resultado_update['update']){
          //console.log( "modificado ok");
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Modificado',
            showConfirmButton: false,
            timer: 1500
          });
      }
      else{
        //console.log("ERROR MODIFICA");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'No se pudo modificar',
          showConfirmButton: false,
          timer: 1500
        });
      }
      
      }
    );
    


    //this.route.navigate(['/menu_admin',  ]);
    this.router.navigate(['/menu_admin',  ]);
  }   
}
