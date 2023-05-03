import { Card } from "components/Card";
import { DisplayDate } from "components/DisplayDate";
import { useId } from "react";
import { InvoiceId } from "./InvoiceId";
import { format } from "utils/money";
import clsx from "clsx";
import { Optional } from "components/Optional";

export const InvoiceCard = ({ invoice }) => {
  return (
    <Card className="flex flex-col gap-16">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <InvoiceId className="text-xl font-semibold">{invoice.id}</InvoiceId>
          <div className="text-accent-700">{invoice.description}</div>
        </div>
        <Address address={invoice.senderAddress} />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-between gap-8">
          <Field label="Invoice Date">
            <Optional value={invoice.createdAt}>
              <DisplayDate date={invoice.createdAt} />
            </Optional>
          </Field>
          <Field label="Payment Due">
            <Optional value={invoice.paymentDue}>
              <DisplayDate date={invoice.paymentDue} />
            </Optional>
          </Field>
        </div>
        <div className="flex flex-col gap-2">
          <Field label="Bill To">
            <Optional value={invoice.clientName}>{invoice.clientName}</Optional>
          </Field>
          <Address address={invoice.clientAddress} />
        </div>
        <Field label="Sent to">
          <Optional value={invoice.clientEmail}>
            <a href={`mailto:${invoice.clientEmail}`}>{invoice.clientEmail}</a>
          </Optional>
        </Field>
      </div>
      <Items items={invoice.items} total={invoice.total} />
    </Card>
  );
};

const Address = ({ address }) => {
  return (
    <div className="flex flex-col text-accent-700">
      <div>{address.street}</div>
      <div>{address.city}</div>
      <div>{address.postCode}</div>
      <div>{address.country}</div>
    </div>
  );
};

const Field = ({ label, children }) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-accent-700">
        {label}
      </label>
      <span id={id} className="text-xl font-semibold">
        {children}
      </span>
    </div>
  );
};

const TH_STYLES = "p-8 pb-4 text-accent-700 font-normal";
const TD_STYLES = "px-8 py-4 group-last:pb-8";

const Items = ({ items, total }) => {
  return (
    <table className="w-full rounded-lg bg-secondary-500">
      <thead>
        <tr>
          <th className={clsx(TH_STYLES, "text-left")}>Item Name</th>
          <th className={clsx(TH_STYLES, "text-center")}>QTY.</th>
          <th className={clsx(TH_STYLES, "text-right")}>Price</th>
          <th className={clsx(TH_STYLES, "text-right")}>Total</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index} className="group font-semibold">
            <td className={clsx(TD_STYLES, "text-left")}>
              <Optional value={item.name}>{item.name}</Optional>
            </td>
            <td className={clsx(TD_STYLES, "text-center")}>{item.quantity}</td>
            <td className={clsx(TD_STYLES, "text-right")}>{item.price}</td>
            <td className={clsx(TD_STYLES, "text-right")}>{item.total}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className=" rounded-b-lg">
          <td className="p-8  bg-accent-950 rounded-bl-lg text-accent-700 font-normal ">
            Amount Due
          </td>
          <td
            colSpan={3}
            className="p-8  bg-accent-950 rounded-br-lg text-right text-xl font-semibold"
          >
            {format(total)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
