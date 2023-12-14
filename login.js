async function login() {
  localStorage.clear();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const data = {
    email: email,
    senha: senha,
  };

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const tokenData = await response.json();

    if (tokenData.token) {
      // Login bem-sucedido
      localStorage.clear();
      localStorage.setItem("token", tokenData.token);

      const payload = JSON.parse(atob(decodeURIComponent(token.split(".")[1])));

      if(payload.tipo === "adm"){
        window.location.assign("./src/Administrador/home/index.html");
      }else if(payload.tipo === "comum"){
        window.location.assign("./src/UsuárioComum/home/index.html");
      }else{
        mostrarAlerta("Erro ao reconhecer tipo do usuário", "erro")
      }
    } else {
      // Falha no login
      mostrarAlerta(`Acesso negado: ${tokenData.mensagem}`, "erro");
    }
  } catch (error) {
    mostrarAlerta(`Erro na solicitação: ${error}`, "erro");
  }
}
function mostrarAlerta(mensagem, tipo){
  const caixaDeAlerta = document.querySelector("div#caixaDeAlerta")
  const texto = document.querySelector("strong#mensagemDeAlerta")

  caixaDeAlerta.classList.remove("d-none")
  caixaDeAlerta.classList.add("d-flex")

  caixaDeAlerta.classList.remove("alert-success")
  caixaDeAlerta.classList.remove("alert-danger")
  caixaDeAlerta.classList.remove("alert-warning")
  
  switch(tipo){
    case "erro":
      caixaDeAlerta.classList.add("alert-danger")
      break
    case "alerta":
      caixaDeAlerta.classList.add("alert-warning")
      break
    case "sucesso":
      caixaDeAlerta.classList.add("alert-success")
      break
  }

  texto.innerHTML = mensagem
}
