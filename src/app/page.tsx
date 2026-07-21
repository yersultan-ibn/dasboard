import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { launchQueries, rocketQueries } from "@/entities/launch";
import { makeQueryClient } from "@/shared/api/query-client";
import { Icon } from "@/shared/ui";

import styles from "./page.module.scss";
import { DashboardView } from "./ui/dashboard-view";

export default async function Home() {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(launchQueries.list()),
    queryClient.prefetchQuery(launchQueries.latest()),
    queryClient.prefetchQuery(launchQueries.next()),
    queryClient.prefetchQuery(rocketQueries.list()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>
            <Icon name="sparkles" size={14} />
            Конструктор дашбордов
          </span>
          <h1 className={styles.title}>
            Соберите свою панель по данным SpaceX
          </h1>
          <p className={styles.subtitle}>
            Добавляйте и убирайте виджеты, меняйте их порядок перетаскиванием —
            конфигурация сохраняется локально, а данные приходят из SpaceX API
            через React Query с серверным префетчем.
          </p>
        </section>
        <DashboardView />
      </main>
    </HydrationBoundary>
  );
}
