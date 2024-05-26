export interface AccountDetails {
  accountId:     string;
  balance:       number;
  currentPage:   number;
  totalPages:    number;
  pageSize:      number;
  operationDTOS: OperationDTOS[];
}

export interface OperationDTOS {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}

