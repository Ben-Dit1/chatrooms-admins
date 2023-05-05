import { Inter } from "next/font/google";
import { OrganizationTable } from "@/components/Organizations/OrganizationTable";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex justify-center w-full">
      <OrganizationTable />
    </main>
  );
}
