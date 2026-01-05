
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

interface StatisticsProps {
  weeklyData: { day: string; minutes: number }[];
  flowDistribution: { name: string; value: number }[];
  overview?: {
    totalWorkMinutes: number;
    avgEfficiency: number;
    totalFocusMinutes: number;
    focusCount: number;
  };
}

export function Statistics({ weeklyData, flowDistribution, overview }: StatisticsProps) {
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#94a3b8'];

  // Guard against undefined or empty data
  const safeWeeklyData = weeklyData && weeklyData.length > 0 ? weeklyData : [{ day: 'Veri Yok', minutes: 0 }];
  const safeFlowDistribution = flowDistribution && flowDistribution.length > 0 ? flowDistribution : [{ name: 'Veri Yok', value: 0 }];

  const totalMinutes = overview?.totalWorkMinutes || safeWeeklyData.reduce((sum, day) => sum + day.minutes, 0);
  const avgMinutes = Math.round(totalMinutes / safeWeeklyData.length);
  const bestDay = safeWeeklyData.reduce((max, day) => day.minutes > max.minutes ? day : max, safeWeeklyData[0]);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>İstatistikler ve Analizler</CardTitle>
        <CardDescription>Haftalık akış performansınız</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="weekly">Haftalık</TabsTrigger>
            <TabsTrigger value="distribution">Dağılım</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Clock className="w-4 h-4" />
                  Toplam Akış
                </div>
                <div className="font-semibold text-2xl">{Math.floor(totalMinutes / 60)}s {totalMinutes % 60}dk</div>
                <div className="text-xs text-muted-foreground mt-1">Bu hafta</div>
              </div>

              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Odak Süresi
                </div>
                <div className="font-semibold text-2xl">
                  {overview ? `${Math.floor(overview.totalFocusMinutes / 60)}s ${overview.totalFocusMinutes % 60}dk` : `0s 0dk`}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{overview?.focusCount || 0} odak seansı</div>
              </div>

              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Target className="w-4 h-4" />
                  En İyi Gün
                </div>
                <div className="font-semibold text-2xl">{bestDay.day}</div>
                <div className="text-xs text-muted-foreground mt-1">{Math.floor(bestDay.minutes / 60)}s {bestDay.minutes % 60}dk akış</div>
              </div>

              <div className="p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Zap className="w-4 h-4" />
                  Verimlilik
                </div>
                <div className="font-semibold text-2xl">%{overview?.avgEfficiency || 0}</div>
                <div className="text-xs text-muted-foreground mt-1">Performans Skoru</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    label={{ value: 'Dakika', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="minutes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="distribution">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={flowDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}% `}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {flowDistribution.map((entry, index) => (
                        <Cell key={`cell - ${index} `} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium mb-4">Akış Durumu Dağılımı</h4>
                {flowDistribution.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium">{item.value} dk</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}