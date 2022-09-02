import { Injectable } from '@angular/core';
import { Pessoa } from 'src/app/shared/models/pessoa.model';
const LS_CHAVE: string = "pessoas";

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor() { }

  listarTodos(): Pessoa[] {
    const pessoas = localStorage[LS_CHAVE];
    return pessoas ? JSON.parse(pessoas) : [];
  }

  inserir(pessoa: Pessoa): void {
    const pessoas = this.listarTodos();
    pessoa.id = new Date().getTime();
    this.calcular(pessoa)
    pessoas.push(pessoa);
    localStorage[LS_CHAVE] = JSON.stringify(pessoas)

  }

  buscarPorId(id: number): Pessoa | void {
    const pessoas: Pessoa[] = this.listarTodos();
    return pessoas.find(pessoa => pessoa.id === id);

  }

  remover(id: number): void {
    let pessoas: Pessoa[] = this.listarTodos();
    pessoas = pessoas.filter(pessoa => pessoa.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(pessoas)
  }

  exportar(): void {
    const pessoas = localStorage[LS_CHAVE];
    const ui = JSON.stringify(pessoas)
    console.log(ui)
    const winHtml = `<!DOCTYPE html>
    <html>
        <head>
            <title>Window with Blob</title>
        </head>
        <body>` + ui + `
            
        </body>
    </html>`;

    const winUrl = URL.createObjectURL(
      new Blob([winHtml], { type: "text/html" })
  );
  
  const win = window.open(
      winUrl,
      "win",
      `width=800,height=400,screenX=200,screenY=200`
  );
  }

  calcular(pessoa: Pessoa): void {
    const current = new Date().getFullYear();
    const ar = Number(pessoa.dataNascimento?.substring(0, 4))
    pessoa.idade = (current - ar);

  }
}

