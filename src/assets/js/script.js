// Dados de relatórios (corrigido para sintaxe válida de JavaScript)
const relatorios = {
  resumo: [
    {
      id: 1,
      janela: "Resumo",
      titulo: "Relatórios Gerenciais - Resumo",
      relatorio: "Planilha",
      grafico1: "Progresso",
      grafico2: "Estatísticas",
      botaoGerar: "Gerar relatório",
      botaoAdicionar: "Adicioar",
      botaoVisualizar: "Visualizar",
      botaoDashboard: "Dashboard"
    }
  ],

  "relatorioPlanilha" : [
    {
      id: 2,
      janela: "Relatorio Planilha",
      titulo: "Relatórios Gerenciais",
      relatorio: "Planilha",
      botaoGerar: "Gerar relatório",
      botaoAdicionar: "Adicioar",
      botaoVisualizar: "Visualizar",
      botaoDashboard: "Dashboard",

      "novaPlanilha" : [
        
      ]
      
    }
  ],

  grafico: [
    {
      id: 9,
      janela: "Gráficos",
      titulo: "Gráficos",
      relatorio: "Grafico",
      grafico1: "Coletas Gerais",
      grafico2: "1º Semestre",
      grafico3: "Progresso",
      botaoGerar: "Gerar relatório",
      botaoVisualizar: "Visualizar"
    }
  ],

  estatisticas: [
    {
      id: 10,
      janela: "estatisticas",
      titulo: "Estatisticas",
      relatorio: "Grafico",
      grafico1: "1º Semestre",
      grafico2: "2º Semestre",
      card1: "img",
      card2: "img",
      botaoGerar: "Gerar relatório",
      botaoVisualizar: "Visualizar"
    }
  ]
};


// Função para gerar PDF usando jsPDF
async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título
  doc.setFontSize(16);
  doc.text("Relatório de Coletas", 20, 20);

  // Dados de exemplo
  const coletas = [
    { catador: "José da Silva", material: "Plástico", qtd: 10.5, data: "18/05/2025", local: "Rua Verde" },
    { catador: "Maria Souza", material: "Papel", qtd: 7.8, data: "18/05/2025", local: "Favela do Aço" }
  ];

  // Cabeçalhos da tabela
  doc.setFontSize(12);
  let y = 40;
  doc.text("Catador", 20, y);
  doc.text("Material", 60, y);
  doc.text("Qtd (kg)", 100, y);
  doc.text("Data", 130, y);
  doc.text("Local", 160, y);

  // Linhas da tabela
  y += 10;
  coletas.forEach(c => {
    doc.text(c.catador, 20, y);
    doc.text(c.material, 60, y);
    doc.text(c.qtd.toString(), 100, y);
    doc.text(c.data, 130, y);
    doc.text(c.local, 160, y);
    y += 10;
  }); 

  // Salva o PDF
  doc.save("relatorio_coletas.pdf");
}

 const planilha = relatorios.relatorioPlanilha[0].novaPlanilha;
// Função para preencher a tabela de registros

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', preencherTabelaRegistros);

// Função para adicionar um novo registro
// Função global para modificar os dados
function modificar() {
  const input1 = document.getElementById("input1").value;
  const input2 = document.getElementById("input2").value;
  const input3 = document.getElementById("input3").value; 
  const input4 = document.getElementById("input4").value;

  
  const novaPlanilha = {
    id: 0, // Usa o próximo índice
    titulo: input1,
    descrição: input2,
    arquivo: null, // ou você pode adicionar lógica para upload
    data: input4
  };


  planilha.push(novaPlanilha);

  console.log("Nova planilha adicionada:", novaPlanilha);
  // Atualiza a tabela
  atualizarTabelaPlanilha();
}


// Inicializa os event listeners corretamente
function inicializarModificacoes() {
  
  document.getElementById("modificar").addEventListener("click", modificar);

  document.getElementById("modificarPlanilha").addEventListener("click", function() {
    document.getElementById("planilha").style.display = "block";
    document.getElementById("modificarPlanilha").style.display = "none";
    if (typeof modificar === "function") {
      modificar(); // Opcional: só se quiser modificar ao clicar em "modificarPlanilha"
    }
  });
}
function atualizarTabelaPlanilha() {
  const tbody = document.querySelector(".ponto-registros tbody"); // ou o ID correto se for outro
  if (!tbody) {
    console.error("Elemento tbody não encontrado!");
    return;
  }

  // Limpa a tabela antes de atualizar
  tbody.innerHTML = "";

  const planilha = relatorios.relatorioPlanilha[0].novaPlanilha;

  planilha.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.titulo}</td>
      <td>${item.descrição}</td>
      <td><a href="assets/relatorios/${item.arquivo || "sem-arquivo.pdf"}" target="_blank">${item.arquivo || "Sem Arquivo"}</a></td>
      <td>${item.data}</td>
    `;
    tbody.appendChild(tr); // ✅ Adiciona <tr> à <tbody>
  });
}


document.addEventListener("DOMContentLoaded", inicializarModificacoes);

// Exemplo de planilha como array
function preencherTabelaRegistros() {
  // Seleciona o tbody da tabela
  const tbody = document.querySelector('.ponto-registros tbody');
  if (!tbody) return;

  // Limpa o conteúdo anterior
  tbody.innerHTML = '';

  // Busca os dados da planilha
  if(typeof novaPlanilha === 'undefined') {
    console.error("novaPlanilha não está definida.");
    return;
  }
  const planilha = relatorios.relatorioPlanilha[0].novaPlanilha;

  // Cria as linhas da tabela
  planilha.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.titulo}</td>
      <td>${item.descrição}</td>
      <td><a href="assets/relatorios/${item.arquivo}" target="_blank">${item.arquivo}</a></td>
      <td>${item.data}</td>
    `;
    tbody.appendChild(tr);
  });
}



