// Função para capturar os dados do formulário
function captureFormData() {
    const nameInput = document.getElementsByClassName("name")[0].value; // Captura o valor do input de nome
    const enderecoInput = document.getElementsByClassName("endereco")[0].value; // Captura o valor do input de endereço
    const phoneNumberInput = document.getElementsByClassName("phoneNumber")[0].value; // Captura o valor do input de telefone

    // Exibe os dados no console (ou faça o que quiser com eles)
    console.log("Nome:", nameInput);
    console.log("Endereço:", enderecoInput);
    console.log("Número de Telefone:", phoneNumberInput);
}

// Adiciona um evento de clique ao botão "Submit"
document.getElementById("submitButton").addEventListener("click", function() {
    captureFormData(); // Chama a função para capturar os dados
});