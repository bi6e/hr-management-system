
let leaveData = [];


function openLeaveForm(edit = false, index = -1) {
    const leaveForm = document.getElementById("leaveForm");
    const leaveName = document.getElementById("leaveName");
    const leaveType = document.getElementById("leaveType");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const status = document.getElementById("status");

   
    if (edit) {
        const leave = leaveData[index];
        leaveName.value = leave.name;
        leaveType.value = leave.type;
        startDate.value = leave.startDate;
        endDate.value = leave.endDate;
        status.value = leave.status;
    } else {
        leaveName.value = "";
        leaveType.value = "";
        startDate.value = "";
        endDate.value = "";
        status.value = "Pending"; 
    }

    leaveForm.style.display = "block"; 
}


function closeLeaveForm() {
    document.getElementById("leaveForm").style.display = "none";
}


function saveLeave() {
    const leaveName = document.getElementById("leaveName").value;
    const leaveType = document.getElementById("leaveType").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const status = document.getElementById("status").value;

    if (leaveName === "" || leaveType === "" || startDate === "" || endDate === "") {
        alert("Please fill all fields!");
        return;
    }

    const leave = {
        name: leaveName,
        type: leaveType,
        startDate: startDate,
        endDate: endDate,
        status: status
    };

    
    if (editingRow !== null) {
        leaveData[editingRow.index] = leave;
        updateTable();
        editingRow = null;
    } else {
        leaveData.push(leave);
        addLeaveRow(leave);
    }

    closeLeaveForm();
}


function addLeaveRow(leave) {
    const tableBody = document.getElementById("leaveTableBody");
    const row = tableBody.insertRow();

    row.innerHTML = `
        <td>${leave.name}</td>
        <td>${leave.type}</td>
        <td>${leave.startDate}</td>
        <td>${leave.endDate}</td>
        <td class="status ${leave.status.toLowerCase()}">${leave.status}</td>
        <td>
            <button class="edit-btn" onclick="editLeave(this)">Edit</button>
            <button class="delete-btn" onclick="deleteLeave(this)">Delete</button>
        </td>
    `;
}


function editLeave(button) {
    const row = button.parentElement.parentElement;
    const index = row.rowIndex - 1; 

    openLeaveForm(true, index);
    editingRow = { row: row, index: index };
}


function deleteLeave(button) {
    if (confirm("Are you sure you want to delete this leave?")) {
        const row = button.parentElement.parentElement;
        const index = row.rowIndex - 1;
        leaveData.splice(index, 1); 
        row.remove(); 
    }
}


function updateTable() {
    const tableBody = document.getElementById("leaveTableBody");
    tableBody.innerHTML = ""; 

   
    leaveData.forEach(leave => {
        addLeaveRow(leave);
    });
}

let editingRow = null;
