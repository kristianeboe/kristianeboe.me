import { SiteHeaderContent } from "./SiteHeaderContent";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#15110C]/10 bg-[#FAF6EE]/90 px-6 backdrop-blur-lg lg:px-8">
      <SiteHeaderContent />
    </header>
  );
}
