import { pageDefaultTitle } from "@/settings";

export default function setPageTitle(routerTitle?: string): void {
  // ? `${routerTitle} | ${pageDefaultTitle}`
  window.document.title = routerTitle
    ? `${routerTitle}`
    : `${pageDefaultTitle}`;
}
