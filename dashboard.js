// CLIENTES
function renderTabelaClientes(){
    const tbody=document.querySelector("#clientesTable tbody"); 
    tbody.innerHTML="";
    clientes.forEach((c,idx)=>{
      const tr=document.createElement("tr");
      const tdNome=document.createElement("td"); tdNome.textContent=c.nome;
      const tdTipo=document.createElement("td"); tdTipo.textContent=c.tipo;
      const tdSaldo=document.createElement("td");
      tdSaldo.textContent=c.tipo!=="normal"?"R$ "+(c.saldo||0).toFixed(2):"R$ 0,00";
      tdSaldo.className=c.saldo>=0?"saldo-pos":"saldo-neg";
  
      const tdCompras=document.createElement("td");
      if(c.historicoCompras) tdCompras.textContent=c.historicoCompras.map(h=>h.produto+" x"+h.qtd).join(", ");
  
      const tdAcoes=document.createElement("td");
      if(c.tipo!=="normal"){ 
        const btnDep=document.createElement("button"); 
        btnDep.textContent="Depositar"; 
        btnDep.className="green"; 
        btnDep.onclick=()=> abrirDeposito(idx); 
        tdAcoes.appendChild(btnDep); 
      }
      const btnCompra=document.createElement("button"); 
      btnCompra.textContent="Comprar"; 
      btnCompra.className="yellow"; 
      btnCompra.onclick=()=> abrirCompra(idx); 
      tdAcoes.appendChild(btnCompra);
  
      const btnEdit=document.createElement("button"); 
      btnEdit.textContent="Editar"; 
      btnEdit.onclick=()=> editarCliente(idx); 
      tdAcoes.appendChild(btnEdit);
  
      const btnDel=document.createElement("button"); 
      btnDel.textContent="Excluir"; 
      btnDel.className="red"; 
      btnDel.onclick=()=>{ 
        if(confirm("Excluir cliente?")){ 
          clientes.splice(idx,1); 
          renderTabelaClientes(); 
          atualizarDashboard(); 
        } 
      }; 
      tdAcoes.appendChild(btnDel);
  
      tr.append(tdNome,tdTipo,tdSaldo,tdCompras,tdAcoes);
      tbody.appendChild(tr);
    });
    atualizarDashboard();
  }
  
  document.getElementById("btnSalvarCliente").onclick=()=>{
    const nome=document.getElementById("nomeCliente").value.trim();
    const tipo=document.getElementById("tipoCliente").value;
    const idx=document.getElementById("editIndex").value;
    if(!nome) return alert("Informe o nome!");
    if(idx){ 
      clientes[idx].nome=nome; 
      clientes[idx].tipo=tipo; 
      document.getElementById("editIndex").value=""; 
    }
    else clientes.push({nome,tipo,saldo:0,vendas:0,historicoCompras:[]});
    document.getElementById("nomeCliente").value="";
    renderTabelaClientes();
  };
  
  // EDITAR CLIENTE
  function editarCliente(idx){
    document.getElementById("nomeCliente").value=clientes[idx].nome;
    document.getElementById("tipoCliente").value=clientes[idx].tipo;
    document.getElementById("editIndex").value=idx;
  }
  