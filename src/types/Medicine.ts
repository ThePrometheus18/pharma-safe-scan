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

export interface Stats {
  totalScanned: number;
  authentic: number;
  suspicious: number;
  verificationRate: number;
}