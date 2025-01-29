"use strict";
let employees = [];
let currentEmployeeId = null;
const viewListButton = document.getElementById('view-employees');
const addEmployeeButton = document.getElementById('add-employee');
const deleteAllButton = document.getElementById('delete-employees');
const employeeListSection = document.getElementById('ems_view-employees');
const employeeFormSection = document.getElementById('ems_employee-form');
const employeeDetailsSection = document.getElementById('ems_employee-details');
const employeeTableBody = document.getElementById('employee-table-body');
const formTitle = document.getElementById('form-title');
const employeeIdInput = document.getElementById('employee-id');
const employeeNameInput = document.getElementById('employee-name');
const employeeEmailInput = document.getElementById('employee-email');
const employeeGenderInput = document.getElementById('employee-gender');
const employeePositionInput = document.getElementById('employee-position');
const saveEmployeeButton = document.getElementById('save-employee');
const detailId = document.getElementById('detail-id');
const detailName = document.getElementById('detail-name');
const detailEmail = document.getElementById('detail-email');
const detailGender = document.getElementById('detail-gender');
const detailPosition = document.getElementById('detail-position');
const editEmployeeButton = document.getElementById('edit-employee');
const deleteEmployeeButton = document.getElementById('delete-employee');
function showSection(section) {
    employeeListSection.classList.add('hidden');
    employeeFormSection.classList.add('hidden');
    employeeDetailsSection.classList.add('hidden');
    section.classList.remove('hidden');
}
// Load employees from localStorage
function loadEmployees() {
    const storedEmployees = localStorage.getItem('employees');
    employees = storedEmployees ? JSON.parse(storedEmployees) : [];
}
// Save employees to localStorage
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}
function renderEmployeeTable() {
    employeeTableBody.innerHTML = '';
    employees
        .forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>
          <button onclick="viewDetails('${emp.id}')">View</button>
        </td>
      `;
        employeeTableBody.appendChild(row);
    });
}
function viewDetails(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee)
        return;
    currentEmployeeId = id;
    detailId.textContent = employee.id;
    detailName.textContent = employee.name;
    detailEmail.textContent = employee.email;
    detailGender.textContent = employee.gender;
    detailPosition.textContent = employee.position;
    showSection(employeeDetailsSection);
}
function resetForm() {
    employeeIdInput.value = '';
    employeeNameInput.value = '';
    employeeEmailInput.value = '';
    employeeGenderInput.value = '';
    employeePositionInput.value = '';
}
viewListButton.addEventListener('click', () => showSection(employeeListSection));
addEmployeeButton.addEventListener('click', () => {
    currentEmployeeId = null;
    formTitle.textContent = 'Add Employee';
    resetForm();
    showSection(employeeFormSection);
});
deleteAllButton.addEventListener('click', () => {
    employees = [];
    localStorage.removeItem('employees');
    employeeTableBody.innerHTML = '';
    showSection(employeeListSection);
});
saveEmployeeButton.addEventListener('click', () => {
    const id = employeeIdInput.value.trim();
    const name = employeeNameInput.value.trim();
    const email = employeeEmailInput.value.trim();
    const gender = employeeGenderInput.value;
    const position = employeePositionInput.value;
    if (!id || !name) {
        alert('Please fill out all fields.');
        return;
    }
    if (currentEmployeeId) {
        const employee = employees.find(emp => emp.id === currentEmployeeId);
        if (employee) {
            employee.id = id;
            employee.name = name;
            employee.email = email;
            employee.gender = gender;
            employee.position = position;
        }
    }
    else {
        employees.push({ id, name, email, gender, position });
    }
    saveEmployees();
    renderEmployeeTable();
    showSection(employeeListSection);
});
editEmployeeButton.addEventListener('click', () => {
    const employee = employees.find(emp => emp.id === currentEmployeeId);
    if (!employee)
        return;
    formTitle.textContent = 'Edit Employee';
    employeeIdInput.value = employee.id;
    employeeNameInput.value = employee.name;
    employeeEmailInput.value = employee.email;
    employeeGenderInput.value = employee.gender;
    employeePositionInput.value = employee.position;
    showSection(employeeFormSection);
});
deleteEmployeeButton.addEventListener('click', () => {
    employees = employees.filter(emp => emp.id !== currentEmployeeId);
    saveEmployees();
    renderEmployeeTable();
    showSection(employeeListSection);
});
loadEmployees();
renderEmployeeTable();
showSection(employeeListSection);
