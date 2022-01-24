let referencia = false;     //controla quando o display será apagado quando  clicar em um número após o clique no igual

function numero(value) {
    let display = document.getElementById('display');
    if (referencia == true) {
        display.value = ''
        referencia = false
    }
    display.value += value;
}

function limpar() {     //Faz o botão C funcionar 
    let display = document.getElementById('display');
    display.value = ' '
}

function operacao(value) {      //Coloca os sinais e inicia as operações
    let display = document.getElementById('display');
    let lista = []
    let resposta;
    
    // Transformar valores do display em lista
    lista = listagem(display.value) 
    
    // Pegar os valores da lista 
    let primeiro = new Array;
    let sinal;
    let segundo = new Array;

    for (var a = 0; a < lista.length; a++) {
        if (lista[a] == " ") {
            sinal = lista[a+1];
            for (var b = 0; b < a; b++) {
                primeiro.push(lista[b]);
            }
            for(var c = a+3; c < lista.length; c++) {
                segundo.push(lista[c]);
            }
            break;
        }
    }

    primeiro = parseFloat(primeiro.join(''));
    segundo = parseFloat(segundo.join(''));

    if (value == '=') {
        // window.alert(lista)
        resposta = operar(primeiro, sinal, segundo);
        display.value = resposta;
        referencia = true;

    } else {
        if (isNaN(primeiro) || isNaN(segundo)) {    // Se a operação ja tiver incompleta
            display.value += ` ${value} `;  // Adiciona a operação no display
            referencia = false; // Pra manter o resultado depois de clicar no igual se ao invés de clicar em outro número, clicar em uma operação(não perde o valor se quiser continuar)
        } else {
            resposta = operar(primeiro, sinal, segundo) ;
            display.value = resposta;
            display.value += ` ${value} `;
        }
    }
}


function memory(value) {   //value: + - c
    //Trabalha com a memoria da calculadora
    const memoryOpen = () =>  {     //Função que pega o local da memoria ou cria um
        let memory; 
        if (sessionStorage.getItem('memory') == null) {
            sessionStorage.setItem('memory','0')
            memory = sessionStorage.getItem('memory')
        } else {
            memory = sessionStorage.getItem('memory')
        }
        // console.log('horiginal:', memory)
        memory = parseInt(memory)
        // console.log('horiginal:', memory)
        return memory
    }
    //Envia os novos dados pra memoria 
    const memoryClose = (memory)=>{
        console.log(memory)
        sessionStorage.setItem('memory', JSON.stringify(memory))
    }

    if (value == '+') {
        let memory = memoryOpen()
        let display = parseInt(document.getElementById('display').value)
        memory += display 
        memoryClose(memory)
    }
    if (value == '-') {
        let memory = memoryOpen()
        let display = parseInt(document.getElementById('display').value)
        memory -= display 
        memoryClose(memory)
    }
    if (value == 'c') {
        let memory = memoryOpen() 
        memory = 0 
        memoryClose(memory)
        document.getElementById('display').value = ''
    }
    if (value == 'd') {
        let memory = memoryOpen() 
        document.getElementById('display').value += memory
    }
}


function operar(primeiro, sinal, segundo) {     //faz e retorna as operações
   let resposta; 
    if (sinal == '+') {
        return primeiro + segundo;
    } else if (sinal == '-') {
        return primeiro - segundo;
    } else if (sinal == 'x'){
        return primeiro * segundo;
    }else if (sinal == '%') {
        return primeiro / segundo;
    }
}

function listagem(value) {      // Transforma os valores do display em lista
    let lista = new Array;

    for (var item in value) {
        lista.push(value[item])
    }
    return lista;
}