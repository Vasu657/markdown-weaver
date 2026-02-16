import { useParams, useNavigate } from 'react-router-dom';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function EditorPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            toast.error("No document ID provided");
            navigate('/dashboard');
        }
    }, [id, navigate]);

    if (!id) return null;

    return <MarkdownEditor fileId={id} />;
}
