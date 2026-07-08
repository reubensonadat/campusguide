"use client";

import MapLibreGL, { type PopupOptions } from "maplibre-gl";
import { useEffect, useMemo, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { useMap } from "./context";
import { PopupCloseButton } from "./marker";

type MapPopupProps = {
  longitude: number;
  latitude: number;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
  closeButton?: boolean;
} & Omit<PopupOptions, "className" | "closeButton">;

function MapPopup({
  longitude,
  latitude,
  onClose,
  children,
  className,
  closeButton = false,
  ...popupOptions
}: MapPopupProps) {
  const { map } = useMap();
  const popupOptionsRef = useRef(popupOptions);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const container = useMemo(() => document.createElement("div"), []);

  const popup = useMemo(() => {
    return new MapLibreGL.Popup({
      offset: 16,
      ...popupOptions,
      closeButton: false,
    })
      .setMaxWidth("none")
      .setLngLat([longitude, latitude]);
  }, []);

  useEffect(() => {
    if (!map) return;
    const handleClose = () => onCloseRef.current?.();
    popup.on("close", handleClose);
    popup.setDOMContent(container);
    popup.addTo(map);
    return () => {
      popup.off("close", handleClose);
      if (popup.isOpen()) {
        popup.remove();
      }
    };
  }, [map, popup, container]);

  if (popup.isOpen()) {
    const prev = popupOptionsRef.current;
    if (
      popup.getLngLat().lng !== longitude ||
      popup.getLngLat().lat !== latitude
    ) {
      popup.setLngLat([longitude, latitude]);
    }
    if (prev.offset !== popupOptions.offset) {
      popup.setOffset(popupOptions.offset ?? 16);
    }
    if (prev.maxWidth !== popupOptions.maxWidth && popupOptions.maxWidth) {
      popup.setMaxWidth(popupOptions.maxWidth ?? "none");
    }
    popupOptionsRef.current = popupOptions;
  }

  const handleCloseClick = () => popup.remove();

  return createPortal(
    <div
      className={cn(
        "bg-white text-slate-950 relative max-w-62 rounded-md border border-slate-200 p-3 shadow-md",
        "animate-in fade-in-0 zoom-in-95 duration-200 ease-out",
        className,
      )}
    >
      {closeButton && <PopupCloseButton onClick={handleCloseClick} />}
      {children}
    </div>,
    container,
  );
}

export { MapPopup };
export type { MapPopupProps };
