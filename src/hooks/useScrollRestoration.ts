import { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to save and restore scroll position for a specific route/page
 *
 * @param scrollKey - Unique identifier for this scroll position (typically the route path)
 * @param scrollContainerRef - Optional ref to a scrollable container element. If not provided, uses window.
 * @param enabled - Whether scroll restoration is enabled (default: true)
 *
 * @example
 * ```tsx
 * // For window scrolling
 * useScrollRestoration('/');
 *
 * // For a specific container
 * const containerRef = useRef<HTMLDivElement>(null);
 * useScrollRestoration('/', containerRef);
 * ```
 */
export function useScrollRestoration(
  scrollKey: string,
  scrollContainerRef?: React.RefObject<HTMLElement | null>,
  enabled: boolean = true
) {
  const location = useLocation();
  const isRestoredRef = useRef(false);
  const storageKey = `scroll-position-${scrollKey}`;

  // Debug logging
  const DEBUG = true; // Set to false to disable debug logs
  const debug = useCallback(
    (...args: unknown[]) => {
      if (DEBUG) {
        console.log(`[ScrollRestore:${scrollKey}]`, ...args);
      }
    },
    [scrollKey, DEBUG]
  );

  // Save scroll position before unmounting or navigating away
  useEffect(() => {
    if (!enabled) {
      debug("Scroll restoration disabled");
      return;
    }

    debug("Setting up scroll save listener", {
      currentPath: location.pathname,
      scrollKey,
      hasRef: !!scrollContainerRef,
      refCurrent: scrollContainerRef?.current,
    });

    const saveScrollPosition = () => {
      // Only save if we're currently on the matching route
      if (location.pathname !== scrollKey) {
        debug("Not saving - path mismatch", {
          currentPath: location.pathname,
          scrollKey,
        });
        return;
      }

      try {
        const scrollContainer = scrollContainerRef?.current;

        let scrollTop = 0;
        if (scrollContainer) {
          scrollTop = scrollContainer.scrollTop;
          debug("Saving scroll from container", {
            scrollTop,
            container: scrollContainer.tagName,
            containerScrollHeight: scrollContainer.scrollHeight,
          });
        } else {
          // Fallback to window scroll
          scrollTop =
            window.scrollY ||
            window.pageYOffset ||
            document.documentElement.scrollTop;
          debug("Saving scroll from window", {
            scrollTop,
            windowScrollY: window.scrollY,
            pageYOffset: window.pageYOffset,
            docElementScrollTop: document.documentElement.scrollTop,
          });
        }

        // Always save the scroll position, even if it's 0 (user might be at the top)
        sessionStorage.setItem(storageKey, scrollTop.toString());
        debug("✅ Saved scroll position", { scrollTop, storageKey });
      } catch (error) {
        console.warn("Failed to save scroll position:", error);
        debug("❌ Error saving scroll position", error);
      }
    };

    // Save on scroll events (throttled) to keep position updated
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(saveScrollPosition, 150);
    };

    const container = scrollContainerRef?.current || window;
    debug("Adding scroll listener to container", {
      container: container instanceof Window ? "window" : container.tagName,
      hasRef: !!scrollContainerRef,
    });
    container.addEventListener("scroll", handleScroll, { passive: true });

    // Save on unmount and when location changes away from this route
    return () => {
      debug("Cleaning up scroll listener and saving final position");
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      saveScrollPosition();
    };
  }, [
    scrollKey,
    scrollContainerRef,
    enabled,
    storageKey,
    location.pathname,
    debug,
  ]);

  // Restore scroll position on mount - use useLayoutEffect for synchronous execution before paint
  useLayoutEffect(() => {
    debug("useLayoutEffect triggered", {
      enabled,
      isRestored: isRestoredRef.current,
      currentPath: location.pathname,
      scrollKey,
      hasRef: !!scrollContainerRef,
      refCurrent: scrollContainerRef?.current,
    });

    if (!enabled) {
      debug("Restoration disabled");
      return;
    }

    if (isRestoredRef.current) {
      debug("Already restored, skipping");
      return;
    }

    // Only restore if we're on the matching route
    if (location.pathname !== scrollKey) {
      debug("Not restoring - path mismatch", {
        currentPath: location.pathname,
        scrollKey,
      });
      return;
    }

    const restoreScrollPosition = () => {
      try {
        const savedPosition = sessionStorage.getItem(storageKey);
        debug("Attempting to restore", {
          savedPosition,
          storageKey,
          hasRef: !!scrollContainerRef,
          refCurrent: scrollContainerRef?.current,
        });

        if (!savedPosition) {
          debug("No saved position found");
          isRestoredRef.current = true;
          return true;
        }

        const scrollTop = parseInt(savedPosition, 10);
        if (isNaN(scrollTop)) {
          debug("Invalid saved position", { savedPosition });
          isRestoredRef.current = true;
          return true;
        }

        const scrollContainer = scrollContainerRef?.current;

        // If we have a ref but it's not set yet, return false to retry
        if (scrollContainerRef && !scrollContainer) {
          debug("⏳ Container ref not ready yet, will retry");
          return false;
        }

        if (scrollContainer) {
          // Use direct assignment for immediate effect
          debug("Restoring to container", {
            scrollTop,
            container: scrollContainer.tagName,
            beforeScrollTop: scrollContainer.scrollTop,
            containerScrollHeight: scrollContainer.scrollHeight,
          });
          scrollContainer.scrollTop = scrollTop;
          debug("✅ Restored to container", {
            afterScrollTop: scrollContainer.scrollTop,
          });
        } else {
          // Fallback to window scroll
          debug("Restoring to window", {
            scrollTop,
            beforeScrollY: window.scrollY,
          });
          window.scrollTo({ top: scrollTop, behavior: "instant" });
          debug("✅ Restored to window", {
            afterScrollY: window.scrollY,
          });
        }

        isRestoredRef.current = true;
        return true;
      } catch (error) {
        console.warn("Failed to restore scroll position:", error);
        debug("❌ Error restoring scroll position", error);
        isRestoredRef.current = true;
        return true;
      }
    };

    // Try to restore immediately (useLayoutEffect runs before paint)
    const immediateSuccess = restoreScrollPosition();
    if (!immediateSuccess) {
      debug("Immediate restore failed, starting async retries");
      // If container not ready yet, use async retries
      // This should be rare since we're using useLayoutEffect
      let asyncAttempts = 0;
      const maxAsyncAttempts = 5; // Reduced since we're already in useLayoutEffect

      const tryRestoreAsync = () => {
        debug(`Async restore attempt ${asyncAttempts + 1}/${maxAsyncAttempts}`);
        const success = restoreScrollPosition();
        if (!success && asyncAttempts < maxAsyncAttempts) {
          asyncAttempts++;
          // Use requestAnimationFrame for next frame
          requestAnimationFrame(() => {
            setTimeout(tryRestoreAsync, 0);
          });
        } else if (success) {
          debug("✅ Async restore succeeded");
        } else {
          debug("❌ Async restore failed after max attempts");
        }
      };

      // Start async retries on next frame
      requestAnimationFrame(() => {
        setTimeout(tryRestoreAsync, 0);
      });
    }
  }, [
    scrollKey,
    scrollContainerRef,
    enabled,
    storageKey,
    location.pathname,
    debug,
  ]);

  // Reset restoration flag when route changes
  useEffect(() => {
    if (location.pathname !== scrollKey) {
      debug("Route changed away, resetting restoration flag", {
        currentPath: location.pathname,
        scrollKey,
      });
      isRestoredRef.current = false;
    }
  }, [location.pathname, scrollKey, debug]);
}
