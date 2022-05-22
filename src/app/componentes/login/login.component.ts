import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudService } from 'src/app/servicio/crud.service';
import {Router}  from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  FormularioLogin:FormGroup;
  auctionsFindSpecificSaleArr:any = [];
  total:number = 0;

  constructor(public formulario:FormBuilder, private crudservice:CrudService, private router:Router) {
    this.FormularioLogin = this.formulario.group({
      login:[''],
      contra:['']
    })
   }

  ngOnInit(): void {
  }

  enviarDatos():any{
    //console.log("------------------------");
    //console.log(this.FormularioLogin.value['login']);
    //console.log(this.FormularioLogin.value['contra']);

    if ((this.FormularioLogin.value['login']) != ''){
    //this.crudservice.consultaSpecific('manuel', 'alejandro').subscribe();
    this.crudservice.consultaSpecific(this.FormularioLogin.value['login'], this.FormularioLogin.value['contra']).subscribe( resultado =>{
      //console.log("entra");
      //console.log(resultado);
      this.auctionsFindSpecificSaleArr = resultado;

      //console.log("LEN" + this.auctionsFindSpecificSaleArr.length);
      this.total = this.auctionsFindSpecificSaleArr.length;

      if (this.total > 0){
          if(this.auctionsFindSpecificSaleArr[0]['rol_10'] == 'ADMIN'){
            this.router.navigate(['/menu_admin',  ]);

          }else{
            //this.router.navigate(['/searchspecificauctioncomponent',  ]);
        
          }
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Verificar el usuario y contraseña, ya que no existe',
          showConfirmButton: false,
          timer: 1500
        });

        this.FormularioLogin.reset();   //LIMPIAR CAMPOS
      }
    });
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Debe diginar el usuario y contraseña',
        showConfirmButton: false,
        timer: 1500
      });
  
    }
    /*
    this.crudservice.consultarUsuarios().subscribe(auctionfindSpecificDB => {
      console.log("Otro");
      console.log(auctionfindSpecificDB);
      }
      );
      */
  }
}

//https://www.youtube.com/watch?v=ATn_Ds1zzOU