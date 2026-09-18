"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type DateRangePickerProps = {
  checkIn: string;
  checkOut: string;
  minDate: string;
  onChange: (range: { checkIn: string; checkOut: string }) => void;
  embedded?: boolean;
  error?: boolean;
};

const MONTHS_TH = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEKDAYS_TH = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateKey(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatDate(value: string, locale: string, selectDate: string) {
  if (!value) return selectDate;
  const date = parseDate(value);
  const months = locale === "en" ? MONTHS_EN : MONTHS_TH;
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  return Math.round(
    (parseDate(checkOut).getTime() - parseDate(checkIn).getTime()) / 86400000,
  );
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function monthDays(month: Date) {
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const count = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const cells: Array<Date | null> = Array.from(
    { length: start.getDay() },
    () => null,
  );
  for (let day = 1; day <= count; day += 1)
    cells.push(new Date(month.getFullYear(), month.getMonth(), day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function DateRangePicker({
  checkIn,
  checkOut,
  minDate,
  onChange,
  embedded = false,
  error = false,
}: DateRangePickerProps) {
  const locale = useLocale();
  const t = useTranslations("DatePicker");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const date = minDate ? parseDate(minDate) : new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [draftIn, setDraftIn] = useState(checkIn);
  const [draftOut, setDraftOut] = useState(checkOut);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, checkIn, checkOut]);

  // Mobile calendar scrolls through the next five years; desktop still shows only the first two.
  const months = useMemo(
    () => Array.from({ length: 60 }, (_, index) => addMonths(cursor, index)),
    [cursor],
  );
  const minMonth = minDate ? parseDate(minDate) : new Date();
  const canGoPrevious =
    cursor.getFullYear() > minMonth.getFullYear() ||
    cursor.getMonth() > minMonth.getMonth();
  const nights = getNights(draftIn, draftOut);

  const chooseDate = (value: string) => {
    if (!draftIn || (draftIn && draftOut)) {
      setDraftIn(value);
      setDraftOut("");
      return;
    }
    if (value <= draftIn) {
      if (value === draftIn) return;
      setDraftIn(value);
      return;
    }
    setDraftOut(value);
  };

  const confirm = () => {
    if (!draftIn || !draftOut) return;
    onChange({ checkIn: draftIn, checkOut: draftOut });
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDraftIn(checkIn);
          setDraftOut(checkOut);
          setOpen(true);
        }}
        className={`w-full text-left transition ${embedded ? `rounded-xl px-2 py-1 ${error ? "ring-2 ring-red-400/60" : ""}` : `rounded-xl border bg-white px-3 py-3 shadow-sm hover:border-accent ${error ? "border-red-400" : "border-gray-200"}`}`}
      >
        {embedded ? (
          <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-3">
            <CalendarDays className="shrink-0 text-accent" size={20} />
            <div className="min-w-0 border-r border-gray-200 pr-4">
              <p className="text-[11px] font-medium text-gray-400">
                {t("checkIn")}
              </p>
              <p
                className={`mt-1 truncate text-sm font-bold ${checkIn ? "text-foreground" : "text-accent"}`}
              >
                {checkIn
                  ? formatDate(checkIn, locale, t("selectDate"))
                  : t("selectDate")}
              </p>
            </div>
            {nights > 0 && <ArrowRight size={16} className="text-gray-300" />}
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-gray-400">
                {t("checkOut")}{" "}
                {nights > 0 && (
                  <span className="text-[#926b07]">
                    ({t("nights", { count: nights })})
                  </span>
                )}
              </p>
              <p
                className={`mt-1 truncate text-sm font-bold ${checkOut ? "text-foreground" : "text-accent"}`}
              >
                {checkOut
                  ? formatDate(checkOut, locale, t("selectDate"))
                  : t("selectDate")}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <CalendarDays className="shrink-0 text-accent" size={19} />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-gray-400">
                {t("stayDates")}
              </p>
              <div className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className={checkIn ? "" : "text-accent"}>
                  {formatDate(checkIn, locale, t("selectDate"))}
                </span>
                <ArrowRight size={14} className="text-gray-300" />
                <span className={checkOut ? "" : "text-accent"}>
                  {formatDate(checkOut, locale, t("selectDate"))}
                </span>
              </div>
              {nights > 0 && (
                <p className="mt-1 text-xs font-medium text-[#926b07]">
                  {t("stayNights", { count: nights })}
                </p>
              )}
            </div>
          </div>
        )}
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/45 sm:items-center sm:p-4">
            <div className="animate-slide-up flex h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-[760px] sm:rounded-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7">
                <div>
                  <p className="text-xs font-medium text-gray-400 sm:hidden">
                    {t("selectDateTime")}
                  </p>
                  <p className="hidden text-xs font-medium text-gray-400 sm:block">
                    {t("selectStayDates")}
                  </p>
                  <p className="mt-1 text-base font-bold text-foreground">
                    {draftIn
                      ? formatDate(draftIn, locale, t("selectDate"))
                      : t("selectCheckIn")}{" "}
                    <span className="px-1 text-gray-300">→</span>{" "}
                    {draftOut
                      ? formatDate(draftOut, locale, t("selectDate"))
                      : t("selectCheckOut")}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#926b07]">
                    {nights > 0
                      ? t("stayNights", { count: nights })
                      : draftIn
                        ? t("selectCheckOut")
                        : t("selectCheckInFirst")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  aria-label={t("close")}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="hidden items-center justify-between border-b border-gray-100 px-7 py-3 sm:flex">
                <button
                  type="button"
                  disabled={!canGoPrevious}
                  onClick={() => setCursor(addMonths(cursor, -1))}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-20"
                  aria-label={t("previousMonth")}
                >
                  <ChevronLeft size={19} />
                </button>
                <p className="text-base font-bold text-foreground">
                  {(locale === "en" ? MONTHS_EN : MONTHS_TH)[cursor.getMonth()]}{" "}
                  {cursor.getFullYear()}
                </p>
                <button
                  type="button"
                  onClick={() => setCursor(addMonths(cursor, 1))}
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                  aria-label={t("nextMonth")}
                >
                  <ChevronRight size={19} />
                </button>
              </div>

              <div className="overflow-y-auto px-4 py-2 sm:px-7 sm:py-5">
                <div className="grid gap-8 sm:grid-cols-2">
                  {months.map((month, index) => (
                    <div
                      key={`${month.getFullYear()}-${month.getMonth()}`}
                      className={index >= 2 ? "sm:hidden" : ""}
                    >
                      <CalendarMonth
                        month={month}
                        minDate={minDate}
                        checkIn={draftIn}
                        checkOut={draftOut}
                        onChoose={chooseDate}
                        locale={locale}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-100 bg-white px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={() => {
                    setDraftIn("");
                    setDraftOut("");
                  }}
                  className="cursor-pointer text-sm font-medium text-gray-500 hover:text-foreground"
                >
                  {t("clear")}
                </button>
                <button
                  type="button"
                  disabled={nights <= 0}
                  onClick={confirm}
                  className="cursor-pointer text-white rounded-xl bg-accent px-6 py-3 text-sm font-bold text-foreground transition hover:bg-[#b89536] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {nights > 0
                    ? t("confirmNights", { count: nights })
                    : t("confirm")}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

function CalendarMonth({
  month,
  minDate,
  checkIn,
  checkOut,
  onChoose,
  locale,
}: {
  month: Date;
  minDate: string;
  checkIn: string;
  checkOut: string;
  onChoose: (value: string) => void;
  locale: string;
}) {
  return (
    <div>
      <h3 className="mb-3 text-center text-lg font-bold text-foreground">
        {(locale === "en" ? MONTHS_EN : MONTHS_TH)[month.getMonth()]}{" "}
        {month.getFullYear()}
      </h3>
      <div className="grid grid-cols-7 text-center text-[11px] font-semibold text-gray-400">
        {(locale === "en" ? WEEKDAYS_EN : WEEKDAYS_TH).map((day) => (
          <span key={day} className="py-1">
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {monthDays(month).map((date, index) => {
          if (!date) return <span key={`empty-${index}`} className="h-10" />;
          const value = toDateKey(date);
          const disabled = value < minDate;
          const inRange = Boolean(
            checkIn && checkOut && value > checkIn && value < checkOut,
          );
          const selected = value === checkIn || value === checkOut;
          return (
            <button
              key={value}
              type="button"
              disabled={disabled}
              onClick={() => onChoose(value)}
              className={`cursor-pointer relative h-10 text-sm transition ${inRange ? "bg-[#ffd560] text-foreground" : "rounded-full"} ${selected ? "z-10 rounded-full bg-[#af8e3f] font-bold text-white shadow-sm" : "hover:bg-[#ffd560]"} ${disabled ? "cursor-not-allowed text-gray-200 hover:bg-transparent" : "text-gray-700"}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
