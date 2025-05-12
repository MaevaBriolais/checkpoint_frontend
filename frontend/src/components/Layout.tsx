import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { CountryForm } from "./CountryForm";
import { useState } from "react";

export function PageLayout() {
  const [countries, setCountries] = useState([]);

  const addCountry = (country) => {
    setCountries([...countries, country]);
  };

  return (
    <div>
      <Header />
      <main>
        <CountryForm onAddCountry={addCountry} />
        <Outlet />
      </main>
    </div>
  );
}
