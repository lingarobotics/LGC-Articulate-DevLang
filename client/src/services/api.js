// client/src/services/api.js

const BASE_URL = 
  import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token");
}

async function apiFetch(url, options = {}) {
  const token = getToken();

  try {
    return await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`
        }),
        ...options.headers
      }
    });
  } catch {
    throw new Error("Server unreachable. Please try again later.");
  }
}

export { apiFetch };

async function safeParse(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * 🔥 FINAL EVALUATE API (NO ASSUMPTIONS)
 */
export async function evaluateAPI(input) {
  try {
    const res = await apiFetch("/api/evaluate", {
      method: "POST",
      body: JSON.stringify(input)
    });

    const data = await safeParse(res);

    console.log("RAW API RESPONSE:", data);

    if (!res.ok) {
      throw new Error(data?.error || "API error");
    }

    // 🔥 DIRECT EXTRACTION (NO STRICT CHECKS)
    let feedback = null;

    if (data?.evaluation?.aiFeedback) {
      feedback = data.evaluation.aiFeedback;
    } else if (data?.aiFeedback) {
      feedback = data.aiFeedback;
    } else if (data?.evaluation) {
      feedback = data.evaluation;
    } else {
      feedback = data;
    }

    return {
      aiFeedback: {
        final: feedback?.final || JSON.stringify(feedback),
        raw: feedback?.raw || "",
        source: feedback?.source || "ai"
      }
    };

  } catch (err) {
    return {
      error: err.message || "Evaluation failed"
    };
  }
}

/**
 * 🔥 FINAL DOUBT API
 */
export async function doubtAPI(input) {
  try {
    const res = await apiFetch("/api/doubt", {
      method: "POST",
      body: JSON.stringify(input)
    });

    const data = await safeParse(res);

    console.log("DOUBT RESPONSE:", data);

    if (!res.ok) {
      throw new Error(data?.error || "API error");
    }

    let feedback = null;

    if (data?.data) {
      feedback = data.data;
    } else {
      feedback = data;
    }

    return {
      final: feedback?.final || JSON.stringify(feedback),
      raw: feedback?.raw || "",
      source: feedback?.source || "ai"
    };

  } catch (err) {
    return {
      error: err.message || "Doubt failed"
    };
  }
}