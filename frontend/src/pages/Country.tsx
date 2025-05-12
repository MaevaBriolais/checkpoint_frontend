import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "../css/Country.css";

const GET_COUNTRY = gql`
  query GetCountry($code: String!) {
    country(code: $code) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export function CountryPage() {
  const { code } = useParams<{ code: string }>();

  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const country = data?.country;

  return (
    <div className="country-detail">
      <div className="country-detail-flag">
        <p>{country.emoji}</p>
      </div>
      <div className="country-detail-info">
        <div className="country-detail-row">
          <span className="country-detail-label">
            <strong>Name :</strong>
          </span>
          <span>{country.name}</span>
        </div>
        <div className="country-detail-row">
          <span className="country-detail-label">
            <strong>Continent :</strong>
          </span>
          <span>{country.continent?.name || "Non renseigné"}</span>
        </div>
      </div>
    </div>
  );
}
