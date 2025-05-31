import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: any) => void;
  onFailure: () => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        console.log('Login Exitoso:', credentialResponse);
        // Aquí puedes enviar el credentialResponse.credential (JWT) a tu backend para verificación
        // o decodificarlo en el frontend para obtener la información del usuario
        onSuccess(credentialResponse);
      }}
      onError={() => {
        console.log('Login Fallido');
        onFailure();
      }}
      useOneTap // Opcional: permite el inicio de sesión de un solo toque si el usuario ya ha iniciado sesión en Google
    />
  );
};

export default GoogleLoginButton;