// Returns the string name for a styling class, based on column index
function getColumnClass(colIndex) {
	switch(colIndex) {
		case(0):
			return "tableColumn1";
		case(1):
			return "tableColumn2";
		case(2):
			return "tableColumn3";
		case(3):
			return "tableColumn4";
		default:
			return "tableColumn5";
	}

}

// Returns the SKU for a selected row in the Item Manipulation table
function getSkuFromSelected() {
	var tableData = document.getElementById("Table-Data");
    for (var rowIndex = 0; rowIndex < tableData.rows.length; rowIndex++) {
        if (tableData.rows[rowIndex].classList.contains('selectedRow')) {
            var sku = tableData.rows[rowIndex].cells[0].innerHTML;
            return sku;
        }
    }
}

// Returns the itemSKU input
function getInputSku() {
	var newSkuText = document.getElementById("itemSKU").value;
	return newSkuText;
}

// Returns the itemDescription input
function getInputDescription() {
	var newDescText = document.getElementById("itemDescription").value;
	return newDescText;
}

// Returns the itemUnitPrice input
function getInputPrice() {
	var newPriceText = document.getElementById("itemUnitPrice").value;
	return newPriceText;
}

// Populates a newly created row cell
function addRowCellNew(colClass, cell, entry) {
	let textNode = document.createTextNode(entry);
	cell.appendChild(textNode);
	cell.classList.add(colClass);
}

// Inserts a given rowEntry into an existing empty row
function insertTableRowData(rowEntry, tableData, isMain) {
	console.log(tableData.rows.length);
	for (var rowIndex = 0; rowIndex < tableData.rows.length; rowIndex++) {
		// if current row is empty, populate
		if (tableData.rows[rowIndex].cells[0].innerHTML == '') {
			console.log('Found');
			tableData.rows[rowIndex].cells[0].innerHTML = rowEntry[0];
			tableData.rows[rowIndex].cells[1].innerHTML = rowEntry[1];
			tableData.rows[rowIndex].cells[2].innerHTML = rowEntry[2];
			if (isMain) {
				tableData.rows[rowIndex].cells[3].innerHTML = 1;
				tableData.rows[rowIndex].cells[4].innerHTML = rowEntry[2];
			}
			break;
		}
	}	
}

// Creates a new row and populates its data
function insertTableRowDataNew(rowEntry, tableData, isMain) {
	let table = document.getElementById("Table-Data");
	let row = table.insertRow();

	var rowLen = table.rows.length;
	row.id = "row_" + rowLen;
	if(rowLen % 2 == 0) {
		row.classList.add("tableEntryB");
	} else {
		row.classList.add("tableEntryA");
	}

	addRowCellNew(getColumnClass(0), row.insertCell(), rowEntry[0]);
	addRowCellNew(getColumnClass(1), row.insertCell(), rowEntry[1]);
	addRowCellNew(getColumnClass(2), row.insertCell(), rowEntry[2]);
	if (isMain) {
		addRowCellNew(getColumnClass(3), row.insertCell(), 1);
		addRowCellNew(getColumnClass(4), row.insertCell(), rowEntry[2]);
	}
}

// Deletes all rows with selected class applied
function deleteSelectedItems(src) {
	var startingRows;
	if (src === "main") {
		startingRows = 21;
	} else {
		startingRows = 15;
	}
	var table = document.getElementById("Table-Data");
	var numRows = table.rows.length;
	var count = 1;
	for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
		console.log(rowIndex); 
		var row = table.rows[rowIndex];
		if (row.classList.contains('selectedRow')) {
			if (rowIndex < startingRows && numRows == startingRows) {
				row.classList.remove('selectedRow');
				table.deleteRow(rowIndex);
				let newRow = table.insertRow();
				addRowCellNew(getColumnClass(0), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(1), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(2), newRow.insertCell(), "");
				if (src === "main") {
					addRowCellNew(getColumnClass(3), newRow.insertCell(), "");
					addRowCellNew(getColumnClass(4), newRow.insertCell(), "");
				}
			} else {
				row.classList.remove('selectedRow');
				table.deleteRow(rowIndex);
				numRows--;
			}
		}
	}
	count = 1;
	for (rowIndex = 0; rowIndex < numRows; rowIndex++) {
		row = table.rows[rowIndex];
		row.id = "row_" + count;

		// styling fix
		if (row.classList.contains('tableEntryB')) {
			row.classList.remove('tableEntryB');
		} else if (row.classList.contains('tableEntryA')) {
			row.classList.remove('tableEntryA');
		}
		if((count % 2) == 0) {
			row.classList.add("tableEntryB");
		} else {
			row.classList.add("tableEntryA");
		}

		count += 1;
	}
}

// Populates main POS display table on SKU search entry.
function addMainTableItem(rowEntry) {
	console.log('rowEntry : ' + rowEntry);

	// Check if last row is empty
	if (rowEntry.length != 0) {
		// Check if last open table is empty
		var tableData = document.getElementById("Table-Data");
		if (tableData.rows[20].cells[0].innerHTML == '') {
			console.log("Empty Case");
			insertTableRowData(rowEntry, tableData, true);
		} else {
			// Populate rest of table
			console.log("Non-Empty Case");
			insertTableRowDataNew(rowEntry, tableData, true);
		}
	}
}

// Generates a brand-new table for refresh functionality
function generateTable(products, tableData) {
	for (var productIndex = 0; productIndex < products.length; productIndex++) {
		console.log(products.length);
		// Check if last open table is empty
		let rowEntry = products[productIndex];

		if (tableData.rows[14].cells[0].innerHTML == '') {
			console.log("Empty Case");
			insertTableRowData(rowEntry, tableData, false);
		} else {
			// Populate rest of table
			console.log("Non-Empty Case");
			insertTableRowDataNew(rowEntry, tableData, false);
		}
	}
}

// Resets table to intial empty state
function cleanupTable(tableData) {
	var numRows = tableData.rows.length;
	for (var rowIndex = numRows-1; rowIndex >= 0; rowIndex--) {
		tableData.deleteRow(rowIndex);
	}
	// Reset layout
	var count = 1;
	for (rowIndex = 0; rowIndex < 15; rowIndex++) {
		let newRow = tableData.insertRow();
		addRowCellNew(getColumnClass(0), newRow.insertCell(), "");
		addRowCellNew(getColumnClass(1), newRow.insertCell(), "");
		addRowCellNew(getColumnClass(2), newRow.insertCell(), "");

		row = tableData.rows[rowIndex];
		row.id = "row_" + count;

		if((count % 2) == 0) {
			newRow.classList.add("tableEntryB");
		} else {
			newRow.classList.add("tableEntryA");
		}

		count += 1;
	}
}

// On a Refresh Table click, populate the item manipulation table
function getProductListing(products) {
	var tableData = document.getElementById("Table-Data");

	if (products.length != 0) {
		// for row in products, add row to table
		// if row# exists -> add to empty row, else populate new row
		if (tableData.rows[0].cells[0].innerHTML == '') {
			// generate new table
			generateTable(products, tableData);
		} else { 
			//remove all entries
			cleanupTable(tableData);
			// Generate new table
			generateTable(products, tableData);
		}
	}

}

// Edits a selected row by replacing: sku, description, and unit price with input data  
function editSelectedItem(){
	var newSkuText = getSkuFromSelected();
	var newDescText = getInputDescription();
	var newPriceText = getInputPrice();

	var tableData = document.getElementById("Table-Data");
	var numRows = tableData.rows.length;
	for (rowIndex = 0; rowIndex < numRows; rowIndex++) {
		let row = tableData.rows[rowIndex];
		if (row.classList.contains("selectedRow")) {
			// Requires further input sanitation
			if (newSkuText !== '' && newDescText !== '' && newPriceText !== '') {
				var skuText = row.cells[0].innerHTML = newSkuText;
				var descText = row.cells[1].innerHTML = newDescText;
				var priceText = row.cells[2].innerHTML = newPriceText;
			}
		}
	}
}

module.exports = { addMainTableItem, deleteSelectedItems, getProductListing, editSelectedItem, getSkuFromSelected, getInputSku, getInputDescription, getInputPrice };