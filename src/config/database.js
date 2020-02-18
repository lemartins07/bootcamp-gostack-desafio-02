module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    // adiciona as colunas created_at e updated_at em todas tabelas.
    // Isso é muito para ter mais controle
    timestamps: true,
    // padronização de underscore para tabelas e colunas
    underscored: true,
    underscoredAll: true,
  },
};
