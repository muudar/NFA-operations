let firstTableActive = false;
let secondTableActive = false;

let table1 = [];
let table2 = [];

document.getElementById("firstNFAMaking").onclick = () => {
  let val = document.getElementById("first-nfa-number").value;
  if (val > 10 || val < 2) {
    alert("Enter number between 2 and 10");
    return;
  }
  for (let i = 0; i < val; i++) {
    table1[i] = [];
    for (let j = 0; j < val; j++) {
      table1[i][j] = null;
    }
  }
  let table = document.createElement("table");
  table.id = "first-nfa-table";
  let firstRow = document.createElement("tr");
  table.appendChild(firstRow);
  firstRow.appendChild(document.createElement("th"));
  for (let i = 0; i < val; i++) {
    let header = document.createElement("th");
    firstRow.appendChild(header);
    header.textContent = "f" + i;
  }
  for (let i = 0; i < val; i++) {
    let row = document.createElement("tr");
    let header = document.createElement("th");
    row.appendChild(header);
    header.textContent = "f" + i;
    for (let j = 0; j < val; j++) {
      let data = document.createElement("td");
      let input = document.createElement("input");
      input.classList.add("transition-input");
      data.appendChild(input);
      row.appendChild(data);
    }
    table.appendChild(row);
  }
  document.getElementsByClassName("first-nfa-input")[0].innerHTML = "";
  document.getElementsByClassName("first-nfa-input")[0].appendChild(table);
  let ths = document.getElementsByTagName("th");
  for (let i = 0; i < ths.length; i++) {
    let th = ths[i];
    th.onclick = () => {
      let thisTextContent = th.textContent;
      for (let j = 0; j < ths.length; j++) {
        let thatTextContent = ths[j].textContent;
        if (thisTextContent == thatTextContent) {
          th.classList.toggle("th-accepted");
          ths[j].classList.toggle("th-accepted");
        }
      }
    };
  }
  firstTableActive = true;
  if (firstTableActive && secondTableActive) {
    let buttons = document.getElementsByClassName("operations-container")[0];
    buttons.style.visibility = "visible";
  }
};

document.getElementById("secondNFAMaking").onclick = () => {
  let val = document.getElementById("second-nfa-number").value;
  if (val > 10 || val < 2) {
    alert("Enter number between 2 and 10");
    return;
  }
  for (let i = 0; i < val; i++) {
    table2[i] = [];
    for (let j = 0; j < val; j++) {
      table2[i][j] = null;
    }
  }
  let table = document.createElement("table");
  table.id = "second-nfa-table";
  let firstRow = document.createElement("tr");
  table.appendChild(firstRow);
  firstRow.appendChild(document.createElement("th"));
  for (let i = 0; i < val; i++) {
    let header = document.createElement("th");
    firstRow.appendChild(header);
    header.textContent = "s" + i;
  }
  for (let i = 0; i < val; i++) {
    let row = document.createElement("tr");
    let header = document.createElement("th");
    row.appendChild(header);
    header.textContent = "s" + i;
    for (let j = 0; j < val; j++) {
      let data = document.createElement("td");
      let input = document.createElement("input");
      input.classList.add("transition-input");
      data.appendChild(input);
      row.appendChild(data);
    }
    table.appendChild(row);
  }
  document.getElementsByClassName("second-nfa-input")[0].innerHTML = "";
  document.getElementsByClassName("second-nfa-input")[0].appendChild(table);
  let ths = document.getElementsByTagName("th");
  for (let i = 0; i < ths.length; i++) {
    let th = ths[i];
    th.onclick = () => {
      let thisTextContent = th.textContent;
      for (let j = 0; j < ths.length; j++) {
        let thatTextContent = ths[j].textContent;
        if (thisTextContent == thatTextContent) {
          th.classList.toggle("th-accepted");
          ths[j].classList.toggle("th-accepted");
        }
      }
    };
  }
  secondTableActive = true;
  if (firstTableActive && secondTableActive) {
    let buttons = document.getElementsByClassName("operations-container")[0];
    buttons.style.visibility = "visible";
  }
};
document.getElementById("concatenation-btn").onclick = () => {
  document.getElementById("output-table").innerHTML = "";
  let finishes1 = [];
  let finishes2 = [];
  let ths = document.getElementsByTagName("th");
  for (let i = 0; i < ths.length; i++) {
    let th = ths[i];
    if (th.classList.contains("th-accepted")) {
      if (
        th.parentElement.parentElement.parentElement.classList.contains(
          "first-nfa-input"
        )
      ) {
        finishes1.push(i);
      }
      if (
        th.parentElement.parentElement.parentElement.classList.contains(
          "second-nfa-input"
        )
      ) {
        finishes2.push(i - table1.length - 1);
      }
    }
  }
  finishes1 = finishes1.slice(0, finishes1.length / 2);
  finishes2 = finishes2.slice(0, finishes2.length / 2);
  let firstNfaTable = document.getElementById("first-nfa-table");
  let secondNFATable = document.getElementById("second-nfa-table");
  for (let i = 0; i < table1.length; i++) {
    for (let j = 0; j < table1[i].length; j++) {
      table1[i][j] =
        firstNfaTable.children[i + 1].children[j + 1].children[0].value;
    }
  }
  for (let i = 0; i < table2.length; i++) {
    for (let j = 0; j < table2[i].length; j++) {
      table2[i][j] =
        secondNFATable.children[i + 1].children[j + 1].children[0].value;
    }
  }
  let newLen = table1.length + table2.length;
  let table3 = [];
  for (let i = 0; i < newLen; i++) {
    table3[i] = [];
    for (let j = 0; j < newLen; j++) {
      table3[i][j] = null;
    }
  }
  for (let i = 0; i < table1.length + table2.length; i++) {
    for (let j = 0; j < table1.length + table2.length; j++) {
      if (i < table1.length) {
        table3[i][j] = table1[i][j];
      } else {
        table3[i][j + table1.length] = table2[i - table1.length][j];
      }
    }
  }
  console.log(table3);
  let htmlTable = document.createElement("table");
  let firstRow = document.createElement("tr");
  htmlTable.appendChild(firstRow);
  firstRow.appendChild(document.createElement("th"));
  for (let i = 0; i < table3.length; i++) {
    let header = document.createElement("th");
    firstRow.appendChild(header);
    header.textContent = "q" + i;
  }
  console.log(finishes1);
  console.log(finishes2);
  for (let i = 0; i < finishes1.length; i++) {
    let f = finishes1[i];
    table3[f - 1][table1.length] = "e";
  }
  for (let i = 0; i < table3.length; i++) {
    let addedRow = document.createElement("tr");
    for (let j = 0; j < table3.length + 1; j++) {
      if (j == 0) {
        let addedHeader = document.createElement("th");
        if (finishes2.includes(i + 1)) {
          addedHeader.classList.add("th-accepted");
        }
        addedHeader.textContent = "q" + i;
        addedRow.appendChild(addedHeader);
        continue;
      }
      let data = document.createElement("td");
      data.textContent = table3[i][j - 1];
      addedRow.appendChild(data);
    }
    htmlTable.appendChild(addedRow);
  }
  document.getElementById("output-table").appendChild(htmlTable);
};

document.getElementById("alternation-btn").onclick = () => {
  document.getElementById("output-table").innerHTML = "";
  let finishes1 = [];
  let finishes2 = [];
  let ths = document.getElementsByTagName("th");
  for (let i = 0; i < ths.length; i++) {
    let th = ths[i];
    if (th.classList.contains("th-accepted")) {
      if (
        th.parentElement.parentElement.parentElement.classList.contains(
          "first-nfa-input"
        )
      ) {
        finishes1.push(i);
      }
      if (
        th.parentElement.parentElement.parentElement.classList.contains(
          "second-nfa-input"
        )
      ) {
        finishes2.push(i - table1.length - 1);
      }
    }
  }
  finishes1 = finishes1.slice(0, finishes1.length / 2);
  finishes2 = finishes2.slice(0, finishes2.length / 2);
  let firstNfaTable = document.getElementById("first-nfa-table");
  let secondNFATable = document.getElementById("second-nfa-table");
  for (let i = 0; i < table1.length; i++) {
    for (let j = 0; j < table1[i].length; j++) {
      table1[i][j] =
        firstNfaTable.children[i + 1].children[j + 1].children[0].value;
    }
  }
  for (let i = 0; i < table2.length; i++) {
    for (let j = 0; j < table2[i].length; j++) {
      table2[i][j] =
        secondNFATable.children[i + 1].children[j + 1].children[0].value;
    }
  }
  let newLen = table1.length + table2.length + 1;
  let table3 = [];
  for (let i = 0; i < newLen; i++) {
    table3[i] = [];
    for (let j = 0; j < newLen; j++) {
      table3[i][j] = null;
    }
  }
  table3[0][1] = "e";
  table3[0][table1.length + 1] = "e";
  for (let i = 0; i < table1.length + table2.length; i++) {
    for (let j = 0; j < table1.length + table2.length; j++) {
      if (i < table1.length) {
        table3[i + 1][j + 1] = table1[i][j];
      } else {
        table3[i][j + table1.length + 1] = table2[i - table1.length][j];
      }
    }
  }
  console.log(table3);
  let htmlTable = document.createElement("table");
  let firstRow = document.createElement("tr");
  htmlTable.appendChild(firstRow);
  firstRow.appendChild(document.createElement("th"));
  for (let i = 0; i < table3.length; i++) {
    let header = document.createElement("th");
    firstRow.appendChild(header);
    header.textContent = "q" + i;
  }
  console.log(finishes1);
  console.log(finishes2);
  for (let i = 0; i < table3.length; i++) {
    let addedRow = document.createElement("tr");
    for (let j = 0; j < table3.length + 1; j++) {
      if (j == 0) {
        let addedHeader = document.createElement("th");
        if (finishes1.includes(i) || finishes2.includes(i)) {
          addedHeader.classList.add("th-accepted");
        }
        addedHeader.textContent = "q" + i;
        addedRow.appendChild(addedHeader);
        continue;
      }
      let data = document.createElement("td");
      data.textContent = table3[i][j - 1];
      addedRow.appendChild(data);
    }
    htmlTable.appendChild(addedRow);
  }
  document.getElementById("output-table").appendChild(htmlTable);
};

function findPaths(adjacencyMatrix) {
  const numNodes = adjacencyMatrix.length;

  const resultMatrix = Array.from({ length: numNodes }, () =>
    Array(numNodes).fill(0)
  );

  for (let i = 0; i < numNodes; i++) {
    for (let j = 0; j < numNodes; j++) {
      resultMatrix[i][j] = adjacencyMatrix[i][j];
    }
  }

  for (let k = 0; k < numNodes; k++) {
    for (let i = 0; i < numNodes; i++) {
      for (let j = 0; j < numNodes; j++) {
        resultMatrix[i][j] =
          resultMatrix[i][j] || (resultMatrix[i][k] && resultMatrix[k][j]);
      }
    }
  }

  return resultMatrix;
}

document.getElementById("closure-btn").onclick = () => {
  let firstNfaTable = document.getElementById("first-nfa-table");
  let secondNFATable = document.getElementById("second-nfa-table");
  for (let i = 0; i < table1.length; i++) {
    for (let j = 0; j < table1.length; j++) {
      let text =
        firstNfaTable.children[i + 1].children[j + 1].children[0].value;
      table1[i][j] = text.includes("e") ? 1 : 0;
    }
  }
  for (let i = 0; i < table2.length; i++) {
    for (let j = 0; j < table2.length; j++) {
      let text =
        secondNFATable.children[i + 1].children[j + 1].children[0].value;
      table2[i][j] = text.includes("e") ? 1 : 0;
    }
  }
  const res1 = findPaths(table1);
  const res2 = findPaths(table2);
  document.getElementById("output-table").innerHTML = "";
  let div1 = document.createElement("div");
  div1.classList.add("flex-col");
  for (let i = 0; i < res1.length; i++) {
    let insideDiv = document.createElement("div");
    let line = "f" + i + " closure: [f" + i;
    for (let j = 0; j < res1.length; j++) {
      if (i != j && res1[i][j] == 1) {
        line += ", f" + j;
      }
    }
    line += "]";
    insideDiv.textContent = line;
    div1.appendChild(insideDiv);
  }
  let div2 = document.createElement("div");
  div2.classList.add("flex-col");
  for (let i = 0; i < res2.length; i++) {
    let insideDiv = document.createElement("div");
    let line = "s" + i + " closure: [s" + i;
    for (let j = 0; j < res2.length; j++) {
      if (i != j && res2[i][j] == 1) {
        line += ", f" + j;
      }
    }
    line += "]";
    insideDiv.textContent = line;
    div2.appendChild(insideDiv);
  }
  document.getElementById("output-table").appendChild(div1);
  document.getElementById("output-table").appendChild(div2);
};
