import "./App.css";
import Header from "./assets/components/Header/Header";
import Home from "./assets/pages/Home/Home";
import NovoRegistro from "./assets/pages/NovoRegistro/NovoRegistro";
 
function App() {
  return (
    <>
      <div className="container-fluid container-app">
        <Header/>
        <Home/>
        <NovoRegistro/>
      </div>
      
    </>
  );
}

export default App;
