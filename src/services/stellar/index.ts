import { Keypair, Server, TransactionBuilder, Networks, Asset, Operation } from 'stellar-sdk';

const TESTNET_URL = 'https://horizon-testnet.stellar.org';
const server = new Server(TESTNET_URL);

interface TransferParams {
  fromSecret: string;
  toPublic: string;
  amount: string;
  asset?: string;
}

interface AccountInfo {
  publicKey: string;
  balances: Array<{
    asset_type: string;
    balance: string;
    asset_code?: string;
  }>;
}

export async function createTestAccount(): Promise<{ publicKey: string; secretKey: string }> {
  try {
    const keypair = Keypair.random();
    
    // Fund the account on testnet
    await fetch(
      `https://friendbot.stellar.org?addr=${keypair.publicKey()}`
    );

    return {
      publicKey: keypair.publicKey(),
      secretKey: keypair.secret(),
    };
  } catch (error) {
    console.error('Error creating test account:', error);
    throw error;
  }
}

export async function getAccountInfo(publicKey: string): Promise<AccountInfo> {
  try {
    const account = await server.loadAccount(publicKey);
    return {
      publicKey: account.accountId(),
      balances: account.balances,
    };
  } catch (error) {
    console.error('Error getting account info:', error);
    throw error;
  }
}

export async function transfer({
  fromSecret,
  toPublic,
  amount,
  asset = 'XLM'
}: TransferParams): Promise<string> {
  try {
    const sourceKeypair = Keypair.fromSecret(fromSecret);
    const sourcePublic = sourceKeypair.publicKey();

    const account = await server.loadAccount(sourcePublic);
    const fee = await server.fetchBaseFee();

    let transaction = new TransactionBuilder(account, {
      fee: fee.toString(),
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination: toPublic,
          asset: asset === 'XLM' ? Asset.native() : new Asset(asset, sourcePublic),
          amount: amount.toString(),
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);

    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (error) {
    console.error('Error sending payment:', error);
    throw error;
  }
}

// Additional helper functions for simulated financial operations
export const simulateLoan = async (
  amount: number,
  interestRate: number,
  termMonths: number
) => {
  const monthlyRate = interestRate / 12 / 100;
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: (monthlyPayment * termMonths).toFixed(2),
    totalInterest: (monthlyPayment * termMonths - amount).toFixed(2),
  };
};
