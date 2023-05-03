import { DisplayDate } from "components/DisplayDate";
import { Status } from "./Status";
import { ReactComponent as IconArrowRight } from "components/Icons/icon-arrow-right.svg";
import { ReactComponent as Illustration } from "components/Illustrations/illustration-empty.svg";
import { useMemo } from "react";
import { InvoiceId } from "./InvoiceId";
import { format } from "utils/money";
import { Optional } from "components/Optional";
import { IconButton } from "components/IconButton";

export const InvoicesList = ({ data, onRowClick }) => {
  const rows = useMemo(
    () =>
      data.map((invoice) => ({
        id: invoice.id,
        clientName: (
          <Optional value={invoice.clientName}>{invoice.clientName}</Optional>
        ),
        total: format(invoice.total),
        paymentDue: (
          <Optional value={invoice.paymentDue}>
            <DisplayDate date={invoice.paymentDue} />
          </Optional>
        ),
        status: <Status status={invoice.status} />,
      })),
    [data]
  );

  if (rows.length < 1) {
    return <EmptyState />;
  }
  return (
    <table className="w-full table-auto">
      <tbody className="space-y-4">
        {rows.map((row) => (
          <tr
            key={row.id}
            className="bg-secondary-500 hover:bg-secondary-700 hover:shadow cursor-pointer py-4 px-8 rounded-lg grid grid-cols-5 gap-4 items-center transition-all"
            onClick={() => onRowClick(row.id)}
          >
            <td>
              <InvoiceId>{row.id}</InvoiceId>
            </td>
            <td>{row.paymentDue}</td>
            <td>{row.clientName}</td>
            <td className="flex justify-end text-xl font-semibold">
              {row.total}
            </td>
            <td className="flex justify-end items-center gap-4">
              {row.status}
              <IconButton icon={<IconArrowRight />} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center w-full h-full justify-center gap-10">
      <Illustration />
      <div className="flex flex-col items-center gap-8 max-w-xs text-center">
        <span className="text-xl font-bold">There is nothing here </span>
        <p>
          Create an invoice by clicking the <b>New Invoice</b> button and get
          started
        </p>
      </div>
    </div>
  );
};
