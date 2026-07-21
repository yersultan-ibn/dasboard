"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState, type FC } from "react";

import { launchKeys, rocketKeys } from "@/entities/launch";
import { Button } from "@/shared/ui";

export const RefreshButton: FC = () => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: launchKeys.all }),
        queryClient.invalidateQueries({ queryKey: rocketKeys.all }),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      variant="secondary"
      icon="refresh"
      onClick={handleRefresh}
      disabled={isRefreshing}
    >
      {isRefreshing ? "Обновляем…" : "Обновить"}
    </Button>
  );
};
