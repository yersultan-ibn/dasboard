import type { FC, ReactNode } from "react";

import { StateMessage } from "./state-message";

type QueryBoundaryProps = {
  isLoading: boolean;
  isError: boolean;
  isEmpty?: boolean;
  /** Skeleton to show while loading; falls back to a small text state. */
  loading?: ReactNode;
  errorTitle?: string;
  errorDescription?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  children: ReactNode;
};

/**
 * Collapses the loading / error / empty / ready branches every data widget
 * repeats into one declarative wrapper, so a tile body is written once for the
 * happy path and only supplies its own skeleton and copy.
 */
export const QueryBoundary: FC<QueryBoundaryProps> = ({
  isLoading,
  isError,
  isEmpty = false,
  loading,
  errorTitle = "Не удалось загрузить данные",
  errorDescription = "Проверьте соединение и обновите страницу.",
  emptyTitle = "Нет данных для отображения",
  emptyDescription,
  children,
}) => {
  if (isLoading) {
    return <>{loading ?? <StateMessage icon="clock" title="Загрузка…" />}</>;
  }

  if (isError) {
    return (
      <StateMessage
        tone="error"
        icon="alert"
        title={errorTitle}
        description={errorDescription}
      />
    );
  }

  if (isEmpty) {
    return (
      <StateMessage
        icon="sparkles"
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return <>{children}</>;
};
