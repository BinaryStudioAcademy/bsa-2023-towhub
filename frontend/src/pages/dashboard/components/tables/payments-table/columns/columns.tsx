import { type ColumnDef } from '@tanstack/react-table';

import { type PaymentDto } from '../libs/types/types.js';

const columns: ColumnDef<PaymentDto>[] = [
  {
    header: 'Order',
    accessorKey: 'orderId',
    footer: 'Order',
    size: 50,
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
    footer: 'Amount',
    size: 100,
  },
  {
    header: 'Currency',
    accessorKey: 'currency',
    footer: 'Currency',
    size: 50,
  },
  {
    header: 'Customer name',
    accessorKey: 'customerName',
    footer: 'Customer name',
    size: 400,
    maxSize: 400,
    minSize: 400,

    cell: ({ getValue }) => (
      <span style={{ textAlign: 'left' }}>{String(getValue())}</span>
    ),
  },
  {
    header: 'Customer phone',
    accessorKey: 'customerPhone',
    footer: 'Customer phone',
    size: 200,
  },
  {
    header: 'Date',
    accessorFn: (row) => new Date(row.timestamp).toLocaleDateString(),
    footer: 'Date',
    size: 170,
  },
  {
    header: 'Time',
    accessorFn: (row) => new Date(row.timestamp).toLocaleTimeString(),
    footer: 'Time',
    size: 120,
  },
];

export { columns };
