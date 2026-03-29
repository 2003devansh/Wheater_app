const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      {title && (
        <h2 className="text-sm font-semibold text-gray-600 mb-3">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
