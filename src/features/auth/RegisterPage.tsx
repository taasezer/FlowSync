
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { useLocation } from 'wouter';

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    githubUrl: z.string().optional(),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const [, setLocation] = useLocation();
    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const { mutate: register, isPending, error } = useMutation({
        mutationFn: async (data: RegisterForm) => {
            const res = await api.post('/auth/register', data);
            return res.data;
        },
        onSuccess: () => {
            // Auto login or redirect to login
            setLocation('/login');
        },
    });

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Kayıt Ol</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit((data) => register(data))} className="space-y-4">
                        <div>
                            <Input placeholder="Ad Soyad" {...form.register('name')} />
                        </div>
                        <div>
                            <Input placeholder="GitHub Profili (Opsiyonel)" {...form.register('githubUrl')} />
                        </div>
                        <div>
                            <Input placeholder="Email" {...form.register('email')} />
                            {form.formState.errors.email && <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>}
                        </div>
                        <div>
                            <Input type="password" placeholder="Şifre" {...form.register('password')} />
                            {form.formState.errors.password && <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>}
                        </div>
                        {error && <p className="text-red-500 text-sm">Kayıt başarısız.</p>}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Kaydediliyor...' : 'Kayıt Ol'}
                        </Button>
                        <div className="text-center text-sm">
                            <a href="/login" className="text-blue-500 hover:underline">Zaten hesabınız var mı? Giriş Yapın</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
