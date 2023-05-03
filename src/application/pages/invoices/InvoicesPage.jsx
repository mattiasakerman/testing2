import { Button } from "components/Button";
import { ReactComponent as IconPlus } from "components/Icons/icon-plus.svg";
import { InvoicesList } from "domain/invoices/InvoicesList";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useListInvoices } from "domain/invoices/hooks/useListInvoices";
import { Modal } from "components/Modal";
import { InvoiceForm } from "domain/invoices/InvoiceForm";
import { usePostInvoice } from "domain/invoices/hooks/usePostInvoice";
import { InvoiceStatus, toInvoice } from "domain/invoices/utils";
import { useModal } from "components/hooks/useModal";

export const InvoicesPage = () => {
  const navigate = useNavigate();
  const invoices = useListInvoices();
  const saveInvoice = usePostInvoice();
  const {
    isOpen: isNewInvoiceFormOpen,
    open: openNewInvoiceForm,
    close: closeNewInvoiceForm,
  } = useModal();

  const onRowClick = useCallback(
    (invoiceId) => {
      navigate(`/invoices/${invoiceId}`);
    },
    [navigate]
  );

  const onSaveInvoice = useCallback(
    (values, status) => {
      saveInvoice(toInvoice({ ...values, status }));
      closeNewInvoiceForm();
    },
    [closeNewInvoiceForm, saveInvoice]
  );

  return (
    <>
      <div className="flex flex-col h-full gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl">Invoices</h1>
            <span className="text-accent-700">
              {invoices.length > 0
                ? `There are ${invoices.length} total invoices`
                : "No invoices"}
            </span>
          </div>
          <div>
            <Button onClick={openNewInvoiceForm} icon={<IconPlus />}>
              New Invoice
            </Button>
          </div>
        </div>
        <div className="grow">
          <InvoicesList data={invoices} onRowClick={onRowClick} />
        </div>
      </div>
      <Modal
        isOpen={isNewInvoiceFormOpen}
        onClose={closeNewInvoiceForm}
        title="New Invoice"
      >
        <InvoiceForm
          onSubmit={(values) => {
            onSaveInvoice(values, InvoiceStatus.pending);
          }}
        >
          {({ values }) => (
            <>
              <Button
                variant={Button.Variants.tertiary}
                onClick={closeNewInvoiceForm}
              >
                Discard
              </Button>
              <div className="flex gap-2">
                <Button
                  variant={Button.Variants.secondary}
                  onClick={() => onSaveInvoice(values, InvoiceStatus.draft)}
                >
                  Save as Draft
                </Button>
                <Button type="submit">Save & Send</Button>
              </div>
            </>
          )}
        </InvoiceForm>
      </Modal>
    </>
  );
};
