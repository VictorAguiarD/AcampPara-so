let clientes=[], produtos=[], clienteSelecionado=null;

// TABS
document.querySelectorAll(".tab").forEach(tab=>{
  tab.onclick=()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tc=>tc.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  };
});

// Inicialização
renderTabelaClientes();
renderTabelaProdutos();
