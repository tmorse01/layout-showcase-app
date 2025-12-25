import { useEffect } from "react";

/**
 * Hook to set the document title
 * @param title - The title to set. If not provided, the title won't be changed.
 * @param restoreOnUnmount - Whether to restore the previous title when the component unmounts. Defaults to false.
 */
export function useDocumentTitle(
  title: string | undefined,
  restoreOnUnmount = false
): void {
  useEffect(() => {
    if (title === undefined) {
      return;
    }

    const previousTitle = document.title;
    document.title = title;

    if (restoreOnUnmount) {
      return () => {
        document.title = previousTitle;
      };
    }
  }, [title, restoreOnUnmount]);
}

