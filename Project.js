// Initial student records
let students = [
    { name: "Asha Patel", email: "asha.patel@example.com", age: 20, course: "Computer Science" },
    { name: "Rahul Mehta", email: "rahul.mehta@example.com", age: 22, course: "Data Analytics" },
    { name: "Maya Chen", email: "maya.chen@example.com", age: 19, course: "Web Development" },
    { name: "John", email: "john@gmail.com", age: 25, course: "Python" }
];

let editingIndex = null;

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const search = document.getElementById("searchInput");

function renderStudents(filter = "") {
    table.innerHTML = "";

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(filter.toLowerCase()) ||
        student.email.toLowerCase().includes(filter.toLowerCase()) ||
        student.course.toLowerCase().includes(filter.toLowerCase())
    );

    filteredStudents.forEach(student => {
        const index = students.indexOf(student);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="student-info">
                    <div class="avatar">${student.name.charAt(0).toUpperCase()}</div>
                    <div>
                        <strong></strong>
                        <small></small>
                    </div>
                </div>
            </td>
            <td>${student.age}</td>
            <td><span class="course-tag"></span></td>
            <td>
                <button class="edit-btn" data-action="edit" data-index="${index}">Edit</button>
                <button class="delete-btn" data-action="delete" data-index="${index}">Delete</button>
            </td>
        `;

        row.querySelector("strong").textContent = student.name;
        row.querySelector("small").textContent = student.email;
        row.querySelector(".course-tag").textContent = student.course;

        table.appendChild(row);
    });

    document.getElementById("totalStudents").textContent = students.length;

    document.getElementById("totalCourses").textContent =
        new Set(students.map(student => student.course.toLowerCase())).size;

    document.getElementById("studentCount").textContent =
        `Showing ${filteredStudents.length} of ${students.length} students`;
}

// Add or update a student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("studentName").value.trim(),
        email: document.getElementById("studentEmail").value.trim(),
        age: Number(document.getElementById("studentAge").value),
        course: document.getElementById("studentCourse").value.trim()
    };

    if (!student.name || !student.email || !student.course ||
        !Number.isInteger(student.age) || student.age < 1) {
        alert("Please enter valid student details.");
        return;
    }

    if (editingIndex !== null) {
        students[editingIndex] = student;
        editingIndex = null;
        document.getElementById("submitBtn").textContent = "+ Add student";
    } else {
        students.push(student);
    }

    form.reset();
    renderStudents(search.value);
});

// Edit and delete buttons
table.addEventListener("click", function(event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const index = Number(button.dataset.index);

    if (button.dataset.action === "delete") {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(index, 1);
            renderStudents(search.value);
        }
    }

    if (button.dataset.action === "edit") {
        const student = students[index];

        document.getElementById("studentName").value = student.name;
        document.getElementById("studentEmail").value = student.email;
        document.getElementById("studentAge").value = student.age;
        document.getElementById("studentCourse").value = student.course;

        editingIndex = index;
        document.getElementById("submitBtn").textContent = "Save changes";

        document.getElementById("studentName").focus();
    }
});

// Search students
search.addEventListener("input", function() {
    renderStudents(this.value);
});

// Cancel editing
document.getElementById("cancelBtn").addEventListener("click", function() {
    editingIndex = null;
    document.getElementById("submitBtn").textContent = "+ Add student";
});

// Display current date
document.getElementById("currentDate").textContent =
    new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    });

// Display initial student records
renderStudents();
