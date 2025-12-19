"use client";

import { useEffect, useState } from "react";
import AssistantWidget from "@/components/assistant/AssistantWidget";

export default function AssistantWidgetClient() {
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!mounted) {
    return null;
  }

  return <AssistantWidget />;
}
