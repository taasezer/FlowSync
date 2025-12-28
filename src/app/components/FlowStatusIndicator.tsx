import { useState, useEffect } from 'react';
import { Activity, Zap, Coffee, Moon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';

type FlowState = 'deep-flow' | 'light-flow' | 'distracted' | 'break';

interface FlowStatusIndicatorProps {
  activityLevel: number;
}

export function FlowStatusIndicator({ activityLevel }: FlowStatusIndicatorProps) {
  const [flowState, setFlowState] = useState<FlowState>('light-flow');
  const [flowDuration, setFlowDuration] = useState(0);

  useEffect(() => {
    // Simulate flow state based on activity level
    if (activityLevel > 80) {
      setFlowState('deep-flow');
    } else if (activityLevel > 50) {
      setFlowState('light-flow');
    } else if (activityLevel > 20) {
      setFlowState('distracted');
    } else {
      setFlowState('break');
    }

    // Increment flow duration
    const timer = setInterval(() => {
      if (activityLevel > 50) {
        setFlowDuration(prev => prev + 1);
      }
    }, 60000); // Every minute

    return () => clearInterval(timer);
  }, [activityLevel]);

  const getFlowInfo = () => {
    switch (flowState) {
      case 'deep-flow':
        return {
          icon: Zap,
          label: 'Derin Akış',
          color: 'text-emerald-500',
          bgColor: 'bg-emerald-500/10',
          description: 'Yüksek verimlilik - Kesintilere karşı korumalısınız',
          progress: activityLevel
        };
      case 'light-flow':
        return {
          icon: Activity,
          label: 'Hafif Akış',
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
          description: 'Orta düzey odaklanma - Devam edin',
          progress: activityLevel
        };
      case 'distracted':
        return {
          icon: Coffee,
          label: 'Dağınık',
          color: 'text-amber-500',
          bgColor: 'bg-amber-500/10',
          description: 'Dikkatiniz dağılmış - Mola zamanı olabilir',
          progress: activityLevel
        };
      case 'break':
        return {
          icon: Moon,
          label: 'Mola',
          color: 'text-slate-500',
          bgColor: 'bg-slate-500/10',
          description: 'İyi bir dinlenme hak ettiniz',
          progress: activityLevel
        };
    }
  };

  const flowInfo = getFlowInfo();
  const Icon = flowInfo.icon;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}s ${mins}dk` : `${mins}dk`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${flowInfo.bgColor}`}>
            <Icon className={`w-5 h-5 ${flowInfo.color}`} />
          </div>
          Akış Durumu
        </CardTitle>
        <CardDescription>Gerçek zamanlı odaklanma takibi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{flowInfo.label}</span>
            <span className="text-sm text-muted-foreground">%{flowInfo.progress}</span>
          </div>
          <Progress value={flowInfo.progress} className="h-2" />
        </div>
        
        <p className="text-sm text-muted-foreground">{flowInfo.description}</p>
        
        {flowState !== 'break' && (
          <div className="pt-2 border-t">
            <p className="text-sm">
              <span className="text-muted-foreground">Akış süresi: </span>
              <span className="font-medium">{formatDuration(flowDuration)}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
