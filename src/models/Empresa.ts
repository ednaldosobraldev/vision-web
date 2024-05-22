export class EmpresaModel {
  id_empresa?: number;
  descricao_empresa?: string;
  razao?: string;
  fantasia?: string;
  cpf_cnpj?: string;
  ie?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  numero?: string;
  telefone1?: string;
  telefone2?: string;
  ativo?: boolean;

  constructor(
    id_empresa: number,
    descricao_empresa: string,
    razao: string,
    fantasia: string,
    cpf_cnpj: string,
    ie: string,
    rua: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
    numero: string,
    telefone1: string,
    telefone2: string,
    ativo: boolean
  ) {
    this.id_empresa = id_empresa;
    this.descricao_empresa = descricao_empresa;
    this.razao = razao;
    this.fantasia = fantasia;
    this.cpf_cnpj = cpf_cnpj;
    this.ie = ie;
    this.rua = rua;
    this.bairro = bairro;
    this.cidade = cidade;
    this.uf = uf;
    this.cep = cep;
    this.numero = numero;
    this.telefone1 = telefone1;
    this.telefone2 = telefone2;
    this.ativo = ativo;
  }

  setIdEscola(idEmpresa: number) {
    this.id_empresa = idEmpresa;
  }
  setIdEmpresa(idEmpresa: number) {
    this.id_empresa = idEmpresa;
  }
  setNomeEscolha(descricaoEmpresa: string) {
    this.descricao_empresa = descricaoEmpresa.toUpperCase();
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
  setUf(uf:string) {
    this.uf = uf.toUpperCase();
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
    return this.id_empresa;
  }
  getIdEmpresa() {
    return this.id_empresa;
  }
  getNomeEscola() {
    return this.descricao_empresa;
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
  getUf(){
    return this.uf;
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
    if (ativo) {
      this.ativo = true;
    } else {
      this.ativo = false;
    }
  }

  getAtivo() {
    return this.ativo;
  }
}
