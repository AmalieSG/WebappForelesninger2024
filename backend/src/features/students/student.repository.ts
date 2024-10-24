import type { Result } from "@/types";
import { Student, StudentDB } from "./student.types";
import { DB } from "@/db/db";

// Lager typen for studentRepository som sikrer at vi har de riktige funksjonene i createStudentRepository
type StudentRepository = {
  // Bruker Result typen for å sikre konsistent error handling / returnering
  list: (query?: Record<string, string>) => Promise<Result<Student[]>>;
  create: (data: Record<string, string>) => Promise<Result<Student>>;
};

// Lager en funksjon som lager en studentRepository
export const createStudentRepository = (db: DB): StudentRepository => {
  const creat = (data: Student) => {
    try {
      const studentToDb: StudentDB = {
        id: data.id,
        name: data.name,
        created_at: data.createdAt,
        updated_at: data.updatedAt,
      };

      const query = db.prepare(`
        INSERT INTO students (id, name, created_at, updated_at) 
        VALUES (?, ?, ?, ?)
        `);

        query.run(
          studentToDb.id, 
          studentToDb.name, 
          studentToDb.created_at, 
          studentToDb.updated_at
        );

        return {
          success: true,
          data: studentToDb,
        };
    } catch (error) {
      return {
        success: false,
        error: "ITERNAL_SERVER_ERROR",
        message: "Failed creating student",
      };
      
    }

  };

  const list = (query?: Record<string, string>) => {
    try {
      const statement = db.prepare("SELECT * FROM students");
      const data = statement.all() as StudentDB[];
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: "SOME_CODE_HERE",
        message: "Failed fetching students",
      }
    }
  };

  return {
    list,
    create,
  };
};

// Eksporterer studentRepository som en instans av createStudentRepository
// For å sikre at vi ikke må importere DB etc andre steder i koden
export const studentRepository = createStudentRepository({});
