import { Badge } from "@/components/ui/badge";
import { Check, Clock, X, Plane } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md" | "lg";
}

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Available for Deployment',
          className: 'bg-green-500 text-white hover:bg-green-600',
          icon: Check,
        };
      case 'pending_documentation':
        return {
          label: 'Pending Documentation',
          className: 'bg-orange-500 text-white hover:bg-orange-600',
          icon: Clock,
        };
      case 'not_available':
        return {
          label: 'Not Available',
          className: 'bg-red-500 text-white hover:bg-red-600',
          icon: X,
        };
      case 'deployment_in_progress':
        return {
          label: 'Deployment in Progress',
          className: 'bg-purple-500 text-white hover:bg-purple-600',
          icon: Plane,
        };
      default:
        return {
          label: 'Unknown Status',
          className: 'bg-gray-500 text-white',
          icon: Clock,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <Badge className={`${config.className} ${sizeClasses[size]} inline-flex items-center`}>
      <Icon className={`${iconSizes[size]} mr-1`} />
      {config.label}
    </Badge>
  );
}
