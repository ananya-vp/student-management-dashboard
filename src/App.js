import React, { useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addOrUpdateStudent = (student) => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...student, id: s.id } : s
        )
      );
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, id: Date.now() }]);
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const filteredStudents = students
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) &&
        (courseFilter === "" ||
          s.course.toLowerCase() === courseFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.roll - b.roll;
      if (sortOrder === "desc") return b.roll - a.roll;
      return 0;
    });

  return (
    <div className="container">
      <h1>🎓 Student Management Dashboard</h1>

      <StudentForm
        addOrUpdateStudent={addOrUpdateStudent}
        editingStudent={editingStudent}
      />

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          <option>Btech</option>
          <option>Mbbs</option>
          <option>BA</option>
          <option>Bams</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By Roll</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <StudentList
        students={filteredStudents}
        deleteStudent={deleteStudent}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
}

export default App;