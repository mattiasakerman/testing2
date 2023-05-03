import { Card } from "components/Card";
import { useListInvoices } from "domain/invoices/hooks/useListInvoices";
import { ReactComponent as IconArrowRight } from "components/Icons/icon-arrow-right.svg";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const invoices = useListInvoices();
  return (
    <div className="grid grid-cols-2 gap-8">
      <Link to="/invoices">
        <Card className="flex items-center justify-between hover:bg-secondary-500">
          <div>
            <div className="text-2xl font-semibold">Invoices</div>
            <div className="text-accent-700">{invoices.length} invoices</div>
          </div>
          <IconArrowRight />
        </Card>
      </Link>
    </div>
  );
};
