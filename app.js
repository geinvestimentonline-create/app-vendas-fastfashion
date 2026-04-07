import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const el = document.getElementById("products");

async function carregar(){
 const snapshot = await getDocs(collection(db, "produtos"));
 snapshot.forEach(doc=>{
  const p = doc.data();
  el.innerHTML += `<div><h3>${p.nome}</h3><p>R$ ${p.preco}</p></div>`;
 });
}
carregar();
