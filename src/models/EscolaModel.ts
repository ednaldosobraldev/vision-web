export class EscolaModel {
  id_escola?: number;
  id_empresa?: number;
  nome_escola?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  numero?: string;
  telefone1?: string;
  telefone2?: string;
  ativo?: boolean;

  constructor(
    idEscola: number,
    idEmpresa: number,
    nomeEscola: string,
    rua: string,
    bairro: string,
    cidade: string,
    cep: string,
    numero: string,
    telefone1: string,
    telefone2: string,
    ativo: boolean
  ) {
    this.id_escola = idEscola;
    this.id_empresa = idEmpresa;
    this.nome_escola = nomeEscola;
    this.rua = rua;
    this.bairro = bairro;
    this.cidade = cidade;
    this.cep = cep;
    this.numero = numero;
    this.telefone1 = telefone1;
    this.telefone2 = telefone2;
    this.ativo = ativo;
  }

  setIdEscola(idEscola: number) {
    this.id_escola = idEscola;
  }
  setIdEmpresa(idEmpresa: number) {
    this.id_empresa = idEmpresa;
  }
  setNomeEscolha(nomeEscolha: string) {
    this.nome_escola = nomeEscolha.toUpperCase();
  }
  setRua(rua: string) {
    this.rua = rua.toUpperCase();
  }
  setBairro(bairro: string) {
    this.bairro = bairro.toUpperCase();
  }
  setCidade(cidade: string) {
    this.cidade = cidade.toUpperCase();
  }
  setCep(cep: string) {
    this.cep = cep;
  }
  setNumero(numero: string) {
    this.numero = numero;
  }
  setTelefone1(telefone1: string) {
    this.telefone1 = telefone1;
  }
  setTelefone2(telefone2: string) {
    this.telefone2 = telefone2;
  }

  getIdEscola() {
    return this.id_escola;
  }
  getIdEmpresa() {
    return this.id_empresa;
  }
  getNomeEscola() {
    return this.nome_escola;
  }
  getRua() {
    return this.rua;
  }
  getBairro() {
    return this.bairro;
  }
  getCidade() {
    return this.cidade;
  }
  getCep() {
    return this.cep;
  }
  getNumero() {
    return this.numero;
  }
  getTelefone1() {
    return this.telefone1;
  }
  getTelefone2() {
    return this.telefone2;
  }
  /******************* ativo **************************/
  setAtivo(ativo: boolean) {
    //ativo ? this.ativo = false : true
    if (ativo) {
      this.ativo = true;
    } else {
      this.ativo = false;
    }
    //ativo ? this.ativo = true : false;
  }

  getAtivo() {
    return this.ativo;
  }
}
