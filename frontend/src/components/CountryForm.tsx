import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import "../css/CountryForm.css";

const ADD_COUNTRY_MUTATION = gql`
  mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      id
      name
      code
      emoji
    }
  }
`;

export function CountryForm({ onCountryAdded }) {
  const [country, setCountry] = useState({
    name: "",
    code: "",
    emoji: "",
  });

  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY_MUTATION, {
    onCompleted: (data) => {
      if (onCountryAdded) {
        onCountryAdded(data.addCountry);
      }
      setCountry({ name: "", code: "", emoji: "" });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCountry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCountry({
      variables: {
        data: {
          name: country.name,
          code: country.code,
          emoji: country.emoji,
        },
      },
    });
  };

  return (
    <div className="form-page-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom du pays</label>
          <input
            type="text"
            id="name"
            name="name"
            value={country.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={country.code}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emoji">Emoji</label>
          <input
            type="text"
            id="emoji"
            name="emoji"
            value={country.emoji}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="add-button" disabled={loading}>
          {loading ? "Ajout..." : "Ajouter le pays"}
        </button>

        {error && <p className="error">Erreur : {error.message}</p>}
      </form>
    </div>
  );
}
