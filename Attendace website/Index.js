const students = [
    { roll: 1, name: 'Student 1', status: 'none' },
    { roll: 2, name: 'Student 2', status: 'none' },
    { roll: 3, name: 'Student 3', status: 'none' },
    { roll: 4, name: 'Student 4', status: 'none' },
    { roll: 5, name: 'Student 5', status: 'none' },
    { roll: 6, name: 'Student 6', status: 'none' },
    { roll: 7, name: 'Student 7', status: 'none' },
    { roll: 8, name: 'Student 8', status: 'none' },
    { roll: 9, name: 'Student 9', status: 'none' },
    { roll: 10, name: 'Student 10', status: 'none' },
    { roll: 11, name: 'Student 11', status: 'none' },
    { roll: 12, name: 'Student 12', status: 'none' },
    { roll: 13, name: 'Student 13', status: 'none' },
    { roll: 14, name: 'Student 14', status: 'none' },
    { roll: 15, name: 'Student 15', status: 'none' },
    { roll: 16, name: 'Student 16', status: 'none' },
    { roll: 17, name: 'Student 17', status: 'none' },
    { roll: 18, name: 'Student 18', status: 'none' },
    { roll: 19, name: 'Student 19', status: 'none' },
    { roll: 20, name: 'Student 20', status: 'none' },
    { roll: 21, name: 'Student 21', status: 'none' },
    { roll: 22, name: 'Student 22', status: 'none' },
    { roll: 23, name: 'Student 23', status: 'none' },
    { roll: 24, name: 'Student 24', status: 'none' },
    { roll: 25, name: 'Student 25', status: 'none' },
    { roll: 26, name: 'Student 26', status: 'none' },
    { roll: 27, name: 'Student 27', status: 'none' },
    { roll: 28, name: 'Student 28', status: 'none' },
    { roll: 29, name: 'Student 29', status: 'none' },
    { roll: 30, name: 'Student 30', status: 'none' },
    { roll: 31, name: 'Student 31', status: 'none' },
    { roll: 32, name: 'Student 32', status: 'none' },
    { roll: 33, name: 'Student 33', status: 'none' },
    { roll: 34, name: 'Student 34', status: 'none' },
    { roll: 35, name: 'Student 35', status: 'none' },
    { roll: 36, name: 'Student 36', status: 'none' },
    { roll: 37, name: 'Student 37', status: 'none' },
    { roll: 38, name: 'Student 38', status: 'none' },
    { roll: 39, name: 'Student 39', status: 'none' },
    { roll: 40, name: 'Student 40', status: 'none' },
    { roll: 41, name: 'Student 41', status: 'none' },
    { roll: 42, name: 'Student 42', status: 'none' },
    { roll: 43, name: 'Student 43', status: 'none' },
    { roll: 44, name: 'Student 44', status: 'none' },
    { roll: 45, name: 'Student 45', status: 'none' },
    { roll: 46, name: 'Student 46', status: 'none' },
    { roll: 47, name: 'Student 47', status: 'none' },
    { roll: 48, name: 'Student 48', status: 'none' }
];

document.addEventListener('DOMContentLoaded', () => {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('attendanceDate').value = today;
    
    // Initialize the grid
    renderStudentsGrid();
    updateStats();
    
    // Event Listeners
    document.getElementById('saveAttendance').addEventListener('click', saveAttendance);
    document.getElementById('searchStudent').addEventListener('input', handleSearch);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterStudents(e.target.dataset.status);
        });
    });
});

function renderStudentsGrid() {
    const grid = document.getElementById('studentsGrid');
    grid.innerHTML = '';
    
    students.forEach(student => {
        const card = document.createElement('div');
        card.className = `student-card ${student.status}`;
        card.dataset.roll = student.roll;
        
        card.innerHTML = `
            <div class="student-info">
                <div class="roll-number">Roll No: ${student.roll}</div>
                <div class="student-name">${student.name}</div>
            </div>
            <div class="attendance-toggle">
                <button class="attendance-btn present-btn ${student.status === 'present' ? 'active' : ''}"
                    onclick="markAttendance(${student.roll}, 'present')">Present</button>
                <button class="attendance-btn absent-btn ${student.status === 'absent' ? 'active' : ''}"
                    onclick="markAttendance(${student.roll}, 'absent')">Absent</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function markAttendance(roll, status) {
    const student = students.find(s => s.roll === roll);
    student.status = student.status === status ? 'none' : status;
    renderStudentsGrid();
    updateStats();
}

function updateStats() {
    const presentCount = students.filter(s => s.status === 'present').length;
    const absentCount = students.filter(s => s.status === 'absent').length;
    
    document.getElementById('presentCount').textContent = presentCount;
    document.getElementById('absentCount').textContent = absentCount;
}

function filterStudents(status) {
    const cards = document.querySelectorAll('.student-card');
    cards.forEach(card => {
        if (status === 'all') {
            card.style.display = 'block';
        } else {
            const student = students.find(s => s.roll === parseInt(card.dataset.roll));
            card.style.display = student.status === status ? 'block' : 'none';
        }
    });
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.student-card');
    
    cards.forEach(card => {
        const roll = card.dataset.roll;
        const name = students.find(s => s.roll === parseInt(roll)).name.toLowerCase();
        
        if (roll.includes(searchTerm) || name.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function saveAttendance() {
    const date = document.getElementById('attendanceDate').value;
    const attendanceData = {
        date,
        attendance: students.map(s => ({
            roll: s.roll,
            status: s.status
        }))
    };
    
    // Here you would typically send this data to a server
    console.log('Saving attendance:', attendanceData);
    alert('Attendance saved successfully!');
}