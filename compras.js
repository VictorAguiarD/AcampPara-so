// COMPRAS E DEPÓSITOS
function abrirDeposito(idx){ 
    clienteSelecionado=idx; 
    document.getElementById("valorDeposito").value=""; 
    document.getElementById("modalDeposito").style.display="flex"; 
  }
  function abrirCompra(idx){
    clienteSelecionado=idx;
    const select=document.getElementById("produtoCompra");
    select.innerHTML="";
    produtos.forEach((p,i)=>{ 
      const opt=document.createElement("option"); 
      opt.value=i; 
      opt.textContent=`${p.nome} - R$ ${p.preco.toFixed(2)} (Estoque:${p.qtd})`; 
      select.appendChild(opt); 
    });
    document.getElementById("qtdCompra").value=1;
    atualizarTotalCompra();
    document.getElementById("modalCompra").style.display="flex";
  }
  function fecharModal(id){ document.getElementById(id).style.display="none"; }
  
  document.getElementById("confirmarDeposito").onclick=()=>{
    const valor=parseFloat(document.getElementById("valorDeposito").value);
    if(isNaN(valor)||valor<=0) return alert("Valor inválido!");
    clientes[clienteSelecionado].saldo+=valor;
    fecharModal("modalDeposito");
    renderTabelaClientes();
  };
  
  function atualizarTotalCompra(){
    const idxP=document.getElementById("produtoCompra").value;
    const qtd=parseInt(document.getElementById("qtdCompra").value);
    if(produtos[idxP]) document.getElementById("totalCompra").innerText="Total: R$ "+(produtos[idxP].preco*qtd).toFixed(2);
  }
  document.getElementById("qtdCompra").oninput=atualizarTotalCompra;
  document.getElementById("produtoCompra").onchange=atualizarTotalCompra;
  
  document.getElementById("confirmarCompra").onclick=()=>{
    const idxProd=document.getElementById("produtoCompra").value;
    const qtd=parseInt(document.getElementById("qtdCompra").value);
    if(!produtos[idxProd]||qtd<=0||produtos[idxProd].qtd<qtd) return alert("Quantidade inválida ou estoque insuficiente!");
    const produto=produtos[idxProd], cliente=clientes[clienteSelecionado];
    const total=produto.preco*qtd;
  
    // Atualiza histórico
    if(!cliente.historicoCompras) cliente.historicoCompras=[];
    cliente.historicoCompras.push({produto:produto.nome,qtd,total});
  
    // Atualiza saldo/dívida
    if(cliente.tipo==="pre"){
      if(cliente.saldo<total) return alert("Saldo insuficiente!");
      cliente.saldo-=total; cliente.vendas=(cliente.vendas||0)+total;
    } else if(cliente.tipo==="normal"){
      cliente.vendas=(cliente.vendas||0)+total; // paga na hora
    } else if(cliente.tipo==="fiado"){
      cliente.saldo=(cliente.saldo||0)-total; cliente.vendas=(cliente.vendas||0)+total;
    }
  
    produto.qtd-=qtd; // atualiza estoque
    fecharModal("modalCompra");
    renderTabelaClientes(); 
    renderTabelaProdutos();
  };
  