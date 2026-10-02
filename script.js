// ==========================================
// CONFIGURAR AS CHAVES DO SUPABASE
// ==========================================
const supabaseUrl = 'https://yeefhdiggnacjqynzuwm.supabase.co'; 
const supabaseKey = 'sb_publishable_fRQzEwdoKaitR9e8Z-X4jQ_881D17p4'; 

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let motoristas = [];

// FUNÇÃO PARA BUSCAR DADOS NA NUVEM
async function carregarDados() {
    let { data, error } = await supabaseClient.from('motoristas').select('*');
    
    if (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao conectar à nuvem. Verifique o console para detalhes.");
        return;
    }

    if (data) {
        motoristas = data;
        atualizarTela();
    }
}

function atualizarTela() {
    let divFilaFrota = document.getElementById("lista-fila-frota");
    let divFilaTerceiros = document.getElementById("lista-fila-terceiros");
    let divRota = document.getElementById("lista-rota");
    let divIndisp = document.getElementById("lista-indisponiveis");
    
    divFilaFrota.innerHTML = "";
    divFilaTerceiros.innerHTML = "";
    divRota.innerHTML = "";
    divIndisp.innerHTML = "";

    let dispFrota = motoristas.filter(m => m.status === "disponivel" && m.tipo === "frota");
    dispFrota.sort((a, b) => a.timestamp - b.timestamp);
    dispFrota.forEach((motorista, index) => {
        let hora = motorista.timestamp ? new Date(motorista.timestamp).toLocaleTimeString("pt-PT", {hour: '2-digit', minute:'2-digit'}) : "";
        divFilaFrota.innerHTML += gerarCartaoHTML(motorista, index + 1, hora, "disp-frota");
    });

    let dispTerceiros = motoristas.filter(m => m.status === "disponivel" && m.tipo === "terceiro");
    dispTerceiros.sort((a, b) => a.timestamp - b.timestamp);
    dispTerceiros.forEach((motorista, index) => {
        let hora = motorista.timestamp ? new Date(motorista.timestamp).toLocaleTimeString("pt-PT", {hour: '2-digit', minute:'2-digit'}) : "";
        divFilaTerceiros.innerHTML += gerarCartaoHTML(motorista, index + 1, hora, "disp-terceiro");
    });

    let emRota = motoristas.filter(m => m.status == "rota");
    emRota.forEach(motorista => {
        divRota.innerHTML += gerarCartaoHTML(motorista, null, null, "rota");
    });

    let indisponiveis = motoristas.filter(m => m.status == "indisponivel");
    indisponiveis.forEach(motorista => {
        divIndisp.innerHTML += gerarCartaoHTML(motorista, null, null, "indisp");
    });
}

function gerarCartaoHTML(motorista, posicaoFila, hora, corBorda) {
    let titulo = posicaoFila ? `${posicaoFila}º - ${motorista.nome}` : motorista.nome;
    let infoHora = "";
    let botoes = "";

    if (motorista.status === "disponivel") {
        infoHora = `<p>Chegou: <strong>${hora}</strong></p>`;
        botoes = `
            <div style="display: flex; gap: 5px;">
                <button class="btn-enviar" onclick="mudarStatus(${motorista.id}, 'rota')">🚚 Rota</button>
                <button class="btn-pausar" onclick="mudarStatus(${motorista.id}, 'indisponivel')" style="width: auto;" title="Pausar/Oficina">⚠️</button>
            </div>
        `;
    } else if (motorista.status === "rota") {
        infoHora = `<p>Status: Fora da Loja</p>`;
        botoes = `
            <div style="display: flex; gap: 5px;">
                <button class="btn-chegou" onclick="mudarStatus(${motorista.id}, 'disponivel')">✅ Loja</button>
                <button class="btn-pausar" onclick="mudarStatus(${motorista.id}, 'indisponivel')" style="width: auto;" title="Pausar/Oficina">⚠️</button>
            </div>
        `;
    } else if (motorista.status === "indisponivel") {
        infoHora = ``; 
        botoes = `
            <button class="btn-enviar" onclick="mudarStatus(${motorista.id}, 'rota')">🔄 Voltar p/ Rota</button>
        `;
    }
    
    let tagVisual = motorista.tipo === "frota" 
        ? `<span class="tag-tipo tag-frota">FROTA</span>`
        : `<span class="tag-tipo tag-terceiro">TERCEIRO</span>`;

    return `
        <div class="cartao ${corBorda}">
            ${tagVisual}
            <h3>${titulo}</h3>
            ${infoHora}
            ${botoes}
            <button class="btn-remover" onclick="removerMotorista(${motorista.id})">Remover</button>
        </div>
    `;
}

// ATUALIZAR STATUS NA NUVEM
async function mudarStatus(idDoMotorista, novoStatus){
    let novoTimestamp = novoStatus === "disponivel" ? Date.now() : null;
    
    const { error } = await supabaseClient
        .from('motoristas')
        .update({ status: novoStatus, timestamp: novoTimestamp })
        .eq('id', idDoMotorista);

    if (!error) carregarDados(); 
}

// INSERIR MOTORISTA NA NUVEM
async function adicionarMotorista() {
    let input = document.getElementById("novo-motorista");
    let tipo = document.getElementById("tipo-motorista").value;
    let nome = input.value.trim();

    if (nome === "") { alert("Por favor, escreva o nome do motorista."); return; }

    const { error } = await supabaseClient
        .from('motoristas')
        .insert([{ nome: nome, status: "disponivel", timestamp: null, tipo: tipo }]);

    if (!error) {
        input.value = ""; 
        carregarDados();
    } else {
        console.error("Erro a inserir:", error);
    }
}

// APAGAR MOTORISTA DA NUVEM
async function removerMotorista(idDoMotorista) {
    if(confirm("Remover este motorista da Base de Dados?")) {
        const { error } = await supabaseClient
            .from('motoristas')
            .delete()
            .eq('id', idDoMotorista);
        
        if (!error) carregarDados();
    }
}

// FINALIZAR EXPEDIENTE NA NUVEM
async function finalizarExpediente() {
    if(confirm("Finalizar o expediente? Todos os disponíveis voltarão para a rota.")) {
        const { error } = await supabaseClient
            .from('motoristas')
            .update({ status: 'disponivel', timestamp: null })
            .neq('status', 'indisponivel');

        if (!error) carregarDados();
    }
}

// Ao abrir a página, carrega os dados
carregarDados();