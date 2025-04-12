const StellarSDK = require('stellar-sdk');
import type {
  StellarConfig,
  TransactionConfig,
  Account,
  TransactionResult,
  SimulatedTransaction,
  RemittanceResult,
} from '@/types/stellar';

export class StellarService {
  private server: any;
  private network: string;
  private config: StellarConfig;

  constructor(config: StellarConfig) {
    this.config = config;
    this.server = new StellarSDK.Server(config.server);
    this.network = config.network === 'testnet' ? StellarSDK.Networks.TESTNET : StellarSDK.Networks.PUBLIC;
  }

  async getAccount(publicKey: string): Promise<Account> {
    try {
      const account = await this.server.loadAccount(publicKey);
      const balances = account.balances.reduce((acc: { [key: string]: string }, balance: any) => {
        const assetCode = 'asset_type' in balance 
          ? balance.asset_type === 'native' 
            ? 'XLM' 
            : balance.asset_code || 'unknown'
          : 'unknown';
        return {
          ...acc,
          [assetCode]: balance.balance,
        };
      }, {});

      return {
        publicKey,
        balance: balances,
      };
    } catch (error) {
      console.error('Error fetching account:', error);
      throw error;
    }
  }

  async simulateTransaction(config: TransactionConfig): Promise<SimulatedTransaction> {
    try {
      if (!this.config.publicKey) {
        throw new Error('No public key configured');
      }

      const sourceAccount = await this.server.loadAccount(this.config.publicKey);
      const fee = await this.server.fetchBaseFee();

      // Create a simulated transaction
      const transaction = new StellarSDK.TransactionBuilder(sourceAccount, {
        fee: fee.toString(),
        networkPassphrase: this.network,
      })
        .addOperation(
          StellarSDK.Operation.payment({
            destination: config.destination,
            asset: config.asset.code === 'XLM' 
              ? StellarSDK.Asset.native() 
              : new StellarSDK.Asset(config.asset.code, config.asset.issuer || ''),
            amount: config.amount,
          })
        )
        .setTimeout(30)
        .build();

      // Simulate the transaction without actually submitting it
      const now = new Date();
      return {
        id: `sim_${now.getTime()}`,
        hash: transaction.hash().toString('hex'),
        successful: true,
        timestamp: now.toISOString(),
        isSimulated: true,
        originalAmount: config.amount,
        convertedAmount: config.amount, // In a real implementation, this would use actual conversion rates
      };
    } catch (error) {
      console.error('Error simulating transaction:', error);
      throw error;
    }
  }

  async simulateRemittance(
    amount: string,
    sourceCurrency: string,
    targetCurrency: string,
    destination: string
  ): Promise<RemittanceResult> {
    try {
      // Simulate the main transaction
      const transaction = await this.simulateTransaction({
        amount,
        asset: { code: sourceCurrency },
        destination,
      });

      // In a real implementation, these would be calculated based on:
      // - Current network fees
      // - Exchange rates
      // - Partner fees
      const networkFee = '0.00001';
      const conversionFee = '0.001';
      const totalFees = (
        parseFloat(networkFee) + parseFloat(conversionFee)
      ).toString();

      return {
        transaction,
        fees: {
          networkFee,
          conversionFee,
          totalFees,
        },
        estimatedDeliveryTime: new Date(
          Date.now() + 5 * 60 * 1000
        ).toISOString(), // Estimate 5 minutes
      };
    } catch (error) {
      console.error('Error simulating remittance:', error);
      throw error;
    }
  }
}

export const createStellarService = (config: StellarConfig): StellarService => {
  return new StellarService(config);
};
