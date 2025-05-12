import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "../css/Home.css";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;

export function HomePage() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="countries-container">
      {data.countries.map((country) => (
        <div key={country.code} className="country-card">
          <Link to={`/country/${country.code}`} className="country-card-link">
            <div className="country-flag">{country.emoji}</div>
            <div className="country-name">{country.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
