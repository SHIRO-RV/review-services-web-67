
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Videos */}
      <div className="fixed inset-0 z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-1.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white"></div>
        </video>
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-multiply"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-2.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-100"></div>
        </video>
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/placeholder-video-3.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
