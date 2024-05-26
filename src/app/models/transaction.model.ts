export interface Debit {
  accountId:   string;
  amount:      number;
  description: string;
}
export interface Credit {
  accountId:   string;
  amount:      number;
  description: string;
}
export interface Transfer {
  accountSource:      string;
  accountDestination: string;
  amount:             number;
  description:        string;
}

