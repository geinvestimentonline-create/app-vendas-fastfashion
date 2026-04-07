import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const el = document.getElementById("products");

async function carregar(){
  const querySnapshot = await getDocs(collection(db, "produtos"));

  querySnapshot.forEach(doc=>{
    const p = doc.data();

    el.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
      <button onclick="buy('${p.nome}')">Comprar</button>
    </div>`;
  });
}

window.buy = function(n){
  window.open(`https://wa.me/5511933872929?text=Quero comprar ${n}`);
}

carregar();