var employees = [];
var currentEmployeeId = null;
var viewListButton = document.getElementById('view-employees');
var addEmployeeButton = document.getElementById('add-employee');
var deleteAllButton = document.getElementById('delete-employees');
var employeeListSection = document.getElementById('ems_view-employees');
var employeeFormSection = document.getElementById('ems_employee-form');
var employeeDetailsSection = document.getElementById('ems_employee-details');
var employeeTableBody = document.getElementById('employee-table-body');
var searchInput = document.getElementById('search');
var filterPosition = document.getElementById('filter');
var formTitle = document.getElementById('form-title');
var employeeIdInput = document.getElementById('employee-id');
var employeeNameInput = document.getElementById('employee-name');
var employeeGenderInput = document.getElementById('employee-gender');
var employeePositionInput = document.getElementById('employee-position');
var saveEmployeeButton = document.getElementById('save-employee');
var detailId = document.getElementById('detail-id');
var detailName = document.getElementById('detail-name');
var detailGender = document.getElementById('detail-gender');
var detailPosition = document.getElementById('detail-position');
var editEmployeeButton = document.getElementById('edit-employee');
var deleteEmployeeButton = document.getElementById('delete-employee');
function showSection(section) {
    employeeListSection.classList.add('hidden');
    employeeFormSection.classList.add('hidden');
    employeeDetailsSection.classList.add('hidden');
    section.classList.remove('hidden');
}
function renderEmployeeTable() {
    employeeTableBody.innerHTML = '';
    var searchText = searchInput.value.toLowerCase();
    var filterValue = filterPosition.value;
    employees
        .filter(function (emp) {
        return (emp.name.toLowerCase().includes(searchText) ||
            emp.id.includes(searchText) ||
            emp.position.toLowerCase().includes(searchText)) &&
            (filterValue === '' || emp.position === filterValue);
    })
        .forEach(function (emp) {
        var row = document.createElement('tr');
        row.innerHTML = "\n        <td>".concat(emp.id, "</td>\n        <td>").concat(emp.name, "</td>\n        <td>").concat(emp.gender, "</td>\n        <td>").concat(emp.position, "</td>\n        <td>\n          <button onclick=\"viewDetails('").concat(emp.id, "')\">View</button>\n        </td>\n      ");
        employeeTableBody.appendChild(row);
    });
}
function viewDetails(id) {
    var employee = employees.find(function (emp) { return emp.id === id; });
    if (!employee)
        return;
    currentEmployeeId = id;
    detailId.textContent = employee.id;
    detailName.textContent = employee.name;
    detailGender.textContent = employee.gender;
    detailPosition.textContent = employee.position;
    showSection(employeeDetailsSection);
}
function resetForm() {
    employeeIdInput.value = '';
    employeeNameInput.value = '';
    employeeGenderInput.value = '';
    employeePositionInput.value = '';
}
viewListButton.addEventListener('click', function () { return showSection(employeeListSection); });
addEmployeeButton.addEventListener('click', function () {
    currentEmployeeId = null;
    formTitle.textContent = 'Add Employee';
    resetForm();
    showSection(employeeFormSection);
});
deleteAllButton.addEventListener('click', function () {
    employeeTableBody.innerHTML = '';
    showSection(employeeFormSection);
});
saveEmployeeButton.addEventListener('click', function () {
    var id = employeeIdInput.value.trim();
    var name = employeeNameInput.value.trim();
    var gender = employeeGenderInput.value;
    var position = employeePositionInput.value;
    if (!id || !name) {
        alert('Please fill out all fields.');
        return;
    }
    if (currentEmployeeId) {
        var employee = employees.find(function (emp) { return emp.id === currentEmployeeId; });
        if (employee) {
            employee.id = id;
            employee.name = name;
            employee.gender = gender;
            employee.position = position;
        }
    }
    else {
        employees.push({ id: id, name: name, gender: gender, position: position });
    }
    renderEmployeeTable();
    showSection(employeeListSection);
});
editEmployeeButton.addEventListener('click', function () {
    var employee = employees.find(function (emp) { return emp.id === currentEmployeeId; });
    if (!employee)
        return;
    formTitle.textContent = 'Edit Employee';
    employeeIdInput.value = employee.id;
    employeeNameInput.value = employee.name;
    employeeGenderInput.value = employee.gender;
    employeePositionInput.value = employee.position;
    showSection(employeeFormSection);
});
deleteEmployeeButton.addEventListener('click', function () {
    employees = employees.filter(function (emp) { return emp.id !== currentEmployeeId; });
    renderEmployeeTable();
    showSection(employeeListSection);
});
searchInput.addEventListener('input', renderEmployeeTable);
filterPosition.addEventListener('change', renderEmployeeTable);
renderEmployeeTable();
showSection(employeeListSection);
