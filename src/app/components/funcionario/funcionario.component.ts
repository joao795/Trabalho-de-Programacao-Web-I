import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Funcionario } from '../../model/Funcionario';
import { FuncionarioService } from '../../service/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent {

  constructor(private servico:FuncionarioService) {}

  vetor:Funcionario[] = [];

  formulario = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    departamento: new FormControl(),
    endereco: new FormControl(),
    email: new FormControl()
  });

  ngOnInit() {
    this.selecionar();
  }

  testarFormulario():void {
    console.log(this.formulario.value);
  }

  alterar():void {
    let f = new Funcionario;

    f.id = this.formulario.value.id;
    f.nome = this.formulario.value.nome;
    f.departamento = this.formulario.value.departamento;
    f.endereco = this.formulario.value.endereco;
    f.email = this.formulario.value.email;

    this.servico.alterar(f.id, f)
    .subscribe(retorno => {
      this.vetor[f.id - 1].id = f.id;
      this.vetor[f.id - 1].nome = f.nome;
      this.vetor[f.id - 1].departamento = f.departamento;
      this.vetor[f.id - 1].endereco = f.endereco;
      this.vetor[f.id - 1].email = f.email;

      let dados = JSON.stringify(retorno);

      let json = JSON.parse(dados);

      alert('Status: ' + json.status + '\nMensagem: ' + json.mensagem);

      this.formulario.reset();
    });

  }

  remover(id:number):void {

    let resposta = confirm('Você tem certeza de que quer remover esse funcionário? (●´⌓`●)')

    if (resposta) {
      this.servico.remover(id)
      .subscribe(retorno => {
        let pesquisaId = this.vetor.findIndex(obj => {return obj.id === id});

        let dados = JSON.stringify(retorno);

        let json = JSON.parse(dados);

        alert('Status: ' + json.status + '\nMensagem: ' + json.mensagem);

        if (json.status == 'Ok') {
          this.vetor.splice(pesquisaId, 1);
        }

      })

    }

  }

  selecionar():void {
    this.servico.selecionar()
    .subscribe({
      next: retorno => this.vetor = retorno
    });
  }

}
