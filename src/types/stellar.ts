export interface StellarConfig {
  network: 'testnet' | 'public';
  server: string;
  publicKey?: string;
  secretKey?: string;
}

export interface TransactionConfig {
  amount: string;
  asset: {
    code: string;
    issuer?: string;
  };
  destination: string;
  memo?: string;
}

export interface Account {
  publicKey: string;
  balance: {
    [asset: string]: string;
  };
}

export interface TransactionResult {
  id: string;
  hash: string;
  successful: boolean;
  timestamp: string;
}

export interface SimulatedTransaction extends TransactionResult {
  isSimulated: true;
  originalAmount: string;
  convertedAmount: string;
  exchangeRate?: number;
}

export type RemittanceResult = {
  transaction: SimulatedTransaction;
  fees: {
    networkFee: string;
    conversionFee?: string;
    totalFees: string;
  };
  estimatedDeliveryTime: string;
}
