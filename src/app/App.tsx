import { useState, useEffect } from 'react';
import { Toaster } from '../components/ui/sonner';
import { FlowStatusIndicator } from '../features/dashboard/FlowStatusIndicator';
import { ActivityTracker } from '../features/dashboard/ActivityTracker';
import { StatusManager } from '../features/dashboard/StatusManager';
import { FocusMode } from '../features/focus/FocusMode';
import { BreakReminders } from '../features/focus/BreakReminders';
import { Statistics } from '../features/statistics/Statistics';
import { UserInsights } from '../features/insights/UserInsights';
import { Code2, Settings, BarChart3, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useActivityData, useWeeklyStats } from '../features/dashboard/api';
import { connectSocket, disconnectSocket } from '../lib/socket';

function App() {

  // Placeholder for real data
  const [activityLevel, setActivityLevel] = useState(65);
  const [flowDuration, setFlowDuration] = useState(0);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  // Fetch data using React Query
  const { data: activityData = [] } = useActivityData();
  const { data: weeklyData = [] } = useWeeklyStats();

  // Temporary: sync activityLevel with mocked backend data if needed

  const flowDistribution = [
    { name: 'Derin Akış', value: 720 },
    { name: 'Hafif Akış', value: 480 },
    { name: 'Dağınık', value: 180 },
    { name: 'Mola', value: 120 }
  ];
  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-xl">FlowSync</h1>
                <p className="text-xs text-muted-foreground">Akıllı Akış Yönetimi</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              v2.0.0 Enterprise
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="focus" className="gap-2">
              <Settings className="w-4 h-4" />
              Ayarlar
            </TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              İstatistikler
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2">
              <Users className="w-4 h-4" />
              Kullanıcı Araştırması
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Hero Section */}
            <div className="text-center space-y-2 py-6">
              <h2 className="text-3xl font-bold">Akış Durumu Takibi</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Kod yazma aktivitenizi gerçek zamanlı izleyin, akış durumunuzu optimize edin
                ve verimliğinizi artırın.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FlowStatusIndicator activityLevel={activityLevel} />
              <StatusManager isFlowActive={activityLevel > 70} />
            </div>

            <ActivityTracker
              activityData={activityData}
              keystrokes={12847}
              mouseClicks={3421}
              linesOfCode={342}
            />
          </TabsContent>

          {/* Focus & Settings Tab */}
          <TabsContent value="focus" className="space-y-6">
            <div className="text-center space-y-2 py-6">
              <h2 className="text-3xl font-bold">Odak ve Hatırlatmalar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dikkat dağıtıcıları engelleyin ve sağlıklı çalışma alışkanlıkları edinin.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FocusMode onFocusChange={setFocusMode} />
              <BreakReminders flowDuration={flowDuration} />
            </div>

            <div className="p-6 rounded-lg border bg-muted/50">
              <h3 className="font-medium mb-2">💡 Kullanım İpuçları</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>Adaptif Mola Modu</strong> akış sürenize göre otomatik olarak mola zamanlarını ayarlar</li>
                <li>• <strong>Odak Modu</strong> aktifken sosyal medya ve bildirimler engellenir</li>
                <li>• <strong>20-20-20 Kuralı:</strong> Her 20 dakikada, 20 saniye boyunca 20 feet (6 metre) uzağa bakın</li>
                <li>• Derin akış durumunda otomatik olarak "Meşgul" statüsüne geçersiniz</li>
              </ul>
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6">
            <div className="text-center space-y-2 py-6">
              <h2 className="text-3xl font-bold">Performans Analizi</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Haftalık akış performansınızı inceleyin ve gelişim alanlarını keşfedin.
              </p>
            </div>

            <Statistics
              weeklyData={weeklyData}
              flowDistribution={flowDistribution}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Hedef</div>
                <div className="font-semibold">25 saat / hafta</div>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-sm text-muted-foreground mb-1">İlerleme</div>
                <div className="font-semibold">24.5 saat (98%)</div>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="text-sm text-muted-foreground mb-1">Sıradaki Hedef</div>
                <div className="font-semibold">30 saat / hafta</div>
              </div>
            </div>
          </TabsContent>

          {/* User Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="text-center space-y-2 py-6">
              <h2 className="text-3xl font-bold">Kullanıcı Araştırması</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Yazılım geliştiricileriyle yapılan röportajlardan elde edilen personalar ve bulgular.
              </p>
            </div>

            <UserInsights />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>FlowSync - Professional Flow Management Solution for Developers</p>
          <p className="mt-1">Copyright © 2024 FlowSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;