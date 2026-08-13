import codelabImg from "@/assets/proj-codelab.jpg";
import cinevaultImg from "@/assets/proj-cinevault.jpg";
import bconnectImg from "@/assets/proj-bconnect.jpg";
import whatsappImg from "@/assets/proj-whatsapp.jpg";
import fireboxdeployImg from "@/assets/proj-fireboxdeploy.jpg";

/** Bundled artwork available to the admin dashboard, keyed by a stable name. */
export const imageLibrary: Record<string, string> = {
  "proj-codelab": codelabImg,
  "proj-cinevault": cinevaultImg,
  "proj-bconnect": bconnectImg,
  "proj-whatsapp": whatsappImg,
  "proj-fireboxdeploy": fireboxdeployImg,
};

export const imageKeys = Object.keys(imageLibrary);

/** Accepts a library key, an absolute URL or a site-relative path. */
export function resolveImage(value: string): string {
  if (!value) return imageLibrary["proj-codelab"] ?? "";
  return imageLibrary[value] ?? value;
}
