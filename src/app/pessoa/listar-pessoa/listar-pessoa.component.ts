import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
import { PessoaService } from '../services/pessoa.service';



@Component({
  selector: 'app-listar-pessoa',
  templateUrl: './listar-pessoa.component.html',
  styleUrls: ['./listar-pessoa.component.css']
})
export class ListarPessoaComponent implements OnInit {
  pessoas: Pessoa[] = [];
  @ViewChild("formPessoa") formPessoa!: NgForm;
  pessoa!: Pessoa;
  data: any;
  formGroup: FormGroup;
  orderHeader: String = "";
  isDescOrder: boolean = true;
  orderBy!: any;
 

  constructor(private pessoaService: PessoaService, private formbuilder: FormBuilder) { 
    this.formGroup = this.formbuilder.group({
      dataNascimento: ["", Validators.pattern('[a-zA-Z ]*')],
    })
  }

  ngOnInit(): void {
    this.pessoas = this.listarTodos();
    this.pessoa = new Pessoa();
  }

  inserir(): void {
    if (this.formPessoa.form.valid) {
      this.pessoaService.inserir(this.pessoa)
      location.reload();
    }
  }

  voltar(): void {
    location.reload();
  }

  listarTodos(): Pessoa[] {
    return this.pessoaService.listarTodos();
  }

  remover($event: any, pessoa: Pessoa): void {
    $event.preventDefault();
    if (confirm("Deseja realmente remover a pessoa selecionada?")) {
      this.pessoaService.remover(pessoa.id!);
      this.pessoas = this.listarTodos();
    }
  }

  limpar(): void {
    if (confirm("Deseja limpar os dados da tabela?")) {
      localStorage.clear();
      location.reload();
    }
  }

 exportar(): void {
  this.pessoaService.exportar();
 }

 calcular(): void {
  const current = new Date().getFullYear();
  const ar = Number(this.pessoa.dataNascimento?.substring(0,4))
  this.pessoa.idade = (current - ar);
  this.pessoa.idade
 }
  
}




