import { useState } from "react";
import Student from "./Student";
import { Student as StudentProps } from "./Types";
import AddStudentForm from "./AddStudentForm";

type GridProps = {
    students: StudentProps[];
};

export default function Grid(props: GridProps) {
    const [students, setStudents] = useState<StudentProps[]>(props.students ?? []);

    const onAddStudent = (student: {name: string}) => {
        setStudents((prev) => [...prev, { id: crypto.randomUUID(), ...student }]);
    }

    return (
        <article className="grid">
            {students.map((student) => (
                <Student key={student.id} name={student.name} id={student.id} />
            ))}
            
            <AddStudentForm onAddStudent={onAddStudent} />
        </article>
        );
}