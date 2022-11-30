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

  id:number = 0;
  nome:string = '';
  departamento:string = '';
  endereco:string = '';
  email:string = '';

  alerta:string = '';

  formulario = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    departamento: new FormControl(),
    endereco: new FormControl(),
    email: new FormControl()
  });

  ngOnInit() {
    this.selecionarTudo();
  }

  testarFormulario():void {
    console.log(this.formulario.value);
  }

  alterar():void {
    let f = new Funcionario;

    if (this.formulario.value.id == null) {
      this.formulario.value.id = this.id;
    }
    if (this.formulario.value.nome == null) {
      this.formulario.value.nome = this.nome;
    }
    if (this.formulario.value.departamento == null) {
      this.formulario.value.departamento = this.departamento;
    }
    if (this.formulario.value.endereco == null) {
      this.formulario.value.endereco = this.endereco;
    }
    if (this.formulario.value.email == null) {
      this.formulario.value.email = this.email;
    }

    f.id = this.formulario.value.id;
    f.nome = this.formulario.value.nome;
    f.departamento = this.formulario.value.departamento;
    f.endereco = this.formulario.value.endereco;
    f.email = this.formulario.value.email;

    console.log(f.id);
    console.log(f.nome);

    this.servico.alterar(f.id, f)
    .subscribe(retorno => {
      let obj;
      
      for (let i = 0; i < this.vetor.length; i++) {
        if (this.vetor[i].id == f.id) {
          obj = this.vetor[i];

          obj.id = f.id;
          obj.nome = f.nome;
          obj.departamento = f.departamento;
          obj.endereco = f.endereco;
          obj.email = f.email;

          break;

        }
      }

      let dados = JSON.stringify(retorno);

      let json = JSON.parse(dados);

      document.getElementById('alerta')?.classList.remove('alert-danger');
      document.getElementById('alerta')?.classList.add('alert-success');
      this.alerta = json.status + ' - ' + json.mensagem;

      this.formulario.reset;

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

        if (json.status == 'Ok') {
          document.getElementById('alerta')?.classList.remove('alert-danger');
          document.getElementById('alerta')?.classList.add('alert-success');
          this.alerta = json.status + ' - ' + json.mensagem;
          this.vetor.splice(pesquisaId, 1);
        }
        else {
          document.getElementById('alerta')?.classList.remove('alert-success');
          document.getElementById('alerta')?.classList.add('alert-danger');
          this.alerta = json.status + ' - ' + json.mensagem;
        }

      })

    }

  }

  selecionarTudo():void {
    this.servico.selecionar()
    .subscribe({
      next: retorno => this.vetor = retorno
    });
  }

  selecionarFuncionario(id:number):void {
    let obj;

    for (let i = 0; i < this.vetor.length; i++) {
      if (this.vetor[i].id == id) {
        obj = this.vetor[i];

        this.id = obj.id;
        this.nome = obj.nome;
        this.departamento = obj.departamento;
        this.endereco = obj.endereco;
        this.email = obj.email;

        this.formulario.value.id = this.id;
        this.formulario.value.nome = this.nome;
        this.formulario.value.departamento = this.departamento;
        this.formulario.value.endereco = this.endereco;
        this.formulario.value.email = this.email;

        console.log(this);
        console.log(this.formulario.value);

        this.formulario.reset;
        
      }
    }

  }

}
