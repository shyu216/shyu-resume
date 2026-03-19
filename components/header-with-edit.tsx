"use client";

import { Header } from "@/components/header";
import { useSummaryEdit } from "@/components/summary/summary-edit-provider";

export function HeaderWithEdit() {
  const { isEditing, toggleEdit, saveEdit, cancelEdit, setContentFromHistory, getCurrentContent } = useSummaryEdit();
  
  return (
    <Header
      isEditingSummary={isEditing}
      onToggleEditSummary={toggleEdit}
      onSaveSummary={saveEdit}
      onCancelEditSummary={cancelEdit}
      onSelectHistorySummary={setContentFromHistory}
      currentSummaryContent={getCurrentContent()}
    />
  );
}
