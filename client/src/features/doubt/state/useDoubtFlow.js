// client/src/features/doubt/state/useDoubtFlow.js

import { useState, useEffect } from "react";
import { doubtAPI } from "../../../services/api";

const STORAGE_KEY = "lgc_doubt_input";

const initialState = {
  context: "",
  speakerRole: "",
  listenerRole: "",
  listenerQuestion: "",
  userResponse: "",
  level: "average"
};

export default function useDoubtFlow() {
  const [input, setInput] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Persist input
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  }, [input]);

  /**
   * Update field
   */
  function setField(name, value) {
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  /**
   * Submit doubt request
   */
  async function submit() {
    if (!input.userResponse.trim()) {
      setError("Please describe your thinking before asking for guidance.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await doubtAPI({
        context: input.context,
        speakerRole: input.speakerRole,
        listenerRole: input.listenerRole,
        listenerQuestion: input.listenerQuestion,
        userResponse: input.userResponse,
        level: input.level
      });

    
      if (!res || !res.final) {
        setError("Unexpected response from server.");
      } else {
        setResult(res); // store directly
      }

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return {
    input,
    setField,
    submit,
    loading,
    error,
    result
  };
}