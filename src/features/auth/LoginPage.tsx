
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { useLocation } from 'wouter';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [, setLocation] = useLocation();
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate: login, isPending, error } = useMutation({
        mutationFn: async (data: LoginForm) => {
            const res = await api.post('/auth/login', data);
            return res.data;
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setLocation('/'); // Redirect to dashboard
        },
    });

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Giriş Yap</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit((data) => login(data))} className="space-y-4">
                        <div>
                            <Input placeholder="Email" {...form.register('email')} />
                            {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
                        </div>
                        <div>
                            <Input type="password" placeholder="Şifre" {...form.register('password')} />
                            {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
                        </div>
                        {error && <p className="text-red-500 text-sm">Giriş başarısız. Lütfen bilgilerinizi kontrol edin.</p>}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </Button>
                        <div className="text-center text-sm">
                            <a href="/register" className="text-blue-500 hover:underline">Hesabınız yok mu? Kayıt Olun</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
