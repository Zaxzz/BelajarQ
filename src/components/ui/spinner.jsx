const Spinner = ({ size = "md", color = "text-blue-500" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
    xxl: "w-12 h-12",
  };

  return (
    <div
      className={`border-t-2 border-solid ${sizeClasses[size]} ${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
};

export default Spinner;
