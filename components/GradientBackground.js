// Gradient Background (Red, purple, blue)

export default function GradientBackground({ children }) {
  return (
    <div className="bg-gradient-to-t from-red-600 via-fuchsia-950 to-indigo-800 min-h-screen flex justify-center items-center opacity-100">
      {children}
    </div>
  );
}
