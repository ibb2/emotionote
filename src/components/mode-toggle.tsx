import { useEffect, useRef, useState } from "react";
import {
  CheckIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  type LucideIcon,
} from "lucide-react";

import { useTheme, type Theme } from "@/components/theme-provider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themeOptions: Array<{
  value: Theme;
  label: string;
  icon: LucideIcon;
}> = [
  { value: "light", label: "Light", icon: SunIcon },
  { value: "dark", label: "Dark", icon: MoonIcon },
  { value: "system", label: "System", icon: MonitorIcon },
];

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedTheme = themeOptions.find((option) => option.value === theme);
  const CurrentIcon = selectedTheme?.icon ?? MonitorIcon;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <CurrentIcon data-icon="inline-start" />
        <span>Theme: {selectedTheme?.label ?? "System"}</span>
      </button>

      <div
        role="menu"
        aria-label="Theme"
        className={cn(
          "absolute right-0 top-full z-50 mt-2 min-w-48 rounded-3xl border border-border bg-popover p-1.5 text-popover-foreground shadow-lg ring-1 ring-foreground/5",
          !open && "hidden",
        )}
      >
        <div className="px-3 py-2.5 text-xs text-muted-foreground">Theme</div>
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={isSelected}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-2xl px-3 py-2 text-left text-sm font-medium outline-hidden hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                isSelected && "bg-accent text-accent-foreground",
              )}
              onClick={() => handleThemeChange(option.value)}
            >
              <Icon />
              <span>{option.label}</span>
              <CheckIcon className={cn("ml-auto", !isSelected && "opacity-0")} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
