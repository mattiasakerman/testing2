import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { forwardRef, useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import { ReactComponent as IconDelete } from "components/Icons/icon-delete.svg";
import { ReactComponent as IconArrowDown } from "components/Icons/icon-arrow-down.svg";
import { format } from "utils/money";
import clsx from "clsx";

const DEFAULT_ITEM = { name: "", quantity: 1, price: 1 };

export const InvoiceForm = ({ defaultValues, onSubmit, children }) => {
  const { control, register, handleSubmit, watch, getValues, setValue } =
    useForm({
      defaultValues: {
        paymentTerms: 1,
        items: [DEFAULT_ITEM],
        ...defaultValues,
      },
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const items = watch("items");
  const paymentTerms = watch("paymentTerms");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      <div className="flex flex-col flex-1 px-8 pb-8 gap-10 overflow-y-auto">
        <Section label="Bill From">
          <Field label="Street Address" {...register("senderAddress.street")} />
          <div className="grid grid-cols-3 gap-4">
            <Field label="City" {...register("senderAddress.city")} />
            <Field label="Post Code" {...register("senderAddress.postCode")} />
            <Field label="Country" {...register("senderAddress.country")} />
          </div>
        </Section>
        <Section label="Bill To">
          <Field label="Client's Name" {...register("clientName")} />
          <Field
            label="Client's Email"
            type="email"
            {...register("clientEmail")}
          />
          <Field label="Street Address" {...register("clientAddress.street")} />
          <div className="grid grid-cols-3 gap-4">
            <Field label="City" {...register("clientAddress.city")} />
            <Field label="Post Code" {...register("clientAddress.postCode")} />
            <Field label="Country" {...register("clientAddress.country")} />
          </div>
        </Section>
        <Section>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Issue Date" type="date" {...register("createdAt")} />
            <div className="flex flex-col gap-2">
              <label className="text-accent-300" htmlFor="paymentTerms">
                Payment Terms
              </label>
              <PaymentTermsSelect
                id="paymentTerms"
                value={paymentTerms}
                onChange={(value) => setValue("paymentTerms", value)}
              />
            </div>
          </div>
          <Field label="Project Description" {...register("description")} />
        </Section>
        <Section>
          <div className="text-xl font-semibold text-accent-300">Item List</div>
          <table className="w-full border-spacing-10">
            <thead>
              <tr>
                <th className="w-4/12 text-left font-normal text-accent-300">
                  Name
                </th>
                <th className="w-2/12 text-left font-normal text-accent-300">
                  Qty
                </th>
                <th className="w-2/12 text-left font-normal text-accent-300">
                  Price
                </th>
                <th className="w-2/12"></th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <TableCell>
                    <input
                      required
                      {...register(`items.${index}.name`)}
                      className="w-full py-2 px-4 text-white font-semibold bg-secondary-500 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      min={0}
                      required
                      {...register(`items.${index}.quantity`)}
                      className="w-full py-2 px-4 text-white font-semibold bg-secondary-500 rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="number"
                      step="0.01"
                      required
                      {...register(`items.${index}.price`)}
                      className="w-full py-2 px-4 text-white font-semibold bg-secondary-500 rounded"
                    />
                  </TableCell>
                  <TableCell className="text-right text-white font-semibold">
                    {format(items[index].quantity * items[index].price)}
                  </TableCell>
                  <TableCell className="text-center">
                    <IconButton
                      icon={<IconDelete />}
                      disabled={items.length < 2}
                      onClick={() => {
                        if (items.length > 1) {
                          remove(index);
                        }
                      }}
                    />
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
          <Button
            className="justify-center self-end"
            variant={Button.Variants.secondary}
            onClick={() => append(DEFAULT_ITEM)}
          >
            + Add New Item
          </Button>
        </Section>
      </div>
      <div className="p-8 flex justify-between gap-4 shadow-2xl shadow-accent-500/30">
        {children({ values: getValues() })}
      </div>
    </form>
  );
};

const Section = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-4">
      {label && <div className="text-primary-500 font-semibold">{label}</div>}
      {children}
    </div>
  );
};

const Input = forwardRef((props, ref) => (
  <input
    className="py-2 px-4 text-white font-semibold bg-secondary-500 rounded"
    ref={ref}
    required
    {...props}
  />
));

const Field = forwardRef(({ label, type = "text", ...props }, ref) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      <label className="text-accent-300" htmlFor={id}>
        {label}
      </label>
      <Input id={id} ref={ref} type={type} {...props} />
    </div>
  );
});

const TableCell = ({ className, children }) => (
  <td className={clsx("pb-4 pr-4", className)}>{children}</td>
);

const PAYMENT_TERM_OPTIONS = { 1: "1 day", 7: "7 days", 30: "30 days" };

const PaymentTermsSelect = ({ id, value, onChange }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative ">
        <Listbox.Button
          id={id}
          className="w-full py-2 px-4 text-white font-semibold bg-secondary-500 rounded flex justify-between items-center gap-4"
        >
          <span>{PAYMENT_TERM_OPTIONS[value]}</span>
          <IconArrowDown />
        </Listbox.Button>
        <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {Object.entries(PAYMENT_TERM_OPTIONS).map(([value, label]) => (
            <Listbox.Option
              key={value}
              value={value}
              className={({ selected }) =>
                clsx(
                  "py-2 px-4 hover:bg-accent-700 font-semibold cursor-pointer",
                  selected && "bg-accent-300"
                )
              }
            >
              {label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
