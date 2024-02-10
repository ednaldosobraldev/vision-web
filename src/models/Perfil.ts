export default class Perfil {
  id_nivel?: number;
  codigo_nivel?: string;
  descricao_nivel?: string;
  ativo?: boolean;
  id_empresa: number;

  constructor(
    idNivel: number,
    idEmpresa: number,
    codigoNivel: string,
    descricaoNivel: string,
    ativo: boolean
  ) {
    this.id_nivel = idNivel;
    this.id_empresa = idEmpresa;
    this.codigo_nivel = codigoNivel;
    this.descricao_nivel = descricaoNivel;
    this.ativo = ativo;
  }

  /****************** idNivel ***************************/
  setIdNivel(idNivel: number) {
    this.id_nivel = idNivel;
  }
  getIdNivel() {
    return this.id_nivel;
  }

  /****************** idEmpresa ***************************/
  setIdEmpresa(idEmpresa: number) {
    this.id_empresa = idEmpresa;
  }
  getIdEmpresa() {
    return this.id_empresa;
  }
  /****************** codigoNivel ***************************/
  setCodigoNivel(codigoNivel: string) {
    this.codigo_nivel = codigoNivel;
  }
  getCodigoNivel() {
    return this.codigo_nivel;
  }
  /************** descricaoNivel ***********************/
  setDescricaoNivel(descricaoNivel: string) {
    this.descricao_nivel = descricaoNivel.toUpperCase();
  }
  getDescricaoNivel() {
    return this.descricao_nivel;
  }
  /******************* ativo **************************/
  setAtivo(ativo: boolean) {
    // if(ativo){
    //     this.ativo = true
    // }else{
    //     this.ativo = false
    // }
    ativo ? (this.ativo = true) : false;
  }
  getAtivo() {
    return this.ativo;
  }
}
