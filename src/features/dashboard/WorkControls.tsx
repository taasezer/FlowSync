
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

export function WorkControls() {
    const [status, setStatus] = useState<'OFFLINE' | 'WORKING' | 'BREAK'>('OFFLINE');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const res = await api.get('/work/status');
            setStatus(res.data.status);
        } catch (error) {
            console.error('Failed to fetch status', error);
        }
    };

    const handleAction = async (action: 'start' | 'break' | 'finish') => {
        setLoading(true);
        try {
            const res = await api.post(`/work/${action}`);
            setStatus(res.data.status);
            toast.success(`Durum güncellendi: ${res.data.status}`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'İşlem başarısız');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-4 bg-card p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 mr-4">
                <div className={`w-3 h-3 rounded-full ${status === 'WORKING' ? 'bg-green-500 animate-pulse' :
                        status === 'BREAK' ? 'bg-yellow-500' :
                            'bg-gray-400'
                    }`} />
                <span className="font-medium text-sm">
                    {status === 'WORKING' ? 'Çalışıyor' :
                        status === 'BREAK' ? 'Molada' :
                            'Mesai Dışı'}
                </span>
            </div>

            <Button
                size="sm"
                variant={status === 'WORKING' ? "secondary" : "default"}
                className={status === 'WORKING' ? "opacity-50 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
                onClick={() => handleAction('start')}
                disabled={status === 'WORKING' || loading}
            >
                <Play className="w-4 h-4 mr-2" />
                Başla
            </Button>

            <Button
                size="sm"
                variant="secondary"
                className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
                onClick={() => handleAction('break')}
                disabled={status !== 'WORKING' || loading}
            >
                <Pause className="w-4 h-4 mr-2" />
                Mola
            </Button>

            <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction('finish')}
                disabled={status === 'OFFLINE' || loading}
            >
                <Square className="w-4 h-4 mr-2" />
                Bitir
            </Button>
        </div>
    );
}
