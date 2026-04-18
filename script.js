let editingRow = null;


function openForm(edit = false) {
    document.getElementById("employeeModal").style.display = "block";
    if (!edit) {
        document.getElementById("formTitle").textContent = "Add Employee";
        document.getElementById("empName").value = "";
        document.getElementById("empPosition").value = "";
        document.getElementById("empDepartment").value = "";
        document.getElementById("empStatus").value = "Active";
        editingRow = null;
    }
}


function closeForm() {
    document.getElementById("employeeModal").style.display = "none";
}


function saveEmployee() {
    let name = document.getElementById("empName").value;
    let position = document.getElementById("empPosition").value;
    let department = document.getElementById("empDepartment").value;
    let status = document.getElementById("empStatus").value;

    if (name === "" || position === "" || department === "") {
        alert("Please fill all fields!");
        return;
    }

    if (editingRow) {
        
        editingRow.cells[0].textContent = name;
        editingRow.cells[1].textContent = position;
        editingRow.cells[2].textContent = department;
        editingRow.cells[3].textContent = status;
        editingRow.cells[3].className = status.toLowerCase();
        editingRow = null;
    } else {
        
        let table = document.getElementById("employeeTableBody");
        let newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${position}</td>
            <td>${department}</td>
            <td class="status ${status.toLowerCase()}">${status}</td>
            <td>
                <button class="edit-btn" onclick="editEmployee(this)">Edit</button>
                <button class="delete-btn" onclick="deleteEmployee(this)">Delete</button>
            </td>
        `;
    }
    closeForm();
}


function deleteEmployee(button) {
    if (confirm("Are you sure you want to delete this employee?")) {
        let row = button.parentElement.parentElement;
        row.remove();
    }
}


function editEmployee(button) {
    editingRow = button.parentElement.parentElement;
    document.getElementById("empName").value = editingRow.cells[0].textContent;
    document.getElementById("empPosition").value = editingRow.cells[1].textContent;
    document.getElementById("empDepartment").value = editingRow.cells[2].textContent;
    document.getElementById("empStatus").value = editingRow.cells[3].textContent;
    document.getElementById("formTitle").textContent = "Edit Employee";
    openForm(true);
}

