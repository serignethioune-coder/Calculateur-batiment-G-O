let recap = [];

function calculer(type) {
  let volume = 0;
  let dosage = "";
  if (type === "Fondations") {
    const L = parseFloat(document.getElementById("longueurFondation").value);
    const l = parseFloat(document.getElementById("largeurFondation").value);
    const h = parseFloat(document.getElementById("hauteurFondation").value);
    dosage = document.getElementById("dosageFondation").value;
    if (isNaN(L) || isNaN(l) || isNaN(h)) return alert("Dimensions manquantes");
    volume = L * l * h;
  }

  if (type === "Murs") {
    const L = parseFloat(document.getElementById("longueurMur").value);
    const h = parseFloat(document.getElementById("hauteurMur").value);
    const e = parseFloat(document.getElementById("epaisseurMur").value);
    dosage = document.getElementById("dosageMur").value;
    if (isNaN(L) || isNaN(h) || isNaN(e)) return alert("Dimensions manquantes");
    volume = L * h * e;
  }

  if (type === "Dalles") {
    const S = parseFloat(document.getElementById("surfaceDalle").value);
    const e = parseFloat(document.getElementById("epaisseurDalle").value);
    dosage = document.getElementById("dosageDalle").value;
    if (isNaN(S) || isNaN(e)) return alert("Dimensions manquantes");
    volume = S * e;
  }

  let ciment, sable, gravier, fer;
  if (dosage === "standard") {
    ciment = volume * 350 / 50;
    sable = volume * 0.45;
    gravier = volume * 0.85;
    fer = volume * 120;
  } else {
    ciment = volume * 400 / 50;
    sable = volume * 0.50;
    gravier = volume * 0.90;
    fer = volume * 150;
  }

  const ligne = {
    nom: type,
    ciment: ciment.toFixed(1),
    sable: sable.toFixed(2),
    gravier: gravier.toFixed(2),
    fer: fer.toFixed(0)
  };

  recap.push(ligne);
  afficherResultats();
  localStorage.setItem("recapitulatifMateriaux", JSON.stringify(recap));
}

function afficherResultats() {
  const tbody = document.getElementById("resultats");
  tbody.innerHTML = "";
  recap.forEach(item => {
    const row = `<tr>
      <td>${item.nom}</td>
      <td>${item.ciment}</td>
      <td>${item.sable}</td>
      <td>${item.gravier}</td>
      <td>${item.fer}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function exporterCSV() {
  let csv = "Ouvrage,Ciment (sacs),Sable (m³),Gravier (m³),Fer (kg)\n";
  recap.forEach(item => {
    csv += `${item.nom},${item.ciment},${item.sable},${item.gravier},${item.fer}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quantites_materiaux.csv";
  a.click();
}

window.onload = () => {
  const donnees = localStorage.getItem("recapitulatifMateriaux");
  if (donnees) {
    recap = JSON.parse(donnees);
    afficherResultats();
  }
};