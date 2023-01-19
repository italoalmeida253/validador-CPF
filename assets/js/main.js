/* função construtora do CPF */
function CPF(cpf) {
    this.cpf = cpf;
    this.cpfLimpo = this.cpf.replace(/\D+/g, ""); // deixa o CPF enviado pelo cliente com somente números
    this.cpfValido;
}
/* --- */

CPF.prototype.eValido = function () {
    let cpfFatiado = Array.from(this.cpfLimpo); // fatia o CPF do cliente e põe em um array
    cpfFatiado = cpfFatiado.map((val) => Number(val)); // converte os valores do array fatiado para o tipo Number

    this.cpfValido = [...cpfFatiado].splice(0, 9); // pega somente os primeiros 9 números do CPF

    /* for() irá se repetir duas vezes devido a necessidade de gerar dois últimos números do CPF */
    for (let i = 0; i < 2; i++) {
        let digito = this.cpfValido
            .map((val, i, array) => val * (array.length + 1 - i)) // multiplica os valores do array fatiado (esquerda para direita) pela a soma da largura da array + 1 menos o índice atual
            .reduce((ac, val) => (ac += val), 0); // soma todos os valores do array fatiado

        digito = 11 - (digito % 11); // fórmula para validação de dígito com base nos 9 primeiros

        digito = digito > 9 ? 0 : digito;

        this.cpfValido.push(digito); // adiciona o dígito gerado
    }
    /* --- */

    cpfRecebido = cpfFatiado.toString().replace(/\D+/g, "");
    this.cpfValido = this.cpfValido.toString().replace(/\D+/g, "");

    if (cpfRecebido === this.cpfValido) return true;
    return false;
};

/* função que recebe e testa CPF do cliente  */
function testarCpf() {
    const campoCpf = document.querySelector("#campo-cpf");
    const txtRes = document.querySelector("#res");

    const cpfCliente = new CPF(campoCpf.value); // enviar CPF escrito pelo cliente no campo CPF (HTML)

    if (cpfCliente.eValido()) {
        txtRes.textContent = "Seu CPF é válido.";
        return;
    }
    txtRes.textContent = `Seu CPF é inválido. CPF válido com base nos primeiros 9 números: ${cpfCliente.cpfValido}`;
}
/* --- */
