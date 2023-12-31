import bancoDeDados from "../database/index.js";

class AdmModel {
  async getSolicitacoes() {
    const conn = await bancoDeDados.conectar();
    const sql =
      "SELECT * FROM solicitacoes WHERE solicitacao_rejeitada = false";
    const solicitacoes = await conn.query(sql);
    return solicitacoes.rows;
  }
  async colocarGatoDaSolicitacaoParaAdocao(solicitacao) {
    //aceitar solicitação
    const conn = await bancoDeDados.conectar();
    const sql =
      "INSERT INTO gatos_para_adotar (nome, sexo, cor, descricao, raca) VALUES ($1,$2,$3,$4,$5)";
    await conn.query(sql, [
      solicitacao.gato_nome,
      solicitacao.gato_sexo,
      solicitacao.gato_cor,
      solicitacao.gato_descricao,
      solicitacao.gato_raca,
    ]);
  }
}

export default new AdmModel();
