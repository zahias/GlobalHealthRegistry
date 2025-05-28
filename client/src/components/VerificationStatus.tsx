import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Check, Clock, Circle } from "lucide-react";

interface VerificationStatusProps {
  professional?: {
    licenseVerified?: boolean;
    availabilityStatus?: string;
  };
}

export function VerificationStatus({ professional }: VerificationStatusProps) {
  const getStepStatus = (step: string) => {
    if (!professional) return 'pending';
    
    switch (step) {
      case 'registration':
        return 'complete';
      case 'license':
        return professional.licenseVerified ? 'complete' : 'in_progress';
      case 'reference':
        return 'in_progress';
      case 'activation':
        return professional.availabilityStatus === 'available' ? 'complete' : 'pending';
      default:
        return 'pending';
    }
  };

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'complete':
        return <Check className="text-green-600 h-5 w-5" />;
      case 'in_progress':
        return <Clock className="text-orange-500 h-5 w-5" />;
      default:
        return <Circle className="text-gray-400 h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-50 border-green-200';
      case 'in_progress':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'complete':
        return { text: 'Complete', color: 'text-green-600' };
      case 'in_progress':
        return { text: 'In Progress', color: 'text-orange-500' };
      default:
        return { text: 'Pending', color: 'text-gray-500' };
    }
  };

  const steps = [
    {
      id: 'registration',
      title: 'Profile Registration',
      status: getStepStatus('registration'),
    },
    {
      id: 'license',
      title: 'License Verification',
      status: getStepStatus('license'),
    },
    {
      id: 'reference',
      title: 'Reference Check',
      status: getStepStatus('reference'),
    },
    {
      id: 'activation',
      title: 'Registry Activation',
      status: getStepStatus('activation'),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5 text-green-600" />
          Verification Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => {
            const statusInfo = getStatusText(step.status);
            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${getStatusColor(step.status)}`}
              >
                <div className="flex items-center">
                  <StatusIcon status={step.status} />
                  <span className="font-medium ml-3">{step.title}</span>
                </div>
                <span className={`font-medium ${statusInfo.color}`}>
                  {statusInfo.text}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            Estimated completion: 2-3 business days
          </p>
          <Button className="w-full" variant="outline">
            Upload Additional Documents
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
