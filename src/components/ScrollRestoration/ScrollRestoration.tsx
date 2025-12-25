import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollRestoration Component
 *
 * Automatically saves and restores scroll positions by route when using
 * browser back/forward navigation. Works with both AppFrame's main scroll
 * container and window scrolling.
 *
 * - Saves scroll position on route change (throttled)
 * - Restores scroll position on back/forward navigation (POP)
 * - Does NOT restore on regular navigation (PUSH) - allows natural scroll to top
 */
const DEBUG = false; // Set to false to disable debug logs

export function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isRestoringRef = useRef(false);
  const previousPathnameRef = useRef<string>(location.pathname);
  const containerRef = useRef<HTMLElement | Window | null>(null);
  const pathnameContainerMapRef = useRef<Map<string, HTMLElement | Window>>(
    new Map()
  );
  // Track the last saved scroll position per route (from scroll handler)
  const lastSavedPositionRef = useRef<Map<string, number>>(new Map());

  const debug = (...args: unknown[]) => {
    if (DEBUG) {
      console.log("[ScrollRestoration]", ...args);
    }
  };

  /**
   * Find the primary scroll container
   * Priority: AppFrame's main element > window
   */
  const getScrollContainer = (): HTMLElement | Window => {
    // Look for AppFrame's main content area (most common case)
    // The main element has CSS module classes, so we find it by tag name
    // and check if it has overflow-y: auto
    const mainElements = document.querySelectorAll("main");
    debug("Finding scroll container:", {
      mainElementsFound: mainElements.length,
    });

    for (const mainElement of mainElements) {
      const style = getComputedStyle(mainElement);
      const overflowY = style.overflowY;
      debug("Checking main element:", {
        tagName: mainElement.tagName,
        overflowY,
        scrollHeight: (mainElement as HTMLElement).scrollHeight,
        clientHeight: (mainElement as HTMLElement).clientHeight,
      });

      if (overflowY === "auto" || overflowY === "scroll") {
        debug("✅ Using main element as scroll container");
        return mainElement as HTMLElement;
      }
    }
    // Fallback to window
    debug(
      "⚠️ No suitable main element found, using window as scroll container"
    );
    return window;
  };

  /**
   * Get current scroll position from container
   */
  const getScrollPosition = (container: HTMLElement | Window): number => {
    if (container instanceof Window) {
      return (
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop
      );
    }
    return container.scrollTop;
  };

  /**
   * Set scroll position on container
   */
  const setScrollPosition = (
    container: HTMLElement | Window,
    position: number
  ): void => {
    if (container instanceof Window) {
      window.scrollTo({ top: position, behavior: "instant" });
    } else {
      container.scrollTop = position;
    }
  };

  /**
   * Get storage key for current route
   */
  const getStorageKey = (pathname: string): string => {
    return `scroll-position-${pathname}`;
  };

  /**
   * Save scroll position to sessionStorage
   */
  const saveScrollPosition = (pathname: string): void => {
    try {
      const container = getScrollContainer();
      const scrollTop = getScrollPosition(container);
      const storageKey = getStorageKey(pathname);
      sessionStorage.setItem(storageKey, scrollTop.toString());
      debug("💾 Saved scroll position:", {
        pathname,
        scrollTop,
        storageKey,
        containerType: container instanceof Window ? "window" : "HTMLElement",
        containerScrollHeight:
          container instanceof Window
            ? document.documentElement.scrollHeight
            : (container as HTMLElement).scrollHeight,
      });
    } catch (error) {
      console.warn("Failed to save scroll position:", error);
      debug("❌ Error saving scroll position:", error);
    }
  };

  /**
   * Restore scroll position from sessionStorage
   */
  const restoreScrollPosition = (pathname: string): boolean => {
    try {
      const storageKey = getStorageKey(pathname);
      const savedPosition = sessionStorage.getItem(storageKey);

      debug("🔄 Attempting to restore scroll position:", {
        pathname,
        storageKey,
        savedPosition,
      });

      if (!savedPosition) {
        debug("⚠️ No saved position found for route");
        return false;
      }

      const scrollTop = parseInt(savedPosition, 10);
      if (isNaN(scrollTop)) {
        debug("⚠️ Invalid saved position:", savedPosition);
        return false;
      }

      const container = getScrollContainer();

      // If container is not ready (e.g., main element not rendered yet), retry
      if (!(container instanceof Window) && !container) {
        debug("⏳ Container not ready yet, will retry");
        return false;
      }

      const beforeScroll = getScrollPosition(container);
      debug("📊 Before restore:", {
        beforeScroll,
        targetScroll: scrollTop,
        containerType: container instanceof Window ? "window" : "HTMLElement",
        containerScrollHeight:
          container instanceof Window
            ? document.documentElement.scrollHeight
            : (container as HTMLElement).scrollHeight,
      });

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        setScrollPosition(container, scrollTop);
        const afterScroll = getScrollPosition(container);
        debug("✅ Restored scroll position:", {
          targetScroll: scrollTop,
          afterScroll,
          success: Math.abs(afterScroll - scrollTop) < 5, // Allow 5px tolerance
        });
        isRestoringRef.current = false;
      });

      return true;
    } catch (error) {
      console.warn("Failed to restore scroll position:", error);
      debug("❌ Error restoring scroll position:", error);
      isRestoringRef.current = false;
      return false;
    }
  };

  // Update previous pathname ref (for tracking route changes)
  useEffect(() => {
    previousPathnameRef.current = location.pathname;
  }, [location.pathname]);

  // Set up scroll listener for current route
  useEffect(() => {
    debug("📍 Route changed, setting up scroll listener:", {
      pathname: location.pathname,
      navigationType,
    });

    const container = getScrollContainer();
    containerRef.current = container; // Store container reference
    // Store container for this pathname
    pathnameContainerMapRef.current.set(location.pathname, container);
    const initialScroll = getScrollPosition(container);
    debug("📌 Initial scroll position:", {
      pathname: location.pathname,
      initialScroll,
      containerType: container instanceof Window ? "window" : "HTMLElement",
    });

    // Throttled scroll handler
    const handleScroll = () => {
      if (isRestoringRef.current) {
        // Don't save while restoring
        debug("⏸️ Skipping save - currently restoring");
        return;
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const currentScroll = getScrollPosition(container);
        debug("📜 Scroll event:", {
          pathname: location.pathname,
          scrollTop: currentScroll,
        });
        // Save to storage and track the last saved position
        saveScrollPosition(location.pathname);
        lastSavedPositionRef.current.set(location.pathname, currentScroll);
      }, 150);
    };

    // Add scroll listener
    container.addEventListener("scroll", handleScroll, { passive: true });
    debug("👂 Added scroll listener to container");

    // Cleanup - this runs BEFORE the new route's effect, so we can save the position here
    return () => {
      const pathnameToSave = location.pathname; // This is still the old pathname
      debug("🧹 Cleaning up scroll listener for:", pathnameToSave);

      // Check if we already have a saved position from scroll handler
      const lastSaved = lastSavedPositionRef.current.get(pathnameToSave);

      // Flush any pending throttled saves, but only if we don't already have a saved value
      // If we have a saved value, the flush would read from container (which may be at 0)
      if (scrollTimeoutRef.current && lastSaved === undefined) {
        clearTimeout(scrollTimeoutRef.current);
        // Execute the pending save synchronously
        const currentScroll = getScrollPosition(container);
        // Only use this if container hasn't been scrolled to 0 by React Router
        if (currentScroll > 0) {
          saveScrollPosition(pathnameToSave);
          lastSavedPositionRef.current.set(pathnameToSave, currentScroll);
        }
        scrollTimeoutRef.current = undefined;
      } else if (scrollTimeoutRef.current) {
        // We have a saved value, just clear the timeout without flushing
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = undefined;
      }

      // Use the last saved position from scroll handler, or fall back to reading from container
      // The last saved position is more reliable because React Router may have already scrolled to 0
      const finalLastSaved = lastSavedPositionRef.current.get(pathnameToSave);
      const containerScroll = getScrollPosition(container);
      // Only use container scroll if it's > 0 (not scrolled by React Router) and we don't have a saved value
      const scrollTop =
        finalLastSaved !== undefined
          ? finalLastSaved
          : containerScroll > 0
          ? containerScroll
          : 0;
      const storageKey = getStorageKey(pathnameToSave);
      sessionStorage.setItem(storageKey, scrollTop.toString());
      debug("💾 Saved scroll position in cleanup (before route change):", {
        pathname: pathnameToSave,
        scrollTop,
        source:
          finalLastSaved !== undefined
            ? "lastSaved"
            : containerScroll > 0
            ? "container"
            : "fallback",
        lastSaved: finalLastSaved,
        containerScroll,
        storageKey,
        containerType: container instanceof Window ? "window" : "HTMLElement",
      });

      container.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Restore scroll position on back/forward navigation
  useLayoutEffect(() => {
    debug("🎯 useLayoutEffect triggered:", {
      pathname: location.pathname,
      navigationType,
      isRestoring: isRestoringRef.current,
    });

    // Only restore on POP navigation (back/forward)
    // Don't restore on PUSH (regular navigation) - let it scroll to top naturally
    if (navigationType === "POP") {
      debug("⬅️ POP navigation detected - attempting to restore scroll");
      isRestoringRef.current = true;

      // Try immediate restoration
      const restored = restoreScrollPosition(location.pathname);

      // If immediate restoration failed (container not ready), retry
      if (!restored) {
        debug("⏳ Immediate restore failed, starting retry loop");
        let attempts = 0;
        const maxAttempts = 10;

        const tryRestore = () => {
          attempts++;
          debug(`🔄 Retry attempt ${attempts}/${maxAttempts}`);
          const success = restoreScrollPosition(location.pathname);

          if (!success && attempts < maxAttempts) {
            // Retry on next frame
            requestAnimationFrame(() => {
              setTimeout(tryRestore, 0);
            });
          } else if (!success) {
            // Give up after max attempts
            debug("❌ Failed to restore after max attempts");
            isRestoringRef.current = false;
          } else {
            debug("✅ Restore succeeded on retry");
          }
        };

        requestAnimationFrame(() => {
          setTimeout(tryRestore, 0);
        });
      } else {
        debug("✅ Immediate restore succeeded");
      }
    } else {
      // For PUSH/REPLACE navigation, scroll to top
      // This happens naturally, but we ensure it explicitly
      debug("➡️ PUSH/REPLACE navigation - scrolling to top");
      const container = getScrollContainer();
      if (!(container instanceof Window) && container) {
        // For container scrolling, explicitly set to top
        requestAnimationFrame(() => {
          setScrollPosition(container, 0);
          debug("⬆️ Scrolled container to top");
        });
      } else {
        debug("⬆️ Window scrolling - React Router handles this");
      }
    }
  }, [location.pathname, navigationType]);

  // This component doesn't render anything
  return null;
}
