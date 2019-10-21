// Returns a product entry as a list via its sku
function getProductBySku(sku) {
	var product = [556278, "An example item description", 44.99];
	if (product[0] == sku) {
		return product;
	}
	return undefined;
}

// Inserts a given rowEntry into an existing empty row
function insertTableRowData(rowEntry, tableData) {
	console.log(tableData.rows.length);
	for (var rowIndex = 0; rowIndex < tableData.rows.length; rowIndex++) {
		// if current row is empty, populate
		if (tableData.rows[rowIndex].cells[0].innerHTML == '') {
			console.log('Found');
			tableData.rows[rowIndex].cells[0].innerHTML = rowEntry[0];
			tableData.rows[rowIndex].cells[1].innerHTML = rowEntry[1];
			tableData.rows[rowIndex].cells[2].innerHTML = rowEntry[2];
			tableData.rows[rowIndex].cells[3].innerHTML = 1;
			tableData.rows[rowIndex].cells[4].innerHTML = rowEntry[2];
			break;
		}
	}	
}

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

// Populates a newly created row cell
function addRowCellNew(colClass, cell, entry) {
	let textNode = document.createTextNode(entry);
	cell.appendChild(textNode);
	cell.classList.add(colClass);
}

// Creates a new row and populates its data
function insertTableRowDataNew(rowEntry, tableData) {
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
	addRowCellNew(getColumnClass(3), row.insertCell(), 1);
	addRowCellNew(getColumnClass(4), row.insertCell(), rowEntry[2]);
}

// Populates main POS display table on SKU search entry.
function addMainTableItem() {
	//var sku = document.getElementById("Item-Search-Field").value;
	var sku = 556278;

	console.log('sku : ' + sku);

	// Requires DB access
	var rowEntry = getProductBySku(sku);

	// Check if last row is empty
	if (rowEntry != undefined) {
		// Check if last open table is empty
		var tableData = document.getElementById("Table-Data");
		if (tableData.rows[20].cells[0].innerHTML == '') {
			console.log("Empty Case");
			insertTableRowData(rowEntry, tableData);
		} else {
			// Populate rest of table
			console.log("Non-Empty Case");
			insertTableRowDataNew(rowEntry, tableData);
		}
	}
}

// Deletes all rows with selected class applied
function deleteMainSelectedItems() {
	var table = document.getElementById("Table-Data");
	var numRows = table.rows.length;
	var count = 1;
	for (var rowIndex = 0; rowIndex < numRows; rowIndex++) {
		var row = table.rows[rowIndex];
		if (row.classList.contains('selectedRow')) {
			if (rowIndex <= 21) {
				row.classList.remove('selectedRow');
				table.deleteRow(rowIndex);
				newRow = table.insertRow();
				addRowCellNew(getColumnClass(0), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(1), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(2), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(3), newRow.insertCell(), "");
				addRowCellNew(getColumnClass(4), newRow.insertCell(), "");
				// for (var colIndex = 0; colIndex < 5; colIndex++) {
				// 	console.log(row.columns[rowIndex].innerHTML);
				// 	row.columns[rowIndex].innerHTML = "";
				// }
			} else {
				row.classList.remove('selectedRow');
				table.deleteRow(rowIndex);
				row = table.rows[rowIndex];
			}
		}
		row = table.rows[rowIndex];
		row.id = "row_" + count;

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

		console.log(rowIndex); 
	}
}

function editItems(){
	// text = document.getElementById("Edit").value
	// if (text=="Edit") {
	// 	var input = document.getElementById("SKUInput")
	// 	input.style.display = "block"
	// 	document.getElementById("Edit").value = "Submit"
	// 	editor()
	// }
 //    else document.getElementById("Edit").value = "Edit"
}