document.addEventListener('DOMContentLoaded', () => {
    // Elementos dos modais
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');

    // Botões para abrir os modais
    const openRegisterModalBtn = document.getElementById('openRegisterModalBtn');
    const openLoginModalBtn = document.getElementById('openLoginModalBtn');

    // Botões para fechar os modais
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    const closeLoginModal = document.getElementById('closeLoginModal');

    // Forms
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Mensagens de feedback
    const registerMessage = document.getElementById('registerMessage');
    const loginMessage = document.getElementById('loginMessage');

    // Seções da página principal
    const welcomeSection = document.getElementById('welcomeSection');
    const userArea = document.getElementById('userArea');

    // Elementos de boas-vindas e botões no cabeçalho e corpo da página
    const headerWelcomeMessage = document.getElementById('headerWelcomeMessage');
    const goToDashboardBtn = document.getElementById('goToDashboardBtn');
    const logoutBtnHeader = document.getElementById('logoutBtnHeader');
    const welcomeMessage = document.getElementById('welcomeMessage'); // Dentro da userArea
    const goToDashboardBtnMain = document.getElementById('goToDashboardBtnMain'); // Dentro da userArea
    const logoutBtnMain = document.getElementById('logoutBtnMain'); // Dentro da userArea


    // Função para abrir modal
    function openModal(modal) {
        modal.style.display = 'block';
    }

    // Função para fechar modal
    function closeModal(modal) {
        modal.style.display = 'none';
        // Limpar mensagens de feedback ao fechar
        if (modal === registerModal) {
            registerMessage.textContent = '';
            registerMessage.className = 'message';
            registerForm.reset(); // Limpa o formulário
        } else if (modal === loginModal) {
            loginMessage.textContent = '';
            loginMessage.className = 'message';
            loginForm.reset(); // Limpa o formulário
        }
    }

    // Event listeners para abrir modais
    openRegisterModalBtn.addEventListener('click', () => openModal(registerModal));
    openLoginModalBtn.addEventListener('click', () => openModal(loginModal));

    // Event listeners para fechar modais
    closeRegisterModal.addEventListener('click', () => closeModal(registerModal));
    closeLoginModal.addEventListener('click', () => closeModal(loginModal));

    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target == registerModal) {
            closeModal(registerModal);
        }
        if (event.target == loginModal) {
            closeModal(loginModal);
        }
    });

    // Função para formatar CPF
    function formatCpf(input) {
        let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        if (value.length > 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d{3})$/, '$1');
        }
        input.value = value;
    }

    // Aplicar formatação de CPF nos inputs
    document.getElementById('registerCpf').addEventListener('input', function() {
        formatCpf(this);
    });
    document.getElementById('loginCpf').addEventListener('input', function() {
        formatCpf(this);
    });

    // Função para formatar telefone (opcional, pode ser adaptada para o formato desejado)
    function formatPhone(input) {
        let value = input.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
        } else {
            value = value.replace(/^(\d*)$/, '($1');
        }
        input.value = value;
    }

    document.getElementById('registerPhone').addEventListener('input', function() {
        formatPhone(this);
    });

    // Função para validar CPF (algoritmo básico) - CLIENT-SIDE VALIDATION
    function isValidCpf(cpf) {
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

    // Submissão do formulário de Cadastro
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const full_name = document.getElementById('registerFullName').value;
        const phone = document.getElementById('registerPhone').value;
        const address = document.getElementById('registerAddress').value;
        const cpf = document.getElementById('registerCpf').value; // CPF com formatação
        const rawCpf = cpf.replace(/[^\d]+/g, ''); // CPF somente números para validação e envio
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmRegisterPassword').value;

        if (password !== confirmPassword) {
            registerMessage.textContent = 'As senhas não coincidem!';
            registerMessage.className = 'message error';
            return;
        }

        // Adicionar validação de CPF no frontend
        if (!isValidCpf(rawCpf)) {
            registerMessage.textContent = 'CPF inválido. Por favor, digite um CPF verdadeiro.';
            registerMessage.className = 'message error';
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ full_name, phone, address, cpf: rawCpf, password }), // Envie o CPF sem formatação para o backend
            });

            const data = await response.json();

            if (data.success) {
                registerMessage.textContent = data.message;
                registerMessage.className = 'message success';
                registerForm.reset();
                setTimeout(() => closeModal(registerModal), 2000); // Fecha o modal após 2 segundos
            } else {
                registerMessage.textContent = data.message;
                registerMessage.className = 'message error';
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            registerMessage.textContent = 'Erro de conexão com o servidor.';
            registerMessage.className = 'message error';
        }
    });

    // Submissão do formulário de Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cpf = document.getElementById('loginCpf').value;
        const rawCpf = cpf.replace(/[^\d]+/g, ''); // CPF somente números para validação e envio
        const password = document.getElementById('loginPassword').value;

        // Adicionar validação de CPF no frontend para o login também
        if (!isValidCpf(rawCpf)) {
            loginMessage.textContent = 'CPF inválido.'; // No login, a mensagem pode ser mais genérica
            loginMessage.className = 'message error';
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cpf: rawCpf, password }), // Envie o CPF sem formatação para o backend
            });

            const data = await response.json();

            if (data.success) {
                loginMessage.textContent = data.message;
                loginMessage.className = 'message success';
                setTimeout(() => {
                    closeModal(loginModal); // Fecha o modal de login
                    checkLoginStatus(); // Atualiza a UI após o login
                }, 1500);
            } else {
                loginMessage.textContent = data.message;
                loginMessage.className = 'message error';
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            loginMessage.textContent = 'Erro de conexão com o servidor.';
            loginMessage.className = 'message error';
        }
    });

    // NOVO: Função para atualizar a UI com base no status de login
    async function checkLoginStatus() {
        try {
            const response = await fetch('/check-login');
            const data = await response.json();

            if (data.loggedIn) {
                // Usuário está logado
                openRegisterModalBtn.style.display = 'none';
                openLoginModalBtn.style.display = 'none';

                headerWelcomeMessage.textContent = `Olá, ${data.fullName}!`;
                headerWelcomeMessage.style.display = 'inline-block';
                goToDashboardBtn.style.display = 'inline-block';
                logoutBtnHeader.style.display = 'inline-block';

                welcomeSection.style.display = 'none'; // Esconde a seção de boas-vindas para não logados
                userArea.style.display = 'block'; // Mostra a seção de usuário logado na index.html

                welcomeMessage.textContent = `Olá, ${data.fullName}!`; // Mensagem na área principal
            } else {
                // Usuário NÃO está logado
                openRegisterModalBtn.style.display = 'inline-block';
                openLoginModalBtn.style.display = 'inline-block';

                headerWelcomeMessage.style.display = 'none';
                goToDashboardBtn.style.display = 'none';
                logoutBtnHeader.style.display = 'none';

                welcomeSection.style.display = 'block'; // Mostra a seção de boas-vindas para não logados
                userArea.style.display = 'none'; // Esconde a seção de usuário logado
            }
        } catch (error) {
            console.error('Erro ao verificar status de login:', error);
            // Em caso de erro, presume não logado para evitar estados quebrados
            openRegisterModalBtn.style.display = 'inline-block';
            openLoginModalBtn.style.display = 'inline-block';
            headerWelcomeMessage.style.display = 'none';
            goToDashboardBtn.style.display = 'none';
            logoutBtnHeader.style.display = 'none';
            welcomeSection.style.display = 'block';
            userArea.style.display = 'none';
        }
    }

    // Event listeners para os botões "Ir para Painel"
    goToDashboardBtn.addEventListener('click', () => {
        window.location.href = '/dashboard';
    });
    goToDashboardBtnMain.addEventListener('click', () => {
        window.location.href = '/dashboard';
    });


    // Event listeners para os botões de Logout
    // Centralizando a lógica de logout para ambos os botões
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
            });
            const data = await response.json();
            if (data.success && data.redirect) {
                alert('Logout realizado com sucesso!');
                // Ao invés de redirecionar imediatamente, atualizamos a UI para mostrar os elementos de não logado
                checkLoginStatus(); // Atualiza a UI para refletir o estado de não logado
                // Se a URL ainda for /dashboard, redirecionar para a raiz. Caso contrário, não precisa.
                if (window.location.pathname === '/dashboard') {
                    window.location.href = data.redirect; // Redireciona para a página inicial
                }
            } else {
                alert('Erro ao fazer logout: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            alert('Erro de conexão com o servidor ao tentar logout.');
        }
    };

    logoutBtnHeader.addEventListener('click', handleLogout);
    logoutBtnMain.addEventListener('click', handleLogout);


    // Chama a função ao carregar a página para definir o estado inicial da UI
    checkLoginStatus();
});