import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tours-from-mangalore")({
  component: MangaloreToursLayout,
});

function MangaloreToursLayout() {
  return <Outlet />;
}
