"use strict";
let employees = [];
let currentEmployeeId = null;
const viewListButton = document.getElementById('view-employees');
const addEmployeeButton = document.getElementById('add-employee');
const deleteAllButton = document.getElementById('delete-employees');
const employeeSearchSection = document.getElementById('ems_search');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const employeeListSection = document.getElementById('ems_view-employees');
const employeeTableBody = document.getElementById('employee-table-body');
const employeeDetailsSection = document.getElementById('ems_employee-details');
const detailId = document.getElementById('detail-id');
const detailName = document.getElementById('detail-name');
const detailEmail = document.getElementById('detail-email');
const detailGender = document.getElementById('detail-gender');
const detailPosition = document.getElementById('detail-position');
const closeEmployeeButton = document.getElementById('close-employee');
const employeeFormSection = document.getElementById('ems_employee-form');
const formTitle = document.getElementById('form-title');
const employeeIdInput = document.getElementById('employee-id');
const employeeNameInput = document.getElementById('employee-name');
const employeeEmailInput = document.getElementById('employee-email');
const employeeGenderInput = document.getElementById('employee-gender');
const employeePositionInput = document.getElementById('employee-position');
const saveEmployeeButton = document.getElementById('save-employee');
// Save employees to localStorage
function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}
// Load employees from localStorage
function loadEmployees() {
    const storedEmployees = localStorage.getItem('employees');
    employees = storedEmployees ? JSON.parse(storedEmployees) : [];
}
function showSection(section) {
    section === employeeListSection
        ? employeeSearchSection.classList.remove('hidden')
        : employeeSearchSection.classList.add('hidden');
    employeeListSection.classList.add('hidden');
    employeeFormSection.classList.add('hidden');
    employeeDetailsSection.classList.add('hidden');
    section.classList.remove('hidden');
}
viewListButton.addEventListener('click', () => showSection(employeeListSection));
function renderEmployeeTable() {
    employeeTableBody.innerHTML = '';
    employees.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>
          <div class="action-buttons">
            <img onclick="viewDetails('${emp.id}')" class="icon view-icon" src="https://cdn-icons-png.freepik.com/256/9207/9207686.png?uid=R182226373&ga=GA1.1.1313046537.1736231732&semt=ais_hybrid"/>
            <img onclick="editDetails('${emp.id}')" class="icon edit-icon" src="https://cdn-icons-png.freepik.com/256/14915/14915786.png?uid=R182226373&ga=GA1.1.1313046537.1736231732&semt=ais_hybrid"/>
            <img onclick="deleteDetails('${emp.id}')" class="icon delete-icon" src="https://cdn-icons-png.freepik.com/256/756/756906.png?uid=R182226373&ga=GA1.1.1313046537.1736231732&semt=ais_hybrid"/>
          </div>
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
function editDetails(id) {
    const employee = employees.find(emp => emp.id === id);
    if (!employee)
        return;
    currentEmployeeId = id;
    formTitle.textContent = 'Edit Employee';
    employeeIdInput.value = employee.id;
    employeeNameInput.value = employee.name;
    employeeEmailInput.value = employee.email;
    employeeGenderInput.value = employee.gender;
    employeePositionInput.value = employee.position;
    showSection(employeeFormSection);
}
function deleteDetails(id) {
    employees = employees.filter(emp => emp.id !== id);
    currentEmployeeId = id;
    saveAndRefreshList();
}
function saveAndRefreshList() {
    saveEmployees();
    renderEmployeeTable();
    showSection(employeeListSection);
}
function resetForm() {
    employeeIdInput.value = '';
    employeeNameInput.value = '';
    employeeEmailInput.value = '';
    employeeGenderInput.value = '';
    employeePositionInput.value = '';
}
addEmployeeButton.addEventListener('click', () => {
    currentEmployeeId = null;
    formTitle.textContent = 'Add Employee';
    resetForm();
    showSection(employeeFormSection);
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
    saveAndRefreshList();
});
closeEmployeeButton.addEventListener('click', () => {
    showSection(employeeListSection);
});
deleteAllButton.addEventListener('click', () => {
    employees = [];
    localStorage.removeItem('employees');
    employeeTableBody.innerHTML = '';
    showSection(employeeListSection);
});
loadEmployees();
renderEmployeeTable();
showSection(employeeListSection);
