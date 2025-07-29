import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  manufactureDate: string;
  location: string;
  isAuthentic: boolean;
  verificationHash: string;
  scannedAt: string;
}

interface MedicineInfoProps {
  medicine: Medicine;
}

export const MedicineInfo = ({ medicine }: MedicineInfoProps) => {
  return (
    <Card className="bg-gradient-to-br from-card to-secondary border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-card-foreground">{medicine.name}</CardTitle>
          <Badge 
            variant={medicine.isAuthentic ? "default" : "destructive"}
            className={medicine.isAuthentic ? "bg-success text-white" : ""}
          >
            {medicine.isAuthentic ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Authentic
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3 mr-1" />
                Suspicious
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Manufacturer</p>
              <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Origin</p>
              <p className="text-sm text-muted-foreground">{medicine.location}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium text-card-foreground">Manufactured</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(medicine.manufactureDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-warning" />
              <div>
                <p className="text-xs font-medium text-card-foreground">Expires</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(medicine.expiryDate), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            <p className="text-xs font-medium text-card-foreground mb-1">Batch Number</p>
            <p className="text-xs text-muted-foreground font-mono">{medicine.batchNumber}</p>
          </div>
          
          <div>
            <p className="text-xs font-medium text-card-foreground mb-1">Verification Hash</p>
            <p className="text-xs text-muted-foreground font-mono break-all">
              {medicine.verificationHash}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-medium text-card-foreground mb-1">Scanned At</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(medicine.scannedAt), 'MMM dd, yyyy HH:mm')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};