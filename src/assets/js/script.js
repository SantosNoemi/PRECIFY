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

  relatorioPlanilha: [
    {
      id: 2,
      janela: "Relatorio Planilha",
      titulo: "Relatórios Gerenciais",
      relatorio: "Planilha",
      botaoGerar: "Gerar relatório",
      botaoAdicionar: "Adicioar",
      botaoVisualizar: "Visualizar",
      botaoDashboard: "Dashboard",
      planilha: [
        {
          id: 3,
          titulo: "Relatório de Coletas",
          descrição: "Relatório mensal das coletas realizadas.",
          arquivo: "coleta_jan2025.pdf",
          data: "01-02-2025"
        },
        {
          id: 4,
          titulo: "Materiais Reciclados",
          descrição: "Quantidade de materiais reciclados por tipo.",
          arquivo: "reciclados_fev2025.pdf",
          data: "03-03-2025"
        },
        {
          id: 5,
          titulo: "Empresas Atendidas",
          descrição: "Lista de empresas atendidas no trimestre.",
          arquivo: "empresas_mar2025.pdf",
          data: "05-04-2025"
        },
        {
          id: 6,
          titulo: "Catadores Ativos",
          descrição: "Número de catadores ativos por região.",
          arquivo: "catadores_abr2025.pdf",
          data: "06-05-2025"
        },
        {
          id: 7,
          titulo: "Análise Financeira",
          descrição: "Análise de custos e lucros das operações.",
          arquivo: "financeiro_mai2025.pdf",
          data: "07-06-2025"
        },
        {
          id: 8,
          titulo: "Impacto Ambiental",
          descrição: "Relatório de impacto ambiental evitado.",
          arquivo: "impacto_jun2025.pdf",
          data: "08-07-2025"
        }
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


// Função para preencher a tabela de registros
function preencherTabelaRegistros() {
  // Seleciona o tbody da tabela
  const tbody = document.querySelector('.ponto-registros tbody');
  if (!tbody) return;

  // Limpa o conteúdo anterior
  tbody.innerHTML = '';

  // Busca os dados da planilha
  const planilha = relatorios.relatorioPlanilha[0].planilha;

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

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', preencherTabelaRegistros);