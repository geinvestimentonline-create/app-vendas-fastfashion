import { db } from "./firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let totalLucro = 0;

window.salvar = async function(){
  const nome = document.getElementById("nome").value;
  const custo = parseFloat(document.getElementById("custo").value);

  let frete=25, embalagem=2, ads=0.05, imposto=0.05, margem=0.20;

  let base = custo + frete + embalagem;
  let preco = base/(1 - ads - imposto - margem);

  let lucro = preco - base;

  await addDoc(collection(db, "produtos"), {
    nome,
    custo,
    preco,
    lucro
  });

  carregar();
}

async function carregar(){
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  totalLucro = 0;

  const querySnapshot = await getDocs(collection(db, "produtos"));

  querySnapshot.forEach(doc=>{
    const p = doc.data();

    totalLucro += p.lucro;

    lista.innerHTML += `<li>${p.nome} - R$ ${p.preco.toFixed(2)} | Lucro: R$ ${p.lucro.toFixed(2)}</li>`;
  });

  document.getElementById("total").innerText =
    "Lucro Total Estimado: R$ " + totalLucro.toFixed(2);
}

carregar();