import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { User, Quote, AlertCircle, CheckCircle2, GitCommit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { useTeamActivity } from '../dashboard/api';

export function UserInsights() {
  const { data, isLoading } = useTeamActivity();

  if (isLoading) return <div>Veriler yükleniyor...</div>;

  const personas = data?.personas || [];
  const findings = data?.findings || [];

  const getAvatarColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500'
    };
    return colors[color] || 'bg-gray-500';
  };

  const getBorderColorClass = (color: string) => {
    const colors: Record<string, string> = {
      blue: '#3b82f6',
      green: '#22c55e',
      purple: '#a855f7'
    };
    return colors[color] || '#6b7280';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Kullanıcı Araştırması Bulguları
          </CardTitle>
          <CardDescription>
            Ekip üyelerinin GitHub aktivitelerinden elde edilen gerçek zamanlı içgörüler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personas" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personas">Kullanıcı Personaları</TabsTrigger>
              <TabsTrigger value="findings">Aktivite Bulguları</TabsTrigger>
            </TabsList>

            <TabsContent value="personas" className="space-y-6">
              {personas.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">Henüz GitHub bağlantısı olan kullanıcı bulunamadı.</div>
              ) : personas.map((persona: any, index: number) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: getBorderColorClass(persona.color) }}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className={`w-12 h-12 ${getAvatarColorClass(persona.color)}`}>
                        <AvatarImage src={persona.avatar} />
                        <AvatarFallback className="text-white">{persona.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <a href={persona.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                            {persona.name}
                          </a>
                          <Badge variant="secondary">{persona.role}</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {persona.bio}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Quote */}
                    <div className="flex gap-3 p-4 rounded-lg bg-muted/50 border-l-2 border-primary">
                      <Quote className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <p className="text-sm italic">{persona.quote}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Pain Points */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          Sorun Noktaları
                        </h4>
                        <ul className="space-y-2">
                          {persona.painPoints?.map((point: string, idx: number) => (
                            <li key={idx} className="text-sm flex gap-2">
                              <span className="text-red-500 shrink-0">•</span>
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Needs */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          İhtiyaçlar
                        </h4>
                        <ul className="space-y-2">
                          {persona.needs?.map((need: string, idx: number) => (
                            <li key={idx} className="text-sm flex gap-2">
                              <span className="text-green-500 shrink-0">•</span>
                              <span className="text-muted-foreground">{need}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Goals */}
                    <div>
                      <h4 className="font-medium mb-2">Hedefler</h4>
                      <div className="flex flex-wrap gap-2">
                        {persona.goals?.map((goal: string, idx: number) => (
                          <Badge key={idx} variant="outline">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="findings" className="space-y-4">
              <div className="grid gap-4">
                {findings.length === 0 ? (
                  <div className="text-center p-8 text-muted-foreground">Son aktivite bulunamadı.</div>
                ) : findings.map((finding: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <GitCommit className="w-4 h-4" />
                            {finding.category}
                          </CardTitle>
                          <CardDescription className="mt-1">{finding.insight}</CardDescription>
                        </div>
                        <Badge
                          variant='secondary'
                        >
                          {new Date(finding.date).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3 p-3 rounded-lg bg-muted/30 border-l-2 border-muted-foreground">
                        <Quote className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground italic">
                          {finding.quote}
                          <a href={finding.url} target="_blank" rel="noreferrer" className="ml-2 text-blue-500 hover:underline">(View)</a>
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Özet Bulgular</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• <strong>{personas.length} kullanıcı</strong> aktif olarak takip ediliyor</p>
                  <p>• <strong>Son Aktivite:</strong> {findings[0] ? new Date(findings[0].date).toLocaleString() : '-'}</p>
                  <p>• Veriler doğrudan <strong>GitHub</strong> entegrasyonu ile sağlanmaktadır.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}