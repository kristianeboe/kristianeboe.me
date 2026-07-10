import { SiteHeaderContent } from "./SiteHeaderContent";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-[#15110C]/10 bg-[#FAF6EE]/90 backdrop-blur-lg">
      <SiteHeaderContent />
    </header>
  );
}
