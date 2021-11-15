
const operacoes = {
    "+": function (a, b) { return a + b; },
    "-": function (a, b) { return a - b; },
    "x": function (a, b) { return a * b; },
    "/": function (a, b) { return b == 0 ? "Erro!" : a / b; },
}

let valor1 = "";
let operacao = "";
let valor2 = "";
let resultado = undefined;
let digitouPonto = false;
let limiteDeDigitos = 8;

function temOperacao() {
    return operacao != "";
}

function configurarCalculadora() {
    const botoes = document.getElementsByTagName("button");
    for (botao of botoes) {
        botao.setAttribute("onclick", "clicou(this.innerText)");
    }
}

function clicou(botao) {
    if (botao == ".") { 
        clicouPonto();
    } else if (botao == "=") { 
        clicouIgual(); 
    } else if (botao == "C") { 
        clicouReset(); 
    } else if (botao == "+" || botao == "-" || botao == "x" || botao == "/") { 
        clicouOperacao(botao); 
    } else {
        cliclouNumero(botao);
    }
}

function cliclouNumero(nmr) { console.log(nmr);
    const nmrEmConstrucao = temOperacao() ? valor2 : valor1;
    console.log(nmrEmConstrucao);
    if (nmr == "0" && nmrEmConstrucao == "0") { 
        return; 
    } else if (nmrEmConstrucao.length <= limiteDeDigitos) {
        atualizaNumero(nmr)
    }
}

function clicouPonto() {
    const nmrEmConstrucao = temOperacao() ? valor2 : valor1;
    if (!digitouPonto && nmrEmConstrucao != "" && nmrEmConstrucao.length <= limiteDeDigitos) {
        digitouPonto = true;
        atualizaNumero(".");
    }
}

function atualizaNumero(novoDigito) {
    if (temOperacao()) {
        valor2 += novoDigito;
    } else {
        valor1 += novoDigito;
    }
    atualizaVisor();
}

function atualizaVisor() {
    const visor = document.getElementById("resultado");
    if (resultado != undefined) {
        visor.innerHTML = resultado;
    } else if (temOperacao()) {
        visor.innerHTML = valor2;
    } else {
        visor.innerHTML = valor1;
    }
}

function clicouOperacao(valor) {
    operacao = valor;
    digitouPonto = false;
}

function clicouIgual() {
    if (temOperacao() && valor2 != "") {
        const nmr1 = Number(valor1);
        const nmr2 = Number(valor2);
        const func = operacoes[operacao];
        resultado = func(nmr1, nmr2);
        atualizaVisor();

        valor1 = resultado + "";
        operacao = "";
        valor2 = "";
        resultado = undefined;
        digitouPonto = valor1.indexOf(".") != -1;
    }
}

function clicouReset() {
    valor1 = "";
    operacao = "";
    valor2 = "";
    resultado = undefined;
    digitouPonto = false;
    document.getElementById("resultado").innerText = "0";
}