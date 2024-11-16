interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

export default function DashboardCard({ title, description, icon, bgColor, textColor }: DashboardCardProps) {
  return (
    <div className={`${bgColor} p-4 rounded-lg`}>
      <div className="flex items-center mb-2">
        <div className={`${textColor} mr-2`}>
          {icon}
        </div>
        <h2 className={`text-lg font-medium ${textColor}`}>{title}</h2>
      </div>
      <p className={`text-sm ${textColor} mt-1 opacity-90`}>{description}</p>
    </div>
  );
}