const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '', // Substitua pela sua senha do MySQL
    database: 'my_app_db'
};

// Conexão com o banco de dados
let connection;
async function connectToDb() {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao banco de dados MySQL!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err.code); // Loga o código do erro
        // console.error('Erro detalhado ao conectar ao banco de dados:', err); // Descomente para ver mais detalhes
        setTimeout(connectToDb, 5000); // Tentar reconectar em 5 segundos
    }
}
connectToDb();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecretkey', // Uma string secreta forte para assinar o cookie de sessão
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000, secure: false } // 1 hora de validade. secure: true em produção com HTTPS.
}));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// NOVO: Função de validação de CPF no backend
function isValidCpfBackend(cpf) {
    if (!cpf || typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) { // Verifica se tem 11 dígitos e se não são todos iguais
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
}

// Middleware para proteger rotas (checa se o usuário está logado)
function requireLogin(req, res, next) {
    if (req.session.userId) {
        next(); // Usuário logado, continua para a próxima rota
    } else {
        // Se não estiver logado, redireciona para a página inicial
        res.redirect('/');
        // Ou, para APIs, enviar status 401
        // res.status(401).json({ success: false, message: 'Não autorizado. Faça login para acessar esta área.' });
    }
}

// Rota de Cadastro
app.post('/register', async (req, res) => {
    const { full_name, phone, address, cpf, password } = req.body; // CPF já virá sem formatação do frontend

    if (!full_name || !phone || !address || !cpf || !password) {
        return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    // Adicionar validação de CPF no backend
    if (!isValidCpfBackend(cpf)) {
        return res.status(400).json({ success: false, message: 'CPF inválido.' });
    }

    try {
        // Verificar se o CPF já existe
        const [existingUser] = await connection.execute('SELECT id FROM users WHERE cpf = ?', [cpf]);
        if (existingUser.length > 0) {
            return res.status(409).json({ success: false, message: 'CPF já cadastrado.' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de rounds de salt

        // Inserir usuário no banco de dados
        await connection.execute(
            'INSERT INTO users (full_name, phone, address, cpf, password) VALUES (?, ?, ?, ?, ?)',
            [full_name, phone, address, cpf, hashedPassword]
        );

        res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor ao cadastrar.' });
    }
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { cpf, password } = req.body; // CPF já virá sem formatação do frontend

    if (!cpf || !password) {
        return res.status(400).json({ success: false, message: 'CPF e senha são obrigatórios.' });
    }

    // Adicionar validação de CPF no backend para o login também
    if (!isValidCpfBackend(cpf)) {
        // Para o login, é melhor dar uma mensagem mais genérica por segurança
        return res.status(401).json({ success: false, message: 'CPF ou senha incorretos.' });
    }

    try {
        // Buscar usuário pelo CPF
        const [users] = await connection.execute('SELECT * FROM users WHERE cpf = ?', [cpf]);

        if (users.length === 0) {
            return res.status(401).json({ success: false, message: 'CPF ou senha incorretos.' });
        }

        const user = users[0];

        // Comparar a senha fornecida com a senha hashed no banco de dados
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'CPF ou senha incorretos.' });
        }

        // Se o login for bem-sucedido, armazena o ID do usuário na sessão
        req.session.userId = user.id;
        req.session.fullName = user.full_name; // Armazena o nome completo para usar no painel

        // Envia uma resposta JSON indicando sucesso e que um redirecionamento ocorrerá
        res.status(200).json({ success: true, message: 'Login realizado com sucesso!', redirect: '/dashboard' });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor ao fazer login.' });
    }
});

// Rota de Logout
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erro ao destruir a sessão:', err);
            return res.status(500).json({ success: false, message: 'Erro ao fazer logout.' });
        }
        // Redireciona para a página inicial após o logout
        res.status(200).json({ success: true, message: 'Logout realizado com sucesso.', redirect: '/' });
    });
});

// Rota para a página do painel do usuário (protegida)
app.get('/dashboard', requireLogin, (req, res) => {
    // Serve o arquivo painel.html
    res.sendFile(path.join(__dirname, 'public', 'pages', 'painel.html'));
});

// Rota para obter informações do usuário logado (para o painel)
app.get('/user-info', requireLogin, (req, res) => {
    res.json({ success: true, userId: req.session.userId, fullName: req.session.fullName });
});

// Rota para verificar o status de login (para o index.html)
app.get('/check-login', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true, fullName: req.session.fullName });
    } else {
        res.json({ loggedIn: false });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});