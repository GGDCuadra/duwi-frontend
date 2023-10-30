import React, { useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

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
    <>
      <div className="flex justify-center place-items-center h-screen bg-clarito">
        <div className="border-2 rounded-lg p-10 border-moradito bg-fondito">
          <h2 className="text-moradito text-3xl font-normal font-poppins mt-10 text-center">
            Enviar sugerencias
          </h2>
          {isSubmitted ? (
            <p style={{ color: "green" }} className="mt-1">
              ¡El formulario de sugerencias se ha enviado correctamente!
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mt-10">
                <label
                  htmlFor="email"
                  className="text-moradito text-2xl font-normal font-poppins mt-10"
                >
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  id="email"
                  className="border-2 rounded-lg bg-fondito p-1 border-morado ml-3"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateForm();
                  }}
                  required
                />
                {!email && (
                  <p style={{ color: "red" }} className="mt-1">
                    El campo de correo electrónico es obligatorio.
                  </p>
                )}
                {email && !/^\S+@\S+\.\S+$/.test(email) && (
                  <p style={{ color: "red" }} className="mt-1">
                    Por favor, introduce un correo electrónico válido.
                  </p>
                )}
                {email && email.length > 50 && (
                  <p style={{ color: "red" }} className="mt-1">
                    El correo electrónico no puede tener más de 50 caracteres.
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="suggestion"
                  className="text-moradito text-2xl font-normal font-poppins mt-10"
                >
                  Sugerencias:
                </label>
                <textarea
                  id="suggestion"
                  placeholder="Escriba sus sugerencias aquí."
                  value={suggestion}
                  className="border-2 rounded-lg bg-fondito p-1 border-morado mt-5"
                  onChange={(e) => {
                    setSuggestion(e.target.value);
                    validateForm();
                  }}
                  required
                />
                {suggestion && suggestion.length < 10 && (
                  <p style={{ color: "red" }} className="mt-1">
                    La sugerencia debe tener al menos 10 caracteres.
                  </p>
                )}
              </div>
              <div className="mt-10">
                <label
                  htmlFor="calificacion"
                  className="text-moradito text-2xl font-normal font-poppins mt-10"
                >
                  Calificación:
                </label>
                <input
                  id="calificacion"
                  className="border-2 rounded-lg bg-fondito p-1 border-morado ml-3"
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
              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 ml-4 ext-lg font-poppins"
                  disabled={!isFormValid}
                >
                  Enviar sugerencia
                </button>
              </div>
            </form>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Suggestion;
