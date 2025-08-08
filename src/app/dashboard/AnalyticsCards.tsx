import {
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  Clock,
  CheckCircle,
  Calendar,
} from "lucide-react";

interface AnalyticsData {
  totalResponses: number;
  completionRate: number;
  averageTimeToComplete: number;
  responsesToday: number;
  responsesTrend: "up" | "down" | "stable";
}

interface AnalyticsCardsProps {
  analytics: AnalyticsData;
}

export default function AnalyticsCards({ analytics }: AnalyticsCardsProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Responses */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Responses</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.totalResponses.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
            <p className="text-2xl font-bold text-gray-900">
              {analytics.completionRate}%
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Average Time */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">
              Avg. Time to Complete
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {formatTime(analytics.averageTimeToComplete)}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Responses Today */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Responses Today</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-gray-900">
                {analytics.responsesToday}
              </p>
              <div
                className={`flex items-center ${getTrendColor(
                  analytics.responsesTrend
                )}`}
              >
                {getTrendIcon(analytics.responsesTrend)}
              </div>
            </div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
