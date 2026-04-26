import { useState } from "react";
import { evaluateAPI } from "../../../services/api";

export default function useEvaluateFlow() {

  // 🔥 SCENARIO
  const [scenario, setScenario] = useState({
    context: "",
    speakerRole: "",
    listenerRole: "",
    listenerQuestion: ""
  });

  // 🔥 USER INPUT
  const [input, setInput] = useState({
    userResponse: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  /**
   * Update user response only
   */
  function setField(name, value) {
    if (name !== "userResponse") return;

    setInput({
      userResponse: value
    });
  }

  /**
   * Inject scenario
   */
  function setScenarioData(data) {
    setScenario({
      context: data.context
        .map(line => `${line.speaker}: "${line.text}"`)
        .join("\n"),

      speakerRole: data.speakerRole,
      listenerRole: data.listenerRole,
      listenerQuestion: data.listenerQuestion
    });

    setInput({ userResponse: "" });
    setResult(null);
    setError("");
  }

  /**
   * 🔥 Submit evaluation (FINAL FIXED)
   */
  async function submit() {
    if (!input.userResponse.trim()) {
      setError("Response cannot be empty.");
      return false;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...scenario,
        userResponse: input.userResponse.trim()
      };

      const res = await evaluateAPI(payload);

      console.log("EVALUATE API RESULT:", res); // 🔥 DEBUG

      if (!res || res.error) {
        setError(res?.error || "Invalid response from server.");
        return false;
      }

      // 🔥 SET RESULT DIRECTLY (CORRECT STRUCTURE)
      setResult(res);

      return true;

    } catch {
      setError("Something went wrong. Please try again.");
      return false;
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
    result,
    setScenario: setScenarioData
  };
}