import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full min-h-screen relative bg-gray-200">
      <Header />
      <div className="px-20 py-10">{children}</div>
    </div>
  );
}
