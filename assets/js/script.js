const url = "https://restcountries.com/v3.1/all";
let obj;
async function getData() {
  try {
    const request = await fetch(url);
    const data = await request.json();
    obj = data;
    return data;
  } catch (error) {
    console.log(error);
  }
}

function createFlags(data) {
  for (let item of data) {
    let homeFlagDiv = document.createElement("div");
    let homeFlagImage = document.createElement("img");
    homeFlagImage.src = item.flags.svg;
    homeFlagImage.classList.add("flags");
    homeFlagDiv.classList.add("divFlags");
    homeFlagDiv.append(homeFlagImage);
    switch (item.continents[0]) {
      case "Europe":
        let Europe = document.getElementById("Europe");
        Europe.append(homeFlagDiv);
        break;
      case "Asia":
        let Asia = document.getElementById("Asia");
        Asia.append(homeFlagDiv);
        break;
      case "Africa":
        let Africa = document.getElementById("Africa");
        Africa.append(homeFlagDiv);
        break;
      case "North America":
        let NorthAmerica = document.getElementById("NorthAmerica");
        NorthAmerica.append(homeFlagDiv);
        break;
      case "South America":
        let SouthAmerica = document.getElementById("SouthAmerica");
        SouthAmerica.append(homeFlagDiv);
        break;
      case "Antarctica":
        let Antarctica = document.getElementById("Antarctica");
        Antarctica.append(homeFlagDiv);
        break;
      case "Oceania":
        let Oceania = document.getElementById("Oceania");
        Oceania.append(homeFlagDiv);
        break;
    }
    homeFlagDiv.addEventListener("click", createModal.bind(item));
  }
  return data;
}

function createModal() {
  //change modal display
  const modal = document.getElementsByClassName("modal")[0];
  modal.style.display = "block";

  //modal flags
  const modalflag = document.getElementById("flag");
  let modalFlagDiv = document.createElement("div");
  let modalFlagImage = document.createElement("img");
  modalFlagImage.src = this.flags.svg;
  modalFlagImage.classList.add("flags");
  modalFlagDiv.classList.add("modalDivFlags");
  modalFlagDiv.append(modalFlagImage);
  modalflag.append(modalFlagDiv);

  // modal time
  const modalTime = document.getElementById("time");
  const modalTimeP = document.createElement("p");
  modalTimeP.innerText = this.timezones[0];
  modalTime.append(modalTimeP);

  //modal country name
  const countryName = document.getElementById("country-name");
  countryName.innerText = this.name.common;

  //modal capital
  const modalCapital = document.getElementById("capital");
  const modalCapitalP = document.createElement("p");
  modalCapitalP.innerText = this.capital;
  modalCapital.append(modalCapitalP);

  //tabel
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${this.area ?? ""}</td>
    <td>${this.languages ? Object.values(this.languages) : ""}</td>
    <td>${this.population ?? ""}</td>
    <td>${this.latlng ?? ""}</td>
    <td>${this.borders ?? ""}</td>
  `;
  tbody.appendChild(tr);

  //blur
  const container = document.getElementsByClassName("container")[0];
  container.classList.add("blur");

  //close button
  let close = document.getElementById("close");
  close.addEventListener("click", function () {
    const modal = document.getElementsByClassName("modal")[0];
    modal.style.display = "none";
    modalFlagDiv.remove();
    modalTimeP.remove();
    modalCapitalP.remove();
    container.classList.remove("blur");
  });
}

function sort() {
  let sortData = obj.sort((a, b) => a.name.common.localeCompare(b.name.common));
  reset();

  createFlags(sortData);
}

function search(search) {
  const searchValue = search.toLowerCase();
  // let countryName = countries.name.common;
  const filterData = obj.filter((countries) => {
    return countries.name.common.toLowerCase().includes(searchValue);
  });
  reset();
  createFlags(filterData);
}

function reset() {
  document.getElementById("Europe").innerHTML = "";
  document.getElementById("Africa").innerHTML = "";
  document.getElementById("Asia").innerHTML = "";
  document.getElementById("NorthAmerica").innerHTML = "";
  document.getElementById("SouthAmerica").innerHTML = "";
  document.getElementById("Antarctica").innerHTML = "";
  document.getElementById("Oceania").innerHTML = "";
}
getData().then(createFlags);
