// PRODUTOS
function renderTabelaProdutos(){
    const tbody=document.querySelector("#produtosTable tbody"); 
    tbody.innerHTML="";
    produtos.forEach((p,idx)=>{
      const tr=document.createElement("tr");
      const tdNome=document.createElement("td"); tdNome.textContent=p.nome;
      const tdPreco=document.createElement("td"); tdPreco.textContent="R$ "+p.preco.toFixed(2);
      const tdQtd=document.createElement("td"); tdQtd.textContent=p.qtd; if(p.qtd<5) tdQtd.className="low-stock";
      const tdAcoes=document.createElement("td");
      const btnDel=document.createElement("button"); 
      btnDel.textContent="Excluir"; 
      btnDel.className="red"; 
      btnDel.onclick=()=>{ 
        if(confirm("Excluir produto?")){ 
          produtos.splice(idx,1); 
          renderTabelaProdutos(); 
        } 
      };
      tdAcoes.appendChild(btnDel);
      tr.append(tdNome,tdPreco,tdQtd,tdAcoes);
      tbody.appendChild(tr);
    });
  }
  
  document.getElementById("btnSalvarProduto").onclick=()=>{
    const nome=document.getElementById("nomeProduto").value.trim();
    const preco=parseFloat(document.getElementById("precoProduto").value);
    const qtd=parseInt(document.getElementById("qtdProduto").value);
    if(!nome||isNaN(preco)||preco<=0||isNaN(qtd)||qtd<0) return alert("Dados inválidos!");
    produtos.push({nome,preco,qtd});
    document.getElementById("nomeProduto").value="";
    document.getElementById("precoProduto").value="";
    document.getElementById("qtdProduto").value=0;
    renderTabelaProdutos();
  };
  
  // IMPORTAR PRODUTOS CSV
  document.getElementById("btnImportProduto").onclick=()=>document.getElementById("fileImport").click();
  document.getElementById("fileImport").onchange=function(e){
    const file=e.target.files[0]; if(!file) return;
    const reader=new FileReader();
    reader.onload=function(ev){
      const lines=ev.target.result.split("\n");
      lines.forEach(line=>{
        const [nome,preco,qtd]=line.split(",");
        if(nome && preco && qtd){
          produtos.push({nome:nome.trim(), preco:parseFloat(preco), qtd:parseInt(qtd)});
        }
      });
      renderTabelaProdutos();
    }
    reader.readAsText(file);
  };
  
  // EXPORTAR PRODUTOS CSV
  document.getElementById("btnExportProduto").onclick=()=>{
    let csv="Nome,Preco,Quantidade\n";
    produtos.forEach(p=>csv+=`${p.nome},${p.preco},${p.qtd}\n`);
    const blob=new Blob([csv],{type:"text/csv"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download="produtos.csv"; a.click();
    URL.revokeObjectURL(url);
  };
  