
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminDashboard() {
    const { data: stats, isLoading, error } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await api.get('/admin/stats');
            return res.data;
        }
    });

    if (isLoading) return <div className="p-8">Yükleniyor...</div>;
    if (error) return <div className="p-8 text-red-500">Hata oluştu: {error.message}</div>;

    return (
        <div className="container mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-bold">Yönetici Paneli</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Kullanıcı</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.overview?.totalUsers || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Oturum</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.overview?.totalSessions || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Odak (Sa)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{Math.round(stats.overview?.totalHours || 0)}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Kullanıcılar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ad Soyad</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>GitHub</TableHead>
                                <TableHead>Durum</TableHead>
                                <TableHead>Çalışma Saati</TableHead>
                                <TableHead>Verimlilik</TableHead>
                                <TableHead>Kayıt Tarihi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stats.users.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name || '-'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {user.githubStats ? (
                                            <div className="flex items-center gap-2">
                                                <img src={user.githubStats.avatarUrl} alt="gh" className="w-6 h-6 rounded-full" />
                                                <div className="flex flex-col">
                                                    <a href={user.githubUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs font-medium">
                                                        {user.githubStats.username}
                                                    </a>
                                                    <span className="text-[10px] text-muted-foreground">
                                                        {user.githubStats.todayCommits} commit bugün
                                                    </span>
                                                </div>
                                            </div>
                                        ) : user.githubUrl ? (
                                            <a href={user.githubUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-xs">
                                                Link
                                            </a>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${user.status === 'WORKING' ? 'bg-green-100 text-green-700' :
                                                user.status === 'BREAK' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-500'}`}>
                                            {user.status === 'WORKING' ? 'Çalışıyor' : user.status === 'BREAK' ? 'Molada' : 'Mesai Dışı'}
                                        </span>
                                    </TableCell>
                                    <TableCell>{user.totalHours ?? 0} sa</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${(user.efficiency ?? 0) > 70 ? 'bg-green-500' : (user.efficiency ?? 0) > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                    style={{ width: `${user.efficiency ?? 0}%` }}
                                                />
                                            </div>
                                            <span className="text-sm">{user.efficiency ?? 0}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
