import { faker } from "@faker-js/faker";
import { addDays } from "date-fns";

export const generateInvoiceId = () => {
  return `${faker.random.alpha({
    count: 2,
    casing: "upper",
  })}${faker.random.numeric(4)}`;
};

export const InvoiceStatus = {
  draft: "draft",
  paid: "paid",
  pending: "pending",
};

export const toInvoice = (formValues) => {
  return {
    ...formValues,
    items: formValues.items.map((item) => ({
      ...item,
      total: item.price * item.quantity,
    })),
    total: formValues.items.reduce(
      (result, item) => result + item.price * item.quantity,
      0
    ),
    paymentDue:
      formValues.createdAt && formValues.paymentTerms != null
        ? addDays(new Date(formValues.createdAt), formValues.paymentTerms)
        : null,
  };
};
