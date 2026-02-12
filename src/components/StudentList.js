import React from "react";

function StudentList({ students, deleteStudent, setEditingStudent }) {
  if (students.length === 0)
    return <p className="empty">No students found</p>;

  return (
    <div className="list">
      {students.map((s) => (
        <div key={s.id} className="card">
          <p><strong>{s.name}</strong></p>
          <p>Roll: {s.roll}</p>
          <p>Course: {s.course}</p>

          <div className="buttons">
            <button onClick={() => setEditingStudent(s)}>Edit</button>
            <button className="delete" onClick={() => deleteStudent(s.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudentList;