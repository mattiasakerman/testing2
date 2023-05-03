import { BackLink } from "components/BackLink";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { ConfirmationModal } from "components/ConfirmationModal";
import { Modal } from "components/Modal";
import { useModal } from "components/hooks/useModal";
import { InvoiceCard } from "domain/invoices/InvoiceCard";
import { InvoiceForm } from "domain/invoices/InvoiceForm";
import { InvoiceId } from "domain/invoices/InvoiceId";
import { Status } from "domain/invoices/Status";
import { useDeleteInvoice } from "domain/invoices/hooks/useDeleteInvoice";
import { useGetInvoice } from "domain/invoices/hooks/useGetInvoice";
import { usePatchInvoice } from "domain/invoices/hooks/usePatchInvoice";
import { InvoiceStatus, toInvoice } from "domain/invoices/utils";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const InvoicePage = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const invoice = useGetInvoice(invoiceId);
  const patchInvoice = usePatchInvoice();
  const deleteInvoice = useDeleteInvoice();

  const { isOpen: isEditOpen, open: openEdit, close: closeEdit } = useModal();
  const {
    isOpen: isDeleteConfirmationOpen,
    open: openDeleteConfirmation,
    close: closeDeleteConfirmation,
  } = useModal();

  const onSaveInvoice = useCallback(
    (values, status) => {
      patchInvoice(invoiceId, toInvoice({ ...values, status }));
      closeEdit();
    },
    [closeEdit, invoiceId, patchInvoice]
  );

  const onDelete = useCallback(() => {
    deleteInvoice(invoiceId);
    navigate("..");
  }, [deleteInvoice, invoiceId, navigate]);

  return (
    <>
      <div className="flex flex-col gap-8">
        <div>
          <BackLink to=".." />
        </div>
        <Card className="flex items-center justify-between">
          <span className="flex items-center gap-4">
            <span>Status</span>
            <Status status={invoice.status} />
          </span>
          <span className="flex gap-4">
            <Button variant={Button.Variants.secondary} onClick={openEdit}>
              Edit
            </Button>
            <Button
              variant={Button.Variants.destructive}
              onClick={openDeleteConfirmation}
            >
              Delete
            </Button>
            {invoice.status === InvoiceStatus.pending && (
              <Button
                variant={Button.Variants.primary}
                onClick={() => onSaveInvoice(invoice, InvoiceStatus.paid)}
              >
                Mark as Paid
              </Button>
            )}
          </span>
        </Card>
        <InvoiceCard invoice={invoice} />
      </div>
      <Modal
        isOpen={isEditOpen}
        onClose={closeEdit}
        title={
          <span className="flex gap-4">
            <span>Edit</span>
            <InvoiceId>{invoice.id}</InvoiceId>
          </span>
        }
      >
        <InvoiceForm
          defaultValues={invoice}
          onSubmit={(values) => {
            onSaveInvoice(
              values,
              invoice.status === InvoiceStatus.draft
                ? InvoiceStatus.pending
                : invoice.status
            );
          }}
        >
          {() => (
            <div className="w-full flex gap-2 justify-end">
              <Button variant={Button.Variants.secondary} onClick={closeEdit}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          )}
        </InvoiceForm>
      </Modal>
      <ConfirmationModal
        open={isDeleteConfirmationOpen}
        onCancel={closeDeleteConfirmation}
        onConfirmation={onDelete}
        title={
          <span className="flex items-center gap-2">
            <span>Delete invoice</span>
            <InvoiceId>{invoiceId}</InvoiceId>
          </span>
        }
        description="Are you sure you want to delete the invoice? All of your data will be permanently removed. This action cannot be undone."
      />
    </>
  );
};
