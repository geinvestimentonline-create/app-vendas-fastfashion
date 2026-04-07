import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.salvar = async function(){
 let nome = document.getElementById("nome").value;
 let custo = parseFloat(document.getElementById("custo").value);

 let preco = (custo+27)/(1-0.30);

 await addDoc(collection(db,"produtos"),{nome,preco});
 alert("Salvo");
}
