import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Code, Keyboard, MousePointer } from 'lucide-react';

interface ActivityData {
  time: string;
  activity: number;
}

interface ActivityTrackerProps {
  activityData: ActivityData[];
  keystrokes: number;
  mouseClicks: number;
  linesOfCode: number;
}

export function ActivityTracker({
  activityData,
  keystrokes,
  mouseClicks,
  linesOfCode
}: ActivityTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aktivite Takibi</CardTitle>
        <CardDescription>Son 1 saatin kod yazma aktivitesi</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="activity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
            <Keyboard className="w-5 h-5 text-primary mb-2" />
            <div className="font-semibold">{keystrokes.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Tuş Vuruşu</div>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
            <MousePointer className="w-5 h-5 text-primary mb-2" />
            <div className="font-semibold">{mouseClicks.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Tıklama</div>
          </div>

          <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
            <Code className="w-5 h-5 text-primary mb-2" />
            <div className="font-semibold">{linesOfCode}</div>
            <div className="text-xs text-muted-foreground">Satır Kod</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}