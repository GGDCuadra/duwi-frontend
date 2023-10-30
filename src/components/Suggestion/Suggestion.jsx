import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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

    if (isEmailValid && isEmailFormatValid && isSuggestionValid && isRatingValid) {
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
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: '¡El formulario de sugerencias se ha enviado correctamente!',
      });
    } catch (error) {
      setMessage("");
      setError("Error al enviar la sugerencia. Inténtelo de nuevo más tarde.");
      console.error("Error al enviar la sugerencia", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al enviar la sugerencia. Inténtelo de nuevo más tarde.',
      });
    }
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <>
    <div className="flex h-screen w-full justify-center place-items-center bg-fondito">
      <div className="flex-col border-2 rounded-2xl h-fit p-9 border-morado">
      <h2 className="text-lila text-3xl font-normal font-poppins mb-2 text-center">Enviar sugerencias</h2>
      {isSubmitted ? (
        <p style={{ color: "green" }}>
          ¡El formulario de sugerencias se ha enviado correctamente!
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            Swal.fire({
              title: '¿Estás seguro de enviar la sugerencia?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.isConfirmed) {
                handleSubmit(e);
              }
            });
          }}
        >
          <div className="mt-3 flex flex-col">
            <label className="text-morado text-2xl font-normal font-poppins mb-2" htmlFor="email">Email:</label>
            <input
            className="mt-1 rounded border-2 border-morado p-2 text-2xl"
              id="email"
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
          <div className="flex flex-col mt-3">
            <label className="text-morado text-2xl font-normal font-poppins mb-2" htmlFor="suggestion">Sugerencias:</label>
            <textarea
              className="mt-1 rounded border-2 border-morado p-2 text-2xl"
              id="suggestion"
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
          <div className="flex flex-col mt-3">
            <label className="text-morado text-2xl font-normal font-poppins mb-2">Calificación:</label>
            <input
             className="w-fit mt-1 rounded border-2 border-morado p-2 text-2xl"
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
          <div className="mt-3">
            <button type="submit" className="bg-moradito text-2xl hover:bg-lila text-white rounded px-4 py-2 ext-lg font-poppins "  disabled={!isFormValid}>
            Enviar sugerencia
          </button>
          </div>
          
        </form>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Suggestion;
