/* 
table-sort-js
Author: Lee Wannacott
Licence: MIT License Copyright (c) 2021 Lee Wannacott 
    
GitHub Repository: https://github.com/LeeWannacott/table-sort-js
npm package: https://www.npmjs.com/package/table-sort-js
Demo: https://leewannacott.github.io/Portfolio/#/GitHub
Install:
Frontend: <script src="https://leewannacott.github.io/table-sort-js/table-sort.js"></script> or
Download this file and add <script src="table-sort.js"></script> to your HTML 
Backend: npm install table-sort-js and use require("../node_modules/table-sort-js/table-sort.js") 
Instructions:
  Add class="table-sort" to tables you'd like to make sortable
  Click on the table headers to sort them.
*/

function tableSortJs(test = false, domDocumentWindow = document) {
  function checkIfTesting() {
    if (test === true) {
      const getTagTable = domDocumentWindow.getElementsByTagName("table");
      const createTableHead = domDocumentWindow.createElement("thead");
      return [getTagTable, createTableHead];
    } else {
      const getTagTable = document.getElementsByTagName("table");
      const createTableHead = document.createElement("thead");
      return [getTagTable, createTableHead];
    }
  }
  const [getTagTable, createTableHead] = checkIfTesting();
  const columnIndexAndTableRow = {};
  const fileSizeColumnTextAndRow = {};
  for (let table of getTagTable) {
    if (table.classList.contains("table-sort")) {
      makeTableSortable(table);
    }
  }

  function makeTableSortable(sortableTable) {
    if (sortableTable.getElementsByTagName("thead").length === 0) {
      createTableHead;
      the.appendChild(sortableTable.rows[0]);
      sortableTable.insertBefore(the, sortableTable.firstChild);
    }

    const tableHead = sortableTable.querySelector("thead");
    const tableBody = sortableTable.querySelector("tbody");
    const tableHeadHeaders = tableHead.querySelectorAll("th");
    tableHead.style.cursor = "pointer";

    let columnIndexesClicked = [];
    for (let [columnIndex, th] of tableHeadHeaders.entries()) {
      let timesClickedColumn = 0;

      th.addEventListener("click", function () {
        const tableRows = tableBody.querySelectorAll("tr");
        const columnData = [];
        // Handle filesize sorting (e.g KB, MB, GB, TB) - Turns data into KiB.
        let isFileSize = th.classList.contains("file-size");
        if (isFileSize) {
          const numberWithUnitType = /[.0-9]+(\s?B|\s?KB|\s?KiB|\s?MB|\s?MiB|\s?GB|\s?GiB|T\s?B|\s?TiB)/i;
          const unitType = /(\s?B|\s?KB|\s?KiB|\s?MB|\s?MiB|\s?GB|G\s?iB|\s?TB|\s?TiB)/i;
          const fileSizes = {
            Kibibyte: 1024,
            Mebibyte: 1.049e6,
            Gibibyte: 1.074e9,
            Tebibyte: 1.1e12,
            Pebibyte: 1.126e15,
            Kilobyte: 1000,
            Megabyte: 1e6,
            Gigabyte: 1e9,
            Terabyte: 1e12,
          };
          for (let [i, tr] of tableRows.entries()) {
            let fileSizeTd = tr.querySelectorAll("td").item(columnIndex)
              .textContent;
            if (fileSizeTd.match(numberWithUnitType)) {
              if (fileSizeTd.match(/\s?KB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Kilobyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?KiB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Kibibyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?MB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Megabyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?MiB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Mebibyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?GB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Gigabyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?GiB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Gibibyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?TB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Terabyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?TiB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                fileSizeTd = fileSizeTd.replace(
                  fileSizeTd,
                  fileSizeTd * fileSizes.Tebibyte
                );
                columnData.push(`${fileSizeTd}#${i}`);
              } else if (fileSizeTd.match(/\s?B/i)) {
                fileSizeTd = fileSizeTd.replace(unitType, "");
                columnData.push(`${fileSizeTd}#${i}`);
              }
            } else {
              columnData.push(`!X!Y!Z!#${i}`);
            }
          }
        }

        // Checking if user has clicked different column from the first column if yes reset times clicked.
        columnIndexesClicked.push(columnIndex);
        if (timesClickedColumn === 1 && columnIndexesClicked.length > 1) {
          const lastColumnClicked =
            columnIndexesClicked[columnIndexesClicked.length - 1];
          const secondLastColumnClicked =
            columnIndexesClicked[columnIndexesClicked.length - 2];
          if (lastColumnClicked !== secondLastColumnClicked) {
            timesClickedColumn = 0;
            columnIndexesClicked.shift();
          }
        }

        timesClickedColumn += 1;

        getTableData();
        updateTable();

        function updateTable() {
          for (let [i, tr] of tableRows.entries()) {
            if (isFileSize) {
              tr.innerHTML = fileSizeColumnTextAndRow[columnData[i]];
              let fileSizeInBytesHTML = tr
                .querySelectorAll("td")
                .item(columnIndex).innerHTML;
              let fileSizeInBytesText = tr
                .querySelectorAll("td")
                .item(columnIndex).textContent;
              const fileSizes = {
                Kibibyte: 1024,
                Mebibyte: 1.049e6,
                Gibibyte: 1.074e9,
                Tebibyte: 1.1e12,
                Pebibyte: 1.126e15,
              };
              // Remove the unique identifyer for duplicate values(#number).
              columnData[i] = columnData[i].replace(/#[0-9]*/,"");
              if (columnData[i] < fileSizes.Kibibyte) {
                fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
                  fileSizeInBytesText,
                  `${parseFloat(columnData[i]).toFixed(2)} B`
                );
              } else if (
                columnData[i] >= fileSizes.Kibibyte &&
                columnData[i] < fileSizes.Mebibyte
              ) {
                fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
                  fileSizeInBytesText,
                  `${(columnData[i] / fileSizes.Kibibyte).toFixed(2)} KiB`
                );
              } else if (
                columnData[i] >= fileSizes.Mebibyte &&
                columnData[i] < fileSizes.Gibibyte
              ) {
                fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
                  fileSizeInBytesText,
                  `${(columnData[i] / fileSizes.Mebibyte).toFixed(2)} MiB`
                );
              } else if (
                columnData[i] >= fileSizes.Gibibyte &&
                columnData[i] < fileSizes.Tebibyte
              ) {
                fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
                  fileSizeInBytesText,
                  `${(columnData[i] / fileSizes.Gibibyte).toFixed(2)} GiB`
                );
              } else if (
                columnData[i] >= fileSizes.Tebibyte &&
                columnData[i] < fileSizes.Pebibyte
              ) {
                fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
                  fileSizeInBytesText,
                  `${(columnData[i] / fileSizes.Tebibyte).toFixed(2)} TiB`
                );
              } else {
                fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
                  fileSizeInBytesText,
                  "NaN"
                );
              }
              tr
                .querySelectorAll("td")
                .item(columnIndex).innerHTML = fileSizeInBytesHTML;
            } else if (!isFileSize) {
              tr.innerHTML = columnIndexAndTableRow[columnData[i]];
            }
          }
        }

        function getTableData() {
          for (let [i, tr] of tableRows.entries()) {
            // inner text for column we click on
            let tdTextContent = tr.querySelectorAll("td").item(columnIndex)
              .textContent;
            if (tdTextContent.length === 0) {
              tdTextContent = "";
            }
            if (tdTextContent.trim() !== "") {
              if (!isFileSize) {
                columnData.push(`${tdTextContent}#${i}`);
                columnIndexAndTableRow[`${tdTextContent}#${i}`] = tr.innerHTML;
              } else if (isFileSize) {
                fileSizeColumnTextAndRow[columnData[i]] = tr.innerHTML;
              }
            } else {
              // Fill in blank table cells dict key with filler value.
              columnData.push(`!X!Y!Z!#${i}`);
              columnIndexAndTableRow[`!X!Y!Z!#${i}`] = tr.innerHTML;
            }
          }

          function naturalSortAescending(a, b) {
            if (a.includes("X!Y!Z!#")) {
              return 1;
            } else if (b.includes("X!Y!Z!#")) {
              return -1;
            } else {
              return a.localeCompare(
                b,
                navigator.languages[0] || navigator.language,
                { numeric: true, ignorePunctuation: true }
              );
            }
          }

          function naturalSortDescending(a, b) {
            return naturalSortAescending(b, a);
          }

          function clearArrows(arrowUp = "▲", arrowDown = "▼") {
            th.innerText = th.innerText.replace(arrowUp, "");
            th.innerText = th.innerText.replace(arrowDown, "");
          }

          let arrowUp = " ▲";
          let arrowDown = " ▼";

          // Sort naturally; default aescending unless th contains 'order-by-desc' as className.
          if (columnData[0] === undefined) {
            return;
          }

          let desc = th.classList.contains("order-by-desc");
          let tableArrows = sortableTable.classList.contains("table-arrows");

          if (timesClickedColumn === 1) {
            if (desc) {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowDown);
              }
              columnData.sort(naturalSortDescending, {
                numeric: true,
                ignorePunctuation: true,
              });
            } else {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowUp);
              }
              columnData.sort(naturalSortAescending);
            }
          } else if (timesClickedColumn === 2) {
            timesClickedColumn = 0;
            if (desc) {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowUp);
              }
              columnData.sort(naturalSortAescending, {
                numeric: true,
                ignorePunctuation: true,
              });
            } else {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowDown);
              }
              columnData.sort(naturalSortDescending);
            }
          }
        }
      });
    }
  }
}

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  tableSortJs();
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", tableSortJs, false);
}
if (typeof module == "object") {
  module.exports = tableSortJs;
}
