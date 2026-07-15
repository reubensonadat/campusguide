"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Minus, Locate, Maximize, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMap } from "./context";

type MapControlsProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showCompass?: boolean;
  show3D?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
  onLocate?: (coords: { longitude: number; latitude: number }) => void;
};

const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
};

function ControlGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-slate-200 bg-white [&>button:not(:last-child)]:border-slate-200 flex flex-col overflow-hidden rounded-md border shadow-sm [&>button:not(:last-child)]:border-b">
      {children}
    </div>
  );
}

function ControlButton({
  onClick,
  label,
  children,
  disabled = false,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      type="button"
      className={cn(
        "flex size-8 items-center justify-center transition-all",
        "first:rounded-t-md last:rounded-b-md",
        "hover:bg-slate-100",
        "focus-visible:ring-slate-950 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
        "disabled:pointer-events-none disabled:opacity-50",
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function CompassButton({ onClick }: { onClick: () => void }) {
  const { map } = useMap();
  const compassRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!map || !compassRef.current) return;
    const compass = compassRef.current;
    const updateRotation = () => {
      const bearing = map.getBearing();
      const pitch = map.getPitch();
      compass.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`;
    };
    map.on("rotate", updateRotation);
    map.on("pitch", updateRotation);
    updateRotation();
    return () => {
      map.off("rotate", updateRotation);
      map.off("pitch", updateRotation);
    };
  }, [map]);

  return (
    <ControlButton onClick={onClick} label="Reset bearing to north">
      <svg
        ref={compassRef}
        viewBox="0 0 24 24"
        className="size-5 transition-transform duration-200"
        style={{ transformStyle: "preserve-3d" }}
      >
        <path d="M12 2L16 12H12V2Z" className="fill-red-500" />
        <path d="M12 2L8 12H12V2Z" className="fill-red-300" />
        <path d="M12 22L16 12H12V22Z" className="fill-muted-foreground/60" />
        <path d="M12 22L8 12H12V22Z" className="fill-muted-foreground/30" />
      </svg>
    </ControlButton>
  );
}

function PitchToggle({ onClick }: { onClick: () => void }) {
  const { map } = useMap();
  const [is3D, setIs3D] = useState(false);

  useEffect(() => {
    if (!map) return;
    const checkPitch = () => {
      setIs3D(map.getPitch() > 30);
    };
    map.on("pitch", checkPitch);
    checkPitch();
    return () => {
      map.off("pitch", checkPitch);
    };
  }, [map]);

  const togglePitch = useCallback(() => {
    if (!map) return;
    const nextPitch = map.getPitch() > 30 ? 0 : 60;
    map.easeTo({ pitch: nextPitch, duration: 600 });
    onClick();
  }, [map, onClick]);

  return (
    <ControlButton onClick={togglePitch} label={is3D ? "Switch to 2D view" : "Switch to 3D view"}>
      <span className={cn("text-xs font-bold transition-colors", is3D ? "text-primary-600" : "text-slate-600")}>
        {is3D ? "2D" : "3D"}
      </span>
    </ControlButton>
  );
}

function MapControls({
  position = "bottom-right",
  showZoom = true,
  showCompass = false,
  show3D = false,
  showLocate = false,
  showFullscreen = false,
  className,
  onLocate,
}: MapControlsProps) {
  const { map } = useMap();
  const [waitingForLocation, setWaitingForLocation] = useState(false);

  const handleZoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 });
  }, [map]);

  const handleZoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 });
  }, [map]);

  const handleResetBearing = useCallback(() => {
    map?.resetNorthPitch({ duration: 300 });
  }, [map]);

  const handleLocate = useCallback(() => {
    setWaitingForLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };
          if (onLocate) {
            onLocate(coords);
          } else {
            map?.flyTo({
              center: [coords.longitude, coords.latitude],
              zoom: 14,
              duration: 1500,
            });
          }
          setWaitingForLocation(false);
        },
        () => {
          setWaitingForLocation(false);
        },
      );
    }
  }, [map, onLocate]);

  useEffect(() => {
    const toggleCustomCursor = () => {
      const style = document.getElementById('custom-cursor-hide');
      if (document.fullscreenElement) {
        if (style) style.remove();
      } else {
        if (!style) {
          const s = document.createElement('style');
          s.id = 'custom-cursor-hide';
          s.textContent = '* { cursor: none !important; }';
          document.head.appendChild(s);
        }
      }
    };
    document.addEventListener('fullscreenchange', toggleCustomCursor);
    return () => document.removeEventListener('fullscreenchange', toggleCustomCursor);
  }, []);

  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [map]);

  return (
    <div
      className={cn(
        "absolute z-10 flex flex-col gap-1.5",
        positionClasses[position],
        className,
      )}
    >
      {showZoom && (
        <ControlGroup>
          <ControlButton onClick={handleZoomIn} label="Zoom in">
            <Plus className="size-4" />
          </ControlButton>
          <ControlButton onClick={handleZoomOut} label="Zoom out">
            <Minus className="size-4" />
          </ControlButton>
        </ControlGroup>
      )}
      {(showCompass || show3D) && (
        <ControlGroup>
          {showCompass && <CompassButton onClick={handleResetBearing} />}
          {show3D && <PitchToggle onClick={() => {}} />}
        </ControlGroup>
      )}
      {(showLocate || showFullscreen) && (
        <ControlGroup>
          {showLocate && (
            <ControlButton
              onClick={handleLocate}
              label="Find my location"
              disabled={waitingForLocation}
            >
              {waitingForLocation ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Locate className="size-4" />
              )}
            </ControlButton>
          )}
          {showFullscreen && (
            <ControlButton onClick={handleFullscreen} label="Toggle fullscreen">
              <Maximize className="size-4" />
            </ControlButton>
          )}
        </ControlGroup>
      )}
    </div>
  );
}

export { MapControls, ControlGroup, ControlButton, CompassButton };
export type { MapControlsProps };
