/**
 * @file utilities used within transactions
 */
import { formatDate, formatCurrency } from '@utils'

export const transformTransactionData = (transactionsData, account) => {
  const newAccount = { ...account }
  let { balance } = newAccount
  // TODO change this to a filter
  const transformedData = transactionsData.map((transaction) => {
    const transformedTransaction = {}
    balance =
      transaction.amount > 0
        ? parseFloat(balance) + parseFloat(transaction.amount)
        : parseFloat(balance) - parseFloat(Math.abs(transaction.amount))
    transformedTransaction.date = formatDate(new Date(transaction.transactionDate) * 1000)
    transformedTransaction.debit =
      transaction.amount < 0
        ? formatCurrency(Math.abs(transaction.amount))
        : ''
    transformedTransaction.credit =
      transaction.amount > 0 ? formatCurrency(transaction.amount) : ''
    transformedTransaction.description = transaction.description
    transformedTransaction.category = transaction.categorization.category
    transformedTransaction.id = transaction.id
    transformedTransaction.balance = formatCurrency(balance)
    return transformedTransaction
  })

  const firstBalance = ({
    date: 'Beginning Balance',
    description: ' ',
    category: ' ',
    debit: ' ',
    credit: ' ',
    balance: formatCurrency(account.balance)
  })
  const lastBalance = ({
    date: 'Ending Balance',
    description: ' ',
    category: ' ',
    debit: ' ',
    credit: ' ',
    balance: formatCurrency(balance)

  })
  const data = transformedData

  return { firstBalance, lastBalance, data }
}
