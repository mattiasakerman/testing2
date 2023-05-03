import { Sidebar } from "./Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-background-dark text-white">
      <Sidebar />
      <main className="grow h-screen overflow-auto">
        <div className="container mx-auto px-8 py-10 h-full">{children}</div>
      </main>
    </div>
  );
};
