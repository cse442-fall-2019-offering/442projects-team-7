// Returns a product entry as a list via its sku
function getProductBySku(sku) {
	var product = [556278, "An example item description", 44.99];
	if (product[0] == sku) {
		return product;
	}
	return undefined;
}

// Returns list of all products (eventually from ProductsDB)
function getAllProducts() {
	var productList = [];
		productList.push([556278, "Example_1", 44.99]);
		productList.push([556279, "Example_2", 55.99]);
		productList.push([556280, "Example_3", 3.99]);
		productList.push([556281, "Example_4", 4.99]);
		productList.push([556282, "Example_5", 10.99]);
		productList.push([556283, "Example_6", 109.05]);
		productList.push([556284, "Example_7", 1000.05]);
		productList.push([556285, "Example_8", 306.25]);
		productList.push([556286, "Example_9", 404.01]);
		productList.push([556287, "Example_10", 442.24]);
		productList.push([556288, "Example_11", 24.25]);
		productList.push([556289, "Example_12", 609.99]);
		productList.push([556290, "Example_13", 36.82]);
		productList.push([556291, "Example_14", 29.99]);
		productList.push([556292, "Example_15", 302.50]);
		productList.push([556293, "Example_16", 231.50]);
	return productList;
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
			if (rowIndex < startingRows) {
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
function addMainTableItem() {
	//var sku = document.getElementById("Item-Search-Field").value;
	var sku = 556278;

	console.log('sku : ' + sku);

	// Requires DB access
	// Gets a rowEntry list by sku
	var rowEntry = getProductBySku(sku);

	// Check if last row is empty
	if (rowEntry != undefined) {
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

// Reset's table to intial empty state
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
function getProductListing() {
	// Requires DB access
	// Get list of lists, all Products in the DB
	var products = getAllProducts();
	console.log(products);

	var tableData = document.getElementById("Table-Data");

	if (products != undefined) {
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

//function editItems(){
	// text = document.getElementById("Edit").value
	// if (text=="Edit") {
	// 	var input = document.getElementById("SKUInput")
	// 	input.style.display = "block"
	// 	document.getElementById("Edit").value = "Submit"
	// 	editor()
	// }
 //    else document.getElementById("Edit").value = "Edit"
//}