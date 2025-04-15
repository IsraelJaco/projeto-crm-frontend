document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
  
    // URL da API backend
    const apiUrl = "http://localhost:5000/api/users";
  
    // Função para buscar usuários cadastrados
    function fetchUsers() {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          userList.innerHTML = ""; // Limpa a lista antes de atualizar
          data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `Nome: ${user.nome} | Cargo: ${user.cargo} | E-mail: ${user.email}`;
            userList.appendChild(li);
          });
        })
        .catch(error => console.error('Erro ao buscar usuários:', error));
    }
  
    // Função para enviar dados do formulário (POST)
    userForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const newUser = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        cargo: document.getElementById('cargo').value,
        observacao: document.getElementById('observacao').value,
      };
  
      // Envia o POST para a API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then(response => response.json())
        .then(() => {
          alert("Usuário cadastrado com sucesso!");
          fetchUsers(); // Atualiza a lista de usuários
          userForm.reset(); // Limpa o formulário
        })
        .catch(error => console.error('Erro ao cadastrar usuário:', error));
    });
  
    // Carrega os usuários ao carregar a página
    fetchUsers();
  });
  