import "./App.css";
import Header from "./assets/components/Header/Header";
import MainRoutes from "./router";
 
function App() {
  return (
    <>
      <div className="container-fluid container-app">
        <Header/>
        <MainRoutes/>
      </div>
      
    </>
  );
}

export default App;
