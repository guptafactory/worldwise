import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
const BASE_URL = `http://localhost:7000`;
function App() {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function getCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!data) throw new Error();
        setCities(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getCities();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path={"product"} element={<Product />} />
        <Route path={"pricing"} element={<Pricing />} />
        <Route path={"login"} element={<Login />} />
        <Route path={"app"} element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path={"countries"} element={<p>Countries</p>} />
          <Route path={"form"} element={<p>Form</p>} />
        </Route>
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
