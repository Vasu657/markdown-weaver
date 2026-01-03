import React, { useState } from 'react';
import { Copy, Check, Link2, Users } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shareUrl: string | null;
  roomId: string | null;
  connectedPeers: number;
  isConnected: boolean;
}

export const ShareDialog: React.FC<ShareDialogProps> = ({
  isOpen,
  onOpenChange,
  shareUrl,
  roomId,
  connectedPeers,
  isConnected,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Share link copied to clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast({
        title: 'Copied!',
        description: 'Room ID copied to clipboard.',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Document</DialogTitle>
          <DialogDescription>
            Share this link with others to collaborate in real-time
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
            <Users size={16} />
            <div className="flex-1">
              <p className="text-sm font-medium">
                {connectedPeers > 0 ? (
                  <>
                    <span className="text-green-600">● </span>
                    {connectedPeers} {connectedPeers === 1 ? 'person' : 'people'} connected
                  </>
                ) : (
                  <>
                    <span className="text-gray-400">● </span>
                    Waiting for connections...
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Share URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <div className="flex-1 p-2 rounded-lg bg-muted border border-input">
                <p className="text-xs text-muted-foreground break-all">
                  {shareUrl ? shareUrl : 'Generating link...'}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyUrl}
                disabled={!shareUrl}
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </Button>
            </div>
          </div>

          {/* Room ID */}
          {roomId && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Room ID</label>
              <div className="flex gap-2">
                <div className="flex-1 p-2 rounded-lg bg-muted border border-input">
                  <p className="text-xs font-mono text-muted-foreground">{roomId}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyRoomId}
                >
                  <Copy size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Link2 size={14} />
              How to share:
            </h4>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Copy the share link above</li>
              <li>Send it to others via email, chat, or messaging</li>
              <li>When they open the link, they'll join your session</li>
              <li>Start typing—changes sync automatically!</li>
            </ol>
          </div>

          {/* Features */}
          <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950 space-y-2">
            <h4 className="text-sm font-medium">✨ Features</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ Real-time sync across all connected devices</li>
              <li>✓ No login or account needed</li>
              <li>✓ P2P encrypted connection (no servers)</li>
              <li>✓ Works offline within the session</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
