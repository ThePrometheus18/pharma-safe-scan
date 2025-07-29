import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface WalletConnectProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  walletAddress?: string;
}

export const WalletConnect = ({ onConnect, isConnected, walletAddress }: WalletConnectProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (typeof (window as any).ethereum !== 'undefined') {
      setIsConnecting(true);
      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        });
        
        if (accounts.length > 0) {
          onConnect(accounts[0]);
          toast.success('Wallet connected successfully!');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        toast.error('Failed to connect wallet. Please try again.');
      } finally {
        setIsConnecting(false);
      }
    } else {
      toast.error('Please install MetaMask or another Web3 wallet to continue.');
    }
  };

  if (isConnected && walletAddress) {
    return (
      <Card className="bg-gradient-to-br from-card to-secondary border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-card-foreground">Wallet Connected</p>
              <p className="text-sm text-muted-foreground">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-card to-secondary border-primary/20">
      <CardHeader className="text-center">
        <div className="mx-auto p-3 bg-primary/20 rounded-full w-fit mb-4">
          <Wallet className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl text-card-foreground">Connect Your Wallet</CardTitle>
        <CardDescription className="text-muted-foreground">
          Connect your Web3 wallet to verify medicine authenticity on the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </CardContent>
    </Card>
  );
};