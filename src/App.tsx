import "@/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "@/pages/NotFound";
import TestPage from "./pages/test/TestPage";
import TheFlagger from "./pages/test/TheFlagger";

// import "@hoosss-test/utils";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<TestPage />} />
        <Route path="/flagger" element={<TheFlagger />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
