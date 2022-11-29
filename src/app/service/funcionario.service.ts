import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Funcionario } from '../model/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http:HttpClient) { }

  selecionar() {
    return this.http.get<Funcionario[]>('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro');
  }

  remover(id:number) {
    return this.http.delete('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/' + id);
  }

  alterar(id:number, f:Funcionario) {
    return this.http.put<Funcionario>('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/' + id, f);
  }

}
