import { Routes, Route } from "react-router-dom";
import Pagina from "./Pagina";
import Login from "./Login";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/pagina" element={<Pagina />} />
    </Routes>
  );
}

export default App
