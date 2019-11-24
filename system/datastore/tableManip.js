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

// Populates a newly created row cell for items
function addRowCellNewItem(colClass, cell, entry) {

	// DYNAMICALLY ADD INPUT
	if (colClass == "tableColumn4") {
		var qtyInput = document.createElement("input");
		qtyInput.type = "number";
		qtyInput.classList.add("qty_input");
		cell.appendChild(qtyInput);
		cell.classList.add(colClass);
		// return to set id
		return qtyInput
	} else {
		let textNode = document.createTextNode(entry);
		cell.appendChild(textNode);
		cell.classList.add(colClass);
	}
}

// Populates a newly created row cell for customers
function addRowCellNewCustomer(colClass, cell, entry) {
	let textNode = document.createTextNode(entry);
	cell.appendChild(textNode);
	cell.classList.add(colClass);
}

// Inserts a given rowEntry into an existing empty row
function insertTableRowData(rowEntry, tableData, tableName) {
	console.log(tableData.rows.length);
	for (var rowIndex = 0; rowIndex < tableData.rows.length; rowIndex++) {
		// if current row is empty, populate
		if (tableData.rows[rowIndex].cells[0].innerHTML == '') {
			console.log('Found');
			if (tableName !== "custManip") {
				tableData.rows[rowIndex].cells[0].innerHTML = rowEntry[0];
				tableData.rows[rowIndex].cells[1].innerHTML = rowEntry[1];
				tableData.rows[rowIndex].cells[2].innerHTML = rowEntry[2].toFixed(2);
				if (tableName === "main") {
					var inputId = "row_" + (rowIndex+1) + "_qty_input";
					var input = document.getElementById(inputId);
					input.value = 1;
					//input.disabled = false;
					tableData.rows[rowIndex].cells[4].innerHTML = rowEntry[2].toFixed(2);
				} 
			} else {
				tableData.rows[rowIndex].cells[0].innerHTML = rowEntry[0];
				tableData.rows[rowIndex].cells[1].innerHTML = rowEntry[1] + " " + rowEntry[2];
				tableData.rows[rowIndex].cells[2].innerHTML = '(' + rowEntry[3].slice(0, 3) + ') ' + rowEntry[3].slice(3, 6) + '-' + rowEntry[3].slice(6, 9);
				let row = tableData.rows[rowIndex].cells[3];
				row.innerHTML = rowEntry[4] + ", " + rowEntry[5];
				row.innerHTML += ", " + rowEntry[6] + ", " + rowEntry[7];
			}
			break;
		}
	}	
}

// Creates a new row and populates its data
function insertTableRowDataNew(rowEntry, tableData, tableName) {
	let table = document.getElementById("Table-Data");
	let row = table.insertRow();

	var rowLen = table.rows.length;
	row.id = "row_" + rowLen;
	if(rowLen % 2 == 0) {
		row.classList.add("tableEntryB");
	} else {
		row.classList.add("tableEntryA");
	}

	if (tableName !== "custManip") {
		addRowCellNewItem(getColumnClass(0), row.insertCell(), rowEntry[0]);
		addRowCellNewItem(getColumnClass(1), row.insertCell(), rowEntry[1]);
		addRowCellNewItem(getColumnClass(2), row.insertCell(), rowEntry[2]);
		if (tableName === "main") {
			let input = addRowCellNewItem(getColumnClass(3), row.insertCell(), 1);
			input.id = "row_" + (rowLen) + "_qty_input";
			input.value = 1;
			input.disabled = true;
			input.min = "0";
			input.onchange = function () {  
			    updateProductTotal(input.value, input.id);
			};
			addRowCellNew(getColumnClass(4), row.insertCell(), rowEntry[2]);
		}
	} else {
		addRowCellNewCustomer(getColumnClass(0), row.insertCell(), rowEntry[0]);
		addRowCellNewCustomer(getColumnClass(1), row.insertCell(), rowEntry[1] + " " + rowEntry[2]);
		addRowCellNewCustomer(getColumnClass(2), row.insertCell(), ('(' + rowEntry[3].slice(0, 3) + ') ' + rowEntry[3].slice(3, 6) + '-' + rowEntry[3].slice(6, 9)));
		addRowCellNewCustomer(getColumnClass(3), row.insertCell(), rowEntry[4] + ", " + rowEntry[5] + ", " + rowEntry[6]);
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
				addRowCellNewItem(getColumnClass(0), newRow.insertCell(), "");
				addRowCellNewItem(getColumnClass(1), newRow.insertCell(), "");
				addRowCellNewItem(getColumnClass(2), newRow.insertCell(), "");
				if (src === "main") {
					addRowCellNewItem(getColumnClass(3), newRow.insertCell(), "");
					addRowCellNewItem(getColumnClass(4), newRow.insertCell(), "");
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
		if (src === "main") {
			row.cells[3].children[0].id = "row_" + (rowIndex+1) + "_qty_input";
			if (!row.classList.contains('selectedRow')) {
				row.cells[3].children[0].disabled = "true";
			}
		}

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
	    let checkExists = alreadyExists(rowEntry);
		if (tableData.rows[20].cells[0].innerHTML == '') {
			console.log("Empty Case");
		    if (checkExists[0]) {
			tableData.rows[checkExists[1]].cells[3].getElementsByTagName('input')[0].stepUp();
			let qty = tableData.rows[checkExists[1]].cells[3].getElementsByTagName('input')[0].value;
			tableData.rows[checkExists[1]].cells[4].innerHTML = (tableData.rows[checkExists[1]].cells[2].innerHTML * qty).toFixed(2);
			console.log(tableData.rows[checkExists[1]].cells[2].innerHTML, qty);
			console.log("Already present in table. Incremented quantity.");
		    }
		    else {
			insertTableRowData(rowEntry, tableData, "main");
		    }
		} else {
			// Populate rest of table
			console.log("Non-Empty Case");
			insertTableRowDataNew(rowEntry, tableData, "main");
		}
	}

}

//checks for existing row items
function alreadyExists(rowEntry) {
    let table = document.getElementById("Table-Data");
    for (let i=0; i<table.rows.length; ++i) {
	if (table.rows[i].cells[0].innerHTML == rowEntry[0].toString()) {
	    return [true, i];
	}
    }
    return [false, -1]
}

// Generates a brand-new table for refresh functionality
function generateTable(products, tableData, tableName) {
	for (var productIndex = 0; productIndex < products.length; productIndex++) {
		console.log(products.length);
		// Check if last open table is empty
		let rowEntry = products[productIndex];

		if (tableData.rows[14].cells[0].innerHTML == '') {
			console.log("Empty Case");
			insertTableRowData(rowEntry, tableData, tableName);
		} else {
			// Populate rest of table
			console.log("Non-Empty Case");
			insertTableRowDataNew(rowEntry, tableData, tableName);
		}
	}
}

// Resets table to intial empty state
function cleanupTable(tableData, tableName) {
	var numRows = tableData.rows.length;
	for (var rowIndex = numRows-1; rowIndex >= 0; rowIndex--) {
		tableData.deleteRow(rowIndex);
	}
	// Reset layout
	var count = 1;
	for (rowIndex = 0; rowIndex < 15; rowIndex++) {
		var newRow;
		if (tableName !== "custManip") {
			newRow = tableData.insertRow();
			addRowCellNewItem(getColumnClass(0), newRow.insertCell(), "");
			addRowCellNewItem(getColumnClass(1), newRow.insertCell(), "");
			addRowCellNewItem(getColumnClass(2), newRow.insertCell(), "");
		} else {
			newRow = tableData.insertRow();
			addRowCellNewCustomer(getColumnClass(0), newRow.insertCell(), "");
			addRowCellNewCustomer(getColumnClass(1), newRow.insertCell(), "");
			addRowCellNewCustomer(getColumnClass(2), newRow.insertCell(), "");
			addRowCellNewCustomer(getColumnClass(3), newRow.insertCell(), "");
		}

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
function refreshListing(products, tableName) {
	var tableData = document.getElementById("Table-Data");

	if (products.length != 0) {
		// for row in products, add row to table
		// if row# exists -> add to empty row, else populate new row
		if (tableData.rows[0].cells[0].innerHTML == '') {
			// generate new table
			generateTable(products, tableData, tableName);
		} else { 
			//remove all entries
			cleanupTable(tableData, tableName);
			// Generate new table
			generateTable(products, tableData, tableName);
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

// Returns data for the currently selected customer in the form of a list
function getCustomerData() {
	var tableData = document.getElementById("Table-Data");
	var numRows = tableData.rows.length;
	for (rowIndex = 0; rowIndex < numRows; rowIndex++) {
		let row = tableData.rows[rowIndex];
		if (row.classList.contains("selectedRow")) {
			// check to see if the customer has a valid CID
			if (row.cells[0].innerHTML !== '') {
				var customerData = [row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML];
				return customerData;
			}
		}
	}
	return [];
}

module.exports = { addMainTableItem, deleteSelectedItems, refreshListing, editSelectedItem, getSkuFromSelected, getInputSku, getInputDescription, getInputPrice, getCustomerData };
