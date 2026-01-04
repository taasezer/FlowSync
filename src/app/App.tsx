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
import { connectSocket, disconnectSocket, socket } from '../lib/socket';
import { Route, Switch, useLocation } from 'wouter';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import AdminDashboard from '../features/admin/AdminDashboard';
import { Button } from '@/components/ui/button';

function MainApp() {
  const [activityLevel, setActivityLevel] = useState(65);
  const [flowDuration, setFlowDuration] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem('token')) {
      setLocation('/login');
      return;
    }
    connectSocket();
    socket.on('activity_level', (level: number) => {
      setActivityLevel(level);
    });
    return () => {
      socket.off('activity_level');
      disconnectSocket();
    };
  }, []);

  const { data: activityData = [] } = useActivityData();
  const { data: weeklyData = [] } = useWeeklyStats();

  const flowDistribution = [
    { name: 'Derin Akış', value: 720 },
    { name: 'Hafif Akış', value: 480 },
    { name: 'Dağınık', value: 180 },
    { name: 'Mola', value: 120 }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLocation('/login');
  };

  return (
    <div className="min-h-screen bg-background">
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setLocation('/admin')}>Admin</Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>Çıkış Yap</Button>
              <div className="text-sm text-muted-foreground">v2.0.0 Enterprise</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="dashboard" className="gap-2"><BarChart3 className="w-4 h-4" /> Dashboard</TabsTrigger>
            <TabsTrigger value="focus" className="gap-2"><Settings className="w-4 h-4" /> Ayarlar</TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2"><BarChart3 className="w-4 h-4" /> İstatistikler</TabsTrigger>
            <TabsTrigger value="insights" className="gap-2"><Users className="w-4 h-4" /> Kullanıcı Araştırması</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="text-center space-y-2 py-6">
              <h2 className="text-3xl font-bold">Akış Durumu Takibi</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Kod yazma aktivitenizi gerçek zamanlı izleyin.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FlowStatusIndicator activityLevel={activityLevel} />
              <StatusManager isFlowActive={activityLevel > 70} />
            </div>
            <ActivityTracker activityData={activityData} keystrokes={12847} mouseClicks={3421} linesOfCode={342} />
          </TabsContent>

          <TabsContent value="focus" className="space-y-6">
            <div className="text-center space-y-2 py-6">
              <h2 className="text-3xl font-bold">Odak ve Hatırlatmalar</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FocusMode onFocusChange={setFocusMode} />
              <BreakReminders flowDuration={flowDuration} />
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="text-center space-y-2 py-6"><h2 className="text-3xl font-bold">Performans Analizi</h2></div>
            <Statistics weeklyData={weeklyData} flowDistribution={flowDistribution} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="text-center space-y-2 py-6"><h2 className="text-3xl font-bold">Kullanıcı Araştırması</h2></div>
            <UserInsights />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="border-t mt-12 py-6 text-center text-sm text-muted-foreground">
        <p>FlowSync - Professional Flow Management</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/admin">
          {() => {
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;
            if (!user || user.role !== 'ADMIN') {
              return <div className="flex h-screen items-center justify-center text-red-500">Yetkisiz Erişim! Sadece Yönetici girebilir.</div>;
            }
            return <AdminDashboard />;
          }}
        </Route>
        <Route path="/" component={MainApp} />
        <Route>
          <div className="flex h-screen items-center justify-center">404 - Sayfa Bulunamadı</div>
        </Route>
      </Switch>
    </>
  );
}

export default App;