"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { PhoneIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  ChartPieIcon,
  ChevronDownIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { cn } from "@/components/ui";
import { ButtonLink } from "@/components/ui/button";

import { authClient } from "@/server/better-auth/client";

// Icon mapping for dynamic icon rendering
const iconMap = {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  PhoneIcon,
};

interface NavigationItem {
  name: string;
  href: string;
  description?: string;
  icon?: keyof typeof iconMap;
}

interface NavigationStructure {
  travel: NavigationItem[];
  callsToAction: NavigationItem[];
  simple: NavigationItem[];
}

interface HeaderClientProps {
  navigation: NavigationStructure;
  transparent?: boolean;
}

export default function HeaderClient({ navigation, transparent = false }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  // Use real session state, but default to logged out during loading for marketing focus
  const isLoggedIn = isPending ? false : !!session?.user;

  const getIcon = (iconName: keyof typeof iconMap) => {
    return iconMap[iconName];
  };

  return (
    <>
      {/* Mobile Header - Auth Buttons + Menu */}
      <div className="flex items-center gap-x-2 lg:hidden">
        {isLoggedIn && (
          <ButtonLink
            href="/app/dashboard"
            variant="default"
            size="sm"
            className="h-7 px-2.5 py-1.5 text-xs font-semibold"
          >
            Dashboard
          </ButtonLink>
        )}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>

      {/* Desktop Navigation */}
      <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        {navigation.travel.length > 0 && (
          <Popover className="relative">
            {({ close }) => (
              <>
                <PopoverButton
                  className={cn(
                    "flex cursor-pointer items-center gap-x-1 rounded-full px-3 py-1.5 text-sm/6 font-semibold transition-all",
                    transparent
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-foreground hover:text-primary hover:bg-muted/50",
                  )}
                >
                  Travel
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none" />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute left-1/2 z-10 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  <div className="p-2">
                    {navigation.travel.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group relative block rounded-lg p-3 text-sm/6 hover:bg-gray-50"
                        onClick={close}
                      >
                        <span className="block font-semibold text-gray-900">
                          {item.name}
                        </span>
                        {item.description && (
                          <span className="mt-0.5 block text-gray-600">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>
        )}

        {navigation.simple.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm/6 font-semibold transition-all",
              transparent
                ? "text-white/90 hover:text-white hover:bg-white/10"
                : "text-foreground hover:text-primary hover:bg-muted/50",
            )}
          >
            {item.name}
          </Link>
        ))}
      </PopoverGroup>

      {/* Desktop Auth Buttons */}
      {isLoggedIn && (
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <ButtonLink
            href="/app/dashboard"
            variant="default"
            size="sm"
            className="text-sm/6 font-semibold"
          >
            Dashboard
          </ButtonLink>
        </div>
      )}

      {/* Mobile Navigation Dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 flex w-full flex-col justify-between overflow-y-auto bg-white/95 backdrop-blur-sm sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl font-bold">kristianeboe.me</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* Travel guides */}
                {navigation.travel.length > 0 && (
                  <div className="space-y-2 py-6">
                    <p className="text-muted-foreground -mx-3 px-3 text-sm/6 font-semibold">
                      Travel
                    </p>
                    {navigation.travel.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-foreground hover:bg-muted/50 hover:text-primary -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Simple navigation items */}
                <div className="space-y-2 py-6">
                  {navigation.simple.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground hover:bg-muted/50 hover:text-primary -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Auth buttons */}
                {isLoggedIn && (
                  <div className="space-y-3 py-6">
                    <ButtonLink
                      href="/app/dashboard"
                      variant="default"
                      size="sm"
                      className="w-full justify-center text-base/7 font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </ButtonLink>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call to action buttons at bottom */}
          <div className="sticky bottom-0 grid grid-cols-1 divide-y divide-gray-900/5 bg-gray-50 text-center">
            {navigation.callsToAction.map((item) => {
              const IconComponent = item.icon ? getIcon(item.icon) : null;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {IconComponent && (
                    <IconComponent
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
