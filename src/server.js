const app = require('./index');
const { PORT } = require('./config/env');


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});