export const QuizInfo = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
    <Icon className="text-blue-600" size={24} />
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
