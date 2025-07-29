import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, X } from 'lucide-react';
import QrScanner from 'qr-scanner';
import { toast } from 'sonner';

interface QRScannerProps {
  onScanResult: (result: string) => void;
  isActive: boolean;
  onClose: () => void;
}

export const QRScanner = ({ onScanResult, isActive, onClose }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isActive && videoRef.current) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isActive]);

  const startScanning = async () => {
    if (!videoRef.current) return;

    try {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          onScanResult(result.data);
          stopScanning();
          toast.success('QR Code scanned successfully!');
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await qrScanner.start();
      setScanner(qrScanner);
      setIsScanning(true);
    } catch (error) {
      console.error('Error starting QR scanner:', error);
      toast.error('Failed to start camera. Please check permissions.');
    }
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.stop();
      scanner.destroy();
      setScanner(null);
    }
    setIsScanning(false);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg text-card-foreground">Scan QR Code</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-card-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <video
              ref={videoRef}
              className="w-full aspect-square object-cover"
              playsInline
              muted
            />
            {!isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                <div className="text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Initializing camera...</p>
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Position the QR code within the camera view to scan
          </p>
        </CardContent>
      </Card>
    </div>
  );
};