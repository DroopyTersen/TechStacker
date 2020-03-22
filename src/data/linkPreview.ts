import { cachify } from "../ui-toolkit/core/utils/cache";
import useAsyncData from "../ui-toolkit/hooks/useAsyncData";
import { useEffect } from "react";

var _previewLink = async function(linkUrl): Promise<LinkPreview> {
  if (!linkUrl) return { url: "" };
  const API_KEY = "5dfdb5c52d4bb8f14179f61cad1a80133387187c01092";
  let apiUrl = `https://api.linkpreview.net/?key=${API_KEY}&q=${linkUrl}`;
  let resp = await fetch(apiUrl);
  if (!resp.ok) {
    let error = await resp.text();
    throw new Error("Unable to preview link:" + error);
  }
  return resp.json();
};

const CACHE_DURATION = 1000 * 60 * 60 * 40;
export const previewLink = cachify(_previewLink, {
  getCacheKey: (...args) => "LinkPreview-" + JSON.stringify(args),
  location: localStorage,
  duration: CACHE_DURATION,
}) as (url: string) => Promise<LinkPreview>;

export interface LinkPreview {
  title?: string;
  url: string;
  description?: string;
  image?: string;
}

export interface LinkPreviewOptions {
  onStart?: () => void;
  onSuccess?: (date: LinkPreview) => void;
  onError?: (error) => void;
  skipCheck?: () => boolean;
}
export function useLinkPreview(linkUrl: string, options: LinkPreviewOptions = {}) {
  useEffect(() => {
    let isMounted = true;
    let fetchPreview = async () => {
      if (options.onStart) {
        options.onStart();
      }
      try {
        let linkPreview = await previewLink(linkUrl);
        if (isMounted && options.onSuccess) {
          options.onSuccess(linkPreview);
        }
      } catch (err) {
        console.log("Link Previww Error", err);
        if (options.onError) {
          options.onError(err);
        }
      }
    };
    let shouldCheck = options.skipCheck ? !options.skipCheck() : true;
    if (linkUrl && shouldCheck) {
      fetchPreview();
    }

    return () => (isMounted = false);
  }, [linkUrl]);
}
