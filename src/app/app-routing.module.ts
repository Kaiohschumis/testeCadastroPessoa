import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListarPessoaComponent } from './pessoa/listar-pessoa/listar-pessoa.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "pessoas/listar",
    pathMatch: "full"
  },
  {path: "pessoas",
  redirectTo: "pessoas/listar"},
  {path: "pessoas/listar",
  component: ListarPessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
