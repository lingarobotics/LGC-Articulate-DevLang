// client/src/features/doubt/DoubtPage.jsx

import React from "react";

import useDoubtFlow from "./state/useDoubtFlow";

import DoubtForm from "./components/DoubtForm";
import DoubtResult from "./components/DoubtResult";
import EmptyState from "../../shared/components/EmptyState";

// 🔥 MODE SWITCH
import ModeSwitchPanel from "../../shared/components/ModeSwitchPanel";

export default function DoubtPage() {
  const {
    input,
    setField,
    submit,
    loading,
    error,
    result
  } = useDoubtFlow();

  return (
    <div className="doubt-page">

      {/* INPUT */}
      <DoubtForm
        input={input}
        setField={setField}
        onSubmit={submit}
        loading={loading}
        error={error}
      />

      {/* EMPTY */}
      {!result && !loading && !error && (
        <EmptyState message="Ask a doubt to get guidance from the AI coach." />
      )}

      {/* RESULT */}
      {result && (
        <DoubtResult
          aiFeedback={result}
          userResponse={input.userResponse}
        />
      )}

      {/* 🔥 ALWAYS AVAILABLE (BOTTOM) */}
      <ModeSwitchPanel />

    </div>
  );
}