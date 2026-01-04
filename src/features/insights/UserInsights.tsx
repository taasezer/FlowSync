import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { User, Quote, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';

interface Persona {
  name: string;
  role: string;
  experience: string;
  age: number;
  avatar: string;
  color: string;
  painPoints: string[];
  needs: string[];
  quote: string;
  goals: string[];
}

const personas: Persona[] = [
  {
    name: 'Selin Yılmaz',
    role: 'Junior Frontend Developer',
    experience: '1.5 yıl',
    age: 24,
    avatar: 'SY',
    color: 'blue',
    quote: "Sürekli kesintiler yüzünden odaklanmayı kaybediyorum. Slack bildirimleri kod yazarken beni hep bölüyor.",
    painPoints: [
      'Bağlam değiştirme maliyeti yüksek',
      'Slack ve email bildirimleri sürekli kesintiye neden oluyor',
      'Kod yazarken akış durumunu korumakta zorlanıyor',
      'Hangi görevlere ne kadar süre harcadığını takip edemiyor'
    ],
    needs: [
      'Bildirim yönetimi için otomatik sistem',
      'Odaklanma durumunu takip edebilen bir araç',
      'Mola zamanlarını hatırlatan sistem',
      'Günlük verimlilik raporu'
    ],
    goals: [
      'Kesintisiz 2 saatlik kod yazma seansları',
      'Günde en az 4 saat derin odaklanma',
      'Sprint hedeflerini zamanında tamamlama'
    ]
  },
  {
    name: 'Emre Kaya',
    role: 'Mid-level Backend Developer',
    experience: '4 yıl',
    age: 29,
    avatar: 'EK',
    color: 'green',
    quote: "Günde 5-6 toplantı var. Arada kod yazmaya çalışıyorum ama sürekli moddan çıkıyorum.",
    painPoints: [
      'Yoğun toplantı takvimi kod yazma süresini azaltıyor',
      'Toplantılar arası kısa zaman dilimleri verimsiz',
      'Ekip üyeleri durum bilgisini bilmediği için kesintiye uğruyor',
      'Akşam geç saatlere kadar çalışmak zorunda kalıyor'
    ],
    needs: [
      'Toplantı aralarında optimal çalışma süreleri',
      'Otomatik "Meşgul" durum bildirimi',
      'Takım için şeffaf çalışma durumu göstergesi',
      'Adaptif zaman yönetimi önerileri'
    ],
    goals: [
      'Toplantı saatlerini optimize etme',
      'İş-yaşam dengesi kurma',
      'Günlük kod yazma hedeflerine ulaşma',
      'Ekip içi kesintileri azaltma'
    ]
  },
  {
    name: 'Mert Demir',
    role: 'Senior Full-stack Developer & Tech Lead',
    experience: '8 yıl',
    age: 34,
    avatar: 'MD',
    color: 'purple',
    quote: "Hem kod yazmam hem de takımı yönetmem gerekiyor. İkisini birden yapmak çok zor.",
    painPoints: [
      'Teknik liderlik ve kod yazma arasında denge kuramıyor',
      'Junior geliştiricilerin soruları odaklanmayı bozuyor',
      'Code review ve mentörlük zamanı çakışıyor',
      'Kritik görevler için kesintisiz zaman bulamıyor',
      'Takım üretkenliğini takip etmekte zorlanıyor'
    ],
    needs: [
      'Ekip için akış durumu dashboard\'u',
      'Kesinti yönetimi sistemi',
      'Mentörlük için uygun zaman dilimi önerileri',
      'Takım verimlilik metrikleri',
      'Otomatik durum senkronizasyonu'
    ],
    goals: [
      'Günde 3 saat kesintisiz kod yazma',
      'Ekip verimliliğini %30 artırma',
      'Code review süreçlerini optimize etme',
      'Sağlıklı iş-yaşam dengesi'
    ]
  }
];

const interviewFindings = [
  {
    category: 'Kesintiler',
    insight: 'Katılımcıların %100\'ü Slack, email ve toplantıların akışlarını bozduğunu belirtti',
    impact: 'Yüksek',
    quote: '"Kod yazarken bir bildirim geldiğinde, tekrar aynı odaklanma seviyesine gelmem 15-20 dakika sürüyor."'
  },
  {
    category: 'Bağlam Değiştirme',
    insight: 'Görevler arası geçiş ortalama 23 dakika konsantrasyon kaybına neden oluyor',
    impact: 'Yüksek',
    quote: '"Bir kod bloğu üzerinde çalışırken toplantıya giriyorum, döndüğümde ne yaptığımı hatırlamıyorum."'
  },
  {
    category: 'Mola Yönetimi',
    insight: 'Geliştiricilerin %80\'i düzenli mola almadığını, bunun yorgunluğa yol açtığını söyledi',
    impact: 'Orta',
    quote: '"Mola almam gerektiğini biliyorum ama akış halindeyken duramıyorum, sonra çok yorgun oluyorum."'
  },
  {
    category: 'Durum Bildirimi',
    insight: 'Geliştiriciler manuel olarak durum güncellemediği için gereksiz kesintilere maruz kalıyor',
    impact: 'Orta',
    quote: '"Slack\'te \'busy\' yazmayı unutuyorum, sonra herkes soru soruyor."'
  },
  {
    category: 'Verimlilik Takibi',
    insight: 'Katılımcılar ne kadar süre verimli çalıştıklarını ölçemediğini belirtti',
    impact: 'Orta',
    quote: '"Gün sonunda ne kadar işe yarar kod yazdığımı bilemiyorum, sadece yorgunum."'
  }
];

export function UserInsights() {
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
            3 yazılım geliştiricisi ile yapılan derinlemesine röportajlardan elde edilen içgörüler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personas" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personas">Kullanıcı Personaları</TabsTrigger>
              <TabsTrigger value="findings">Röportaj Bulguları</TabsTrigger>
            </TabsList>

            <TabsContent value="personas" className="space-y-6">
              {personas.map((persona, index) => (
                <Card key={index} className="border-l-4" style={{ borderLeftColor: getBorderColorClass(persona.color) }}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className={`w-12 h-12 ${getAvatarColorClass(persona.color)}`}>
                        <AvatarFallback className="text-white">{persona.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {persona.name}
                          <Badge variant="secondary">{persona.role}</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {persona.age} yaşında • {persona.experience} deneyim
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
                          {persona.painPoints.map((point, idx) => (
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
                          {persona.needs.map((need, idx) => (
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
                        {persona.goals.map((goal, idx) => (
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
                {interviewFindings.map((finding, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{finding.category}</CardTitle>
                          <CardDescription className="mt-1">{finding.insight}</CardDescription>
                        </div>
                        <Badge
                          variant={finding.impact === 'Yüksek' ? 'destructive' : 'secondary'}
                        >
                          {finding.impact} Etki
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3 p-3 rounded-lg bg-muted/30 border-l-2 border-muted-foreground">
                        <Quote className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground italic">{finding.quote}</p>
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
                  <p>• <strong>3 yazılım geliştiricisi</strong> ile derinlemesine röportaj yapıldı</p>
                  <p>• <strong>Ortalama röportaj süresi:</strong> 45 dakika</p>
                  <p>• <strong>Tespit edilen ana problem:</strong> Bağlam değiştirme maliyeti ve kesintiler</p>
                  <p>• <strong>En çok talep edilen özellik:</strong> Otomatik durum bildirimi (%100)</p>
                  <p>• <strong>İkincil ihtiyaç:</strong> Adaptif mola hatırlatmaları (%80)</p>
                  <p>• <strong>Verimlilik kaybı:</strong> Günde ortalama 2-3 saat kesintiler nedeniyle kayıp</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}