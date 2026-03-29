import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

const ChartBlock = ({ title, children }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <h3 className="font-semibold mb-4 text-gray-700 text-sm sm:text-base">
        {title}
      </h3>
      <div className="w-full h-64">{children}</div>
    </div>
  );
};

export default ChartBlock;
