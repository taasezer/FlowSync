import { useState } from 'react';
import { useUpdateSettings } from '../settings/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Bell, BellOff, MessageSquare, Slack, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { toast } from 'sonner';

interface StatusManagerProps {
  isFlowActive: boolean;
}

export function StatusManager({ isFlowActive }: StatusManagerProps) {
  const [autoStatus, setAutoStatus] = useState(true);
  const [notifications, setNotifications] = useState({
    slack: true,
    email: false,
    teams: true
  });

  const { mutate: updateSettings } = useUpdateSettings();

  const handleStatusToggle = () => {
    const newState = !autoStatus;
    setAutoStatus(newState);

    // Persist to backend
    updateSettings({ notifications: newState });

    if (newState) {
      toast.success('Otomatik durum bildirimi aktif', {
        description: 'Derin akış durumunda otomatik olarak "Meşgul" statüsüne geçeceksiniz'
      });
    } else {
      toast.info('Otomatik durum bildirimi kapatıldı');
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    const newNotifications = { ...notifications, [key]: value };
    setNotifications(newNotifications);
    // In a real app we would map these specific platforms to the backend JSON structure
    // For now we just update the generic 'notifications' flag or template
    updateSettings({ focusTemplates: newNotifications });
  };

  // ... (rest of the component)

  const getCurrentStatus = () => {
    if (!autoStatus) return { label: 'Manuel', color: 'bg-slate-500' };
    if (isFlowActive) return { label: 'Meşgul - Derin Akış', color: 'bg-red-500' };
    return { label: 'Müsait', color: 'bg-green-500' };
  };

  const status = getCurrentStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Durum Yönetimi
          <Badge className={`${status.color} text-white border-0`}>
            {status.label}
          </Badge>
        </CardTitle>
        <CardDescription>
          Otomatik durum bildirimlerini yönetin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            {autoStatus ? (
              <Bell className="w-5 h-5 text-primary" />
            ) : (
              <BellOff className="w-5 h-5 text-muted-foreground" />
            )}
            <div>
              <Label htmlFor="auto-status" className="cursor-pointer">
                Otomatik Durum Bildirimi
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Akış durumuna göre otomatik güncelle
              </p>
            </div>
          </div>
          <Switch
            id="auto-status"
            checked={autoStatus}
            onCheckedChange={handleStatusToggle}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Entegre Platformlar</Label>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Slack className="w-4 h-4" />
              <span className="text-sm">Slack</span>
            </div>
            <Switch
              checked={notifications.slack}
              onCheckedChange={(checked) => handleNotificationChange('slack', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Microsoft Teams</span>
            </div>
            <Switch
              checked={notifications.teams}
              onCheckedChange={(checked) => handleNotificationChange('teams', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email (Gmail)</span>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => handleNotificationChange('email', checked)}
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => toast.success('Durum bildirildi', {
            description: 'Tüm platformlarda "Meşgul" durumuna geçtiniz'
          })}
        >
          Manuel Güncelle
        </Button>
      </CardContent>
    </Card>
  );
}
