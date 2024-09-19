import Grid from "./components/Grid";

const students = [
  { id: "1", name: "Ola Nordmann" },
  { id: "2", name: "Kari Nordmann" },
  { id: "3", name: "Per Hansen" },
  { id: "4", name: "Anne Olsen" },
  { id: "5", name: "Marius Berg" }
];      

function App() {
  return (
    <main>
      <Grid students={students}/>
    </main>
  ) 
}

export default App;