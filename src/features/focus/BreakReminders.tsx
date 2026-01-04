
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Coffee, WatchIcon, Droplets, Eye } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { toast } from 'sonner';

interface BreakRemindersProps {
  flowDuration: number;
}

export function BreakReminders({ flowDuration }: BreakRemindersProps) {
  const [adaptiveMode, setAdaptiveMode] = useState(true);
  const [nextBreakIn, setNextBreakIn] = useState(25);
  const [reminders, setReminders] = useState({
    water: true,
    eyes: true,
    stretch: true,
    longBreak: false
  });

  useEffect(() => {
    // Adaptive break timing based on flow duration
    if (adaptiveMode) {
      if (flowDuration > 90) {
        setNextBreakIn(10);
      } else if (flowDuration > 60) {
        setNextBreakIn(15);
      } else {
        setNextBreakIn(25);
      }
    }

    // Simulate countdown
    const timer = setInterval(() => {
      setNextBreakIn(prev => {
        if (prev <= 1) {
          if (reminders.water || reminders.eyes || reminders.stretch) {
            toast.info('Mola Zamanı!', {
              description: 'Suyunuzu için, gözlerinize dinlendirin ve biraz esneyin.',
              duration: 5000
            });
          }
          return adaptiveMode ? (flowDuration > 60 ? 15 : 25) : 25;
        }
        return prev - 1;
      });
    }, 60000); // Every minute

    return () => clearInterval(timer);
  }, [flowDuration, adaptiveMode, reminders]);

  const progress = ((25 - nextBreakIn) / 25) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="w-5 h-5" />
          Mola Hatırlatmaları
        </CardTitle>
        <CardDescription>
          Akış durumunuza göre adaptif molalar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div>
            <Label htmlFor="adaptive-mode" className="cursor-pointer font-medium">
              Adaptif Mola Modu
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Akış sürenize göre otomatik ayarlanır
            </p>
          </div>
          <Switch
            id="adaptive-mode"
            checked={adaptiveMode}
            onCheckedChange={setAdaptiveMode}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Sonraki Mola</span>
            <span className="text-sm text-muted-foreground">{nextBreakIn} dakika</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Hatırlatma Türleri</Label>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm">Su İçin</div>
                <div className="text-xs text-muted-foreground">Her 30 dakikada</div>
              </div>
            </div>
            <Switch
              checked={reminders.water}
              onCheckedChange={(checked) =>
                setReminders({ ...reminders, water: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-sm">Göz Dinlendirme</div>
                <div className="text-xs text-muted-foreground">20-20-20 kuralı</div>
              </div>
            </div>
            <Switch
              checked={reminders.eyes}
              onCheckedChange={(checked) =>
                setReminders({ ...reminders, eyes: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <WatchIcon className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-sm">Esneme & Hareket</div>
                <div className="text-xs text-muted-foreground">Her 45 dakikada</div>
              </div>
            </div>
            <Switch
              checked={reminders.stretch}
              onCheckedChange={(checked) =>
                setReminders({ ...reminders, stretch: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-amber-500" />
              <div>
                <div className="text-sm">Uzun Mola</div>
                <div className="text-xs text-muted-foreground">Her 2 saatte 15 dk</div>
              </div>
            </div>
            <Switch
              checked={reminders.longBreak}
              onCheckedChange={(checked) =>
                setReminders({ ...reminders, longBreak: checked })
              }
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            setNextBreakIn(25);
            toast.success('Mola zamanlayıcısı sıfırlandı');
          }}
        >
          Zamanlayıcıyı Sıfırla
        </Button>
      </CardContent>
    </Card>
  );
}
