export default class Clientes {
  #id?: number;
  #codigoCliente?: string;
  #nome?: string;
  #endereco?: string;
  #numero?: string;
  #bairro?: string;
  #cidade?: string;
  #uf?: string;
  #cep?: string;
  #telefone1?: string;
  #telefone2?: string;

  constructor(
    id?: number,
    codigoCliente?: string,
    nome?: string,
    codigoNome?: string,
    endereco?: string,
    numero?: string,
    bairro?: string,
    telefone1?: string,
    telefone?: string,
    telefone2?: string,
    cidade?: string,
    uf?: string,
    cep?: string
  ) {
    this.#id = id;
    this.#nome = nome;
    this.#codigoCliente = codigoCliente;
    this.#endereco = endereco;
    this.#numero = numero;
    this.#bairro = bairro;
    this.#cidade = cidade;
    this.#uf = uf;
    this.#cep = cep;
    this.#telefone1 = telefone1;
    this.#telefone2 = telefone2;
  }

  getId() {
    return this.#id;
  }
  getNome() {
    return this.#nome;
  }
}
