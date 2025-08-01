import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDocumentProxyUrl(url: string): string {
  if (!url) {
    // logger.info('No document URL provided');
  }
  return url?.startsWith("https://mms-delivery") ? "/api/doc?path=" + url : url
}
