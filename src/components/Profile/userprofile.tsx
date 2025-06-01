import { useAuthContext } from "../MainContext/AuthContext";

// Define una interfaz para el usuario
interface User {
  name: string;
  email: string;
  photoURL: string;
}

function UserProfile() {
  const { user, logout } = useAuthContext();

  if (!user) return <p>No estás logueado</p>;

  return (
    <div className="max-w-[1000px] mx-auto my-8 p-[5.5rem] rounded-xl border border-white shadow-md font-sans text-[var(--text-color)] flex items-center gap-6 flex-wrap">
      <img
        src={user.photoURL}
        alt="Perfil"
        className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
      />
      <div className="flex flex-col justify-center flex-1">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default UserProfile;
