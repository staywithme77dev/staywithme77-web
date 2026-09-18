import * as rootParams from "next/root-params";
import {hasLocale} from "next-intl";
import { getRequestConfig } from "next-intl/server";
import {notFound} from "next/navigation";
import {loadMessages} from "./messages";
import {routing, type AppLocale} from "./routing";

export default getRequestConfig(async ({locale}) => {
  if (!locale) {
    const routeLocale = await rootParams.locale();
    if (!hasLocale(routing.locales, routeLocale)) notFound();
    locale = routeLocale;
  }

  return {
    locale,
    messages: await loadMessages(locale as AppLocale),
    timeZone: "Asia/Bangkok",
  };
});
