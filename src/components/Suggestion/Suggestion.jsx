import React, { useState } from "react";
import axios from "axios";

const Suggestion = () => {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  const validateForm = () => {
    const isEmailValid = email.length > 0 && email.length <= 100;
    const isEmailFormatValid = /^\S+@\S+\.\S+$/.test(email);
    const isSuggestionValid = suggestion.length >= 10;
    const isRatingValid = rating >= 0 && rating <= 10;

    if (
      isEmailValid &&
      isEmailFormatValid &&
      isSuggestionValid &&
      isRatingValid
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await axios.post("http://localhost:3001/suggestion", {
        email,
        suggestion,
        rating,
      });
      setMessage(response.data.message);
      setEmail("");
      setSuggestion("");
      setRating(0);
      setError("");
      setIsSubmitted(true);
    } catch (error) {
      setMessage("");
      setError("Error al enviar la sugerencia. Inténtelo de nuevo más tarde.");
      console.error("Error al enviar la sugerencia", error);
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div>
      <h2>Enviar sugerencias</h2>
      {isSubmitted ? (
        <p style={{ color: "green" }}>
          ¡El formulario de sugerencias se ha enviado correctamente!
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateForm();
              }}
              required
            />
            {!email && (
              <p style={{ color: "red" }}>
                El campo de correo electrónico es obligatorio.
              </p>
            )}
            {email && !/^\S+@\S+\.\S+$/.test(email) && (
              <p style={{ color: "red" }}>
                Por favor, introduce un correo electrónico válido.
              </p>
            )}
            {email && email.length > 100 && (
              <p style={{ color: "red" }}>
                El correo electrónico no puede tener más de 100 caracteres.
              </p>
            )}
          </div>
          <div>
            <label>Sugerencias:</label>
            <textarea
              value={suggestion}
              onChange={(e) => {
                setSuggestion(e.target.value);
                validateForm();
              }}
              required
            />
            {suggestion && suggestion.length < 10 && (
              <p style={{ color: "red" }}>
                La sugerencia debe tener al menos 10 caracteres.
              </p>
            )}
          </div>
          <div>
            <label>Calificación:</label>
            <input
              type="number"
              value={rating}
              min="0"
              max="10"
              onChange={(e) => handleRatingChange(parseInt(e.target.value))}
            />
            {(rating < 0 || rating > 10) && (
              <p style={{ color: "red" }}>
                La calificación debe estar entre 0 y 10.
              </p>
            )}
          </div>
          <button type="submit" disabled={!isFormValid}>
            Enviar sugerencia
          </button>
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Suggestion;
