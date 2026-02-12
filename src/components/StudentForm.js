import React, { useState, useEffect } from "react";

function StudentForm({ addOrUpdateStudent, editingStudent }) {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setRoll(editingStudent.roll);
      setCourse(editingStudent.course);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !roll || !course) {
      alert("Please fill all fields");
      return;
    }

    addOrUpdateStudent({ name, roll: Number(roll), course });

    setName("");
    setRoll("");
    setCourse("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;