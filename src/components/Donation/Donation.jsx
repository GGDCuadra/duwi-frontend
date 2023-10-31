import { useState } from 'react';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import Swal from 'sweetalert2';
import Footer from '../Footer/Footer';


function Donation() {
  const clientId = 'ASzWyoXmir_pj5IJspk5BfAbJvyIxvS13jjy_irfX3TUuqFMOAFra8bI0RrbU06SVpGHiFbOB1R3Jvmb';
  const backendUrl = '/donate';

  const [donationAmount, setDonationAmount] = useState(0);
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: donationAmount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture()
      .then( async (orderData) => {
        console.log('Pago capturado con éxito:', orderData);
        const payerData = {
          id: orderData.id,
          name: `${orderData.payer.name.given_name} ${orderData.payer.name.surname}`,
          email: orderData.payer.email_address,
          createDate: orderData.create_time,
          status: orderData.status,
          total: orderData.purchase_units[0].amount.value,
          address: orderData.payer.address.country_code,
        };
        const response = await axios.post(backendUrl, payerData);
        if(response) {
          Swal.fire({
            title: 'Tu donación ha sido un exito',
            text: `Gracias por apoyar donando $${donationAmount}`,
            icon: 'success',
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              setShowPayPalButton(false)
            }
          })
        }
      })
      .catch((error) => {
        console.error('Error al capturar el pago:', error);
      });
  };

  const handleInputChange = (event) => {
    setDonationAmount(event.target.value);
  };

  const handleConfirmButtonClick = () => {
    // Muestra una alerta con SweetAlert2
    Swal.fire({
      title: 'Confirmar donación',
      text: `¿Estás seguro de que deseas donar $${donationAmount}?`,
      icon: 'question',
      showCancelButton: true,
      customClass: {
        container: 'p-5',
        title: 'text-2xl font-poppins',
        text: 'text-lg font-poppins',
        confirmButton: 'bg-morado text-white px-4 py-2 rounded-md mr-2 font-poppins',
        cancelButton: 'bg-red-500 text-white px-4 py-2 rounded-md font-poppins',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Cuando se confirma la donación, muestra el botón de PayPal
        setShowPayPalButton(false)
        setTimeout(() => {
        setShowPayPalButton(true);
        }, 1000)
        
        
        // Oculta el botón después de 15 segundos
         // 15 segundos
      }
    });
  };

  return (
    <>
    <div className='bg-clarito justify-items-center w-100 flex justify-center h-screen'>
    <div className='flex flex-wrap justify-center gap-4 w-3/4 mt-20'>
        <h1 className='text-moradito text-8xl font-black font-poppins mb-4'>¿Quieres apoyar a </h1>
        <h1 className='text-moradito text-8xl font-black font-poppins mb-4'>Did U Watch It?</h1>
        <div>
          <label className=''>
        <label className='text-moradito text-3xl font-normal font-poppins mr-9 mt-10'htmlFor="amount">Monto de la donación:</label>
        <input
          className='tex-8xl bg-clarito border-2 border-stone-800 rounded-lg p-2'
          type="text"
          name='amount'
          id='amount'
          value={donationAmount}
          onInput={handleInputChange}
        />
      </label>
      <button className="bg-moradito hover:bg-lila text-white rounded px-4 py-2 ml-4 ext-lg font-poppins" onClick={handleConfirmButtonClick}>Confirmar Donación</button>
        </div>
        
      {showPayPalButton && donationAmount > 0 && (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
        />
      )}
    </div>
    
    </div>
    <Footer/>
    </>
  );
}

export default Donation;
