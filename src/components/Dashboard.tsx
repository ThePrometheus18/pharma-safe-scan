import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Package, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { WalletConnect } from './WalletConnect';
import { QRScanner } from './QRScanner';
import { MedicineInfo, type Medicine } from './MedicineInfo';

export const Dashboard = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedMedicines, setScannedMedicines] = useState<Medicine[]>([]);
  const [stats, setStats] = useState({
    totalScanned: 0,
    authentic: 0,
    suspicious: 0,
    verificationRate: 0
  });

  const handleWalletConnect = (address: string) => {
    setIsWalletConnected(true);
    setWalletAddress(address);
  };

  const handleQRScan = (qrData: string) => {
    setIsScanning(false);
    
    // Simulate medicine verification (in real app, this would be blockchain verification)
    const medicine: Medicine = {
      id: Date.now().toString(),
      name: 'Paracetamol 500mg',
      manufacturer: 'PharmaCorp Ltd.',
      batchNumber: `BATCH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      manufactureDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Mumbai, India',
      isAuthentic: Math.random() > 0.2, // 80% chance of being authentic
      verificationHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      scannedAt: new Date().toISOString()
    };

    setScannedMedicines(prev => [medicine, ...prev]);
    
    // Update stats
    const newTotal = stats.totalScanned + 1;
    const newAuthentic = medicine.isAuthentic ? stats.authentic + 1 : stats.authentic;
    const newSuspicious = medicine.isAuthentic ? stats.suspicious : stats.suspicious + 1;
    const newRate = newTotal > 0 ? (newAuthentic / newTotal) * 100 : 0;
    
    setStats({
      totalScanned: newTotal,
      authentic: newAuthentic,
      suspicious: newSuspicious,
      verificationRate: parseFloat(newRate.toFixed(1))
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">Pharma-Chain</h1>
                <p className="text-sm text-muted-foreground">Secure Pharmaceutical Verification</p>
              </div>
            </div>
            
            {isWalletConnected && (
              <div className="hidden md:flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Blockchain Connected</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Wallet Connection */}
        {!isWalletConnected && (
          <div className="max-w-md mx-auto">
            <WalletConnect
              onConnect={handleWalletConnect}
              isConnected={isWalletConnected}
              walletAddress={walletAddress}
            />
          </div>
        )}

        {/* Main Dashboard */}
        {isWalletConnected && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-card to-secondary border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{stats.totalScanned}</p>
                      <p className="text-xs text-muted-foreground">Total Scanned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-secondary border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-success" />
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{stats.authentic}</p>
                      <p className="text-xs text-muted-foreground">Authentic</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-secondary border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-warning" />
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{stats.suspicious}</p>
                      <p className="text-xs text-muted-foreground">Flagged</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-secondary border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-info" />
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{stats.verificationRate}%</p>
                      <p className="text-xs text-muted-foreground">Verification Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Connected Wallet Info */}
            <WalletConnect
              onConnect={handleWalletConnect}
              isConnected={isWalletConnected}
              walletAddress={walletAddress}
            />

            {/* Scan Button */}
            <div className="text-center">
              <Button
                onClick={() => setIsScanning(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
                size="lg"
              >
                <QrCode className="h-6 w-6 mr-2" />
                Scan Medicine QR Code
              </Button>
            </div>

            {/* Recent Scans */}
            {scannedMedicines.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Recent Scans</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {scannedMedicines.slice(0, 6).map((medicine) => (
                    <MedicineInfo key={medicine.id} medicine={medicine} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isActive={isScanning}
        onScanResult={handleQRScan}
        onClose={() => setIsScanning(false)}
      />
    </div>
  );
};