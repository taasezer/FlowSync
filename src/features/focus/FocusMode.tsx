import { useState } from 'react';
import { useCreateFocusSession } from './api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Shield, Eye, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

interface FocusModeProps {
  onFocusChange: (enabled: boolean) => void;
}

export function FocusMode({ onFocusChange }: FocusModeProps) {
  const [focusEnabled, setFocusEnabled] = useState(false);
  const [settings, setSettings] = useState({
    blockSocialMedia: true,
    blockNotifications: true,
    dimScreen: false,
    intensity: [70]
  });

  const { mutate: createSession, isPending } = useCreateFocusSession();

  const handleFocusToggle = (enabled: boolean) => {
    setFocusEnabled(enabled);
    onFocusChange(enabled);

    if (enabled) {
      createSession({
        mode: 'default',
        duration: 1500 // default 25m for now
      });

      toast.success('Odak Modu Aktif', {
        description: 'Dikkat dağıtıcılar engellendi. İyi çalışmalar!',
        duration: 3000
      });
    } else {
      toast.info('Odak Modu Kapatıldı');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Odak Modu
        </CardTitle>
        <CardDescription>
          Dikkat dağıtıcıları engelleyin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg border bg-primary/5">
          <div>
            <Label htmlFor="focus-mode" className="cursor-pointer font-medium">
              Odak Modu {focusEnabled ? 'Aktif' : 'Kapalı'}
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              {focusEnabled
                ? 'Dikkat dağıtıcılar engellendi'
                : 'Tam odaklanma için açın'}
            </p>
          </div>
          <Switch
            id="focus-mode"
            checked={focusEnabled}
            onCheckedChange={handleFocusToggle}
            disabled={isPending}
          />
        </div>

        {focusEnabled && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="block-social" className="cursor-pointer">
                  Sosyal Medyayı Engelle
                </Label>
              </div>
              <Switch
                id="block-social"
                checked={settings.blockSocialMedia}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, blockSocialMedia: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="block-notifications" className="cursor-pointer">
                  Bildirimleri Sustur
                </Label>
              </div>
              <Switch
                id="block-notifications"
                checked={settings.blockNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, blockNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="dim-screen" className="cursor-pointer">
                  Ekranı Karart
                </Label>
              </div>
              <Switch
                id="dim-screen"
                checked={settings.dimScreen}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, dimScreen: checked })
                }
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <Label>Odak Yoğunluğu</Label>
                <span className="text-sm text-muted-foreground">{settings.intensity[0]}%</span>
              </div>
              <Slider
                value={settings.intensity}
                onValueChange={(value) => setSettings({ ...settings, intensity: value })}
                max={100}
                step={10}
              />
              <p className="text-xs text-muted-foreground">
                Daha yüksek yoğunluk = Daha fazla kısıtlama
              </p>
            </div>
          </div>
        )}

        {!focusEnabled && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            Odak modunu aktif ederek kesintisiz çalışın
          </div>
        )}
      </CardContent>
    </Card>
  );
}
