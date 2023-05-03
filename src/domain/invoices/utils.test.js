const { toInvoice } = require("./utils");

const defaultFormValues = {
  items: [
    { price: 1, quantity: 2 },
    { price: 3, quantity: 1 },
    { price: -3, quantity: 1 },
    { price: 0, quantity: 1 },
    { price: 1, quantity: 0 },
  ],
};

describe("toInvoice", () => {
  it("should calculate total for items", () => {
    const invoice = toInvoice(defaultFormValues);
    expect(invoice.items.map((item) => item.total)).toEqual([2, 3, -3, 0, 0]);
  });

  it("should calculate invoice total", () => {
    const invoice = toInvoice(defaultFormValues);
    expect(invoice.total).toEqual(2);
  });

  it("should calculate payment due date when created at is set", () => {
    const invoice = toInvoice({
      ...defaultFormValues,
      createdAt: "2023/03/01",
      paymentTerms: 7,
    });
    expect(invoice.paymentDue).toEqual(new Date("2023/03/08"));
  });

  it("should set payment due to null when created at is not set", () => {
    const invoice = toInvoice({
      ...defaultFormValues,
      createdAt: "",
      paymentTerms: 7,
    });
    expect(invoice.paymentDue).toBeNull();
  });

  it("should set payment due to null when payment terms is not set", () => {
    const invoice = toInvoice({
      ...defaultFormValues,
      createdAt: "2023/03/01",
      paymentTerms: undefined,
    });
    expect(invoice.paymentDue).toBeNull();
  });

  it("should copy other properties", () => {
    const invoice = toInvoice({
      ...defaultFormValues,
      clientName: "Client name",
      description: "Logo Re-design",
      createdAt: "2023/03/01",
      paymentTerms: 7,
    });
    [
      "clientName",
      "description",
      "items",
      "createdAt",
      "paymentTerms",
      "total",
    ].forEach((property) => expect(invoice).toHaveProperty(property));
  });
});
