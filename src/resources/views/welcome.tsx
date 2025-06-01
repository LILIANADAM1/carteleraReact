export default function Welcome() {
  return (
    <>
      <div
        className="h-screen relative min-h-[80vh] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 text-white"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}welcome.png)`,
        }}
      >
        <div className="relative z-10 text-center bg-transparent">
          <h1
            className="text-4xl sm:text-6xl font-black bg-transparent animate-gradient-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent tracking-tight drop-shadow-2xl"
            style={{
              animation:
                "gradient-text-fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both",
            }}
          >
            Cine sin límites, emociones sin fin
          </h1>
          <p
            className="text-xl sm:text-2xl mt-6 max-w-2xl mx-auto text-center animate-fade-in-up font-sans tracking-wide text-white/90 shadow-lg px-4 py-2 rounded-xl backdrop-blur-md bg-black/30"
            style={{
              animation: "fade-in-up 1.5s cubic-bezier(0.4,0,0.2,1) both",
            }}
          >
            Explora miles de películas y déjate llevar por las historias que
            definirán tus momentos inolvidables.
          </p>
        </div>
      </div>
      {/* Animaciones Tailwind personalizadas */}
      <style>
        {`
          @keyframes fade-in-down {
            0% {
              opacity: 0;
              transform: translateY(-40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes gradient-text-fade-in {
            0% {
              opacity: 0;
              background-size: 200% 200%;
              background-position: 100% 0;
            }
            100% {
              opacity: 1;
              background-size: 100% 100%;
              background-position: 0 0;
            }
          }
          .animate-fade-in-down {
            animation: fade-in-down 1s cubic-bezier(0.4,0,0.2,1) both;
          }
          .animate-fade-in-up {
            animation: fade-in-up 1.2s cubic-bezier(0.4,0,0.2,1) both;
          }
          .animate-gradient-text {
            animation: gradient-text-fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
        `}
      </style>
    </>
  );
}
