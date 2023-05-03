import { Layout } from "../components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InvoicesPage } from "./pages/invoices/InvoicesPage";
import { InvoicePage } from "./pages/invoices/InvoicePage";
import { HomePage } from "./pages/HomePage";
import { MockDataProvider } from "infrastructure/MockDataContext";

function App() {
  return (
    <MockDataProvider>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/invoices">
              <Route index element={<InvoicesPage />} />
              <Route path="/invoices/:invoiceId" element={<InvoicePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Layout>
    </MockDataProvider>
  );
}

export default App;
