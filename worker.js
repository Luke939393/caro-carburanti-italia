const MIMIT_BASE = "https://carburanti.mise.gov.it/OssPrezziSearch";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders()
      });
    }

    const path = url.pathname;

    const allowed = [
      "/ricerca/province",
      "/ricerca/comuni",
      "/ricerca/localita",
      "/ricerca/position"
    ];

    if (!allowed.includes(path)) {
      return json(
        { error: "Endpoint non disponibile" },
        404
      );
    }

    try {
      const body = await request.text();

      const response = await fetch(
        MIMIT_BASE + path,
        {
          method: "POST",
          headers: {
            "Content-Type":
              request.headers.get("Content-Type") ||
              "application/x-www-form-urlencoded;charset=UTF-8",
            "Accept": "application/json"
          },
          body
        }
      );

      const text = await response.text();

      return new Response(text, {
        status: response.status,
        headers: {
          ...corsHeaders(),
          "Content-Type":
            response.headers.get("Content-Type") ||
            "application/json"
        }
      });

    } catch (error) {
      return json(
        {
          error: "Errore nel collegamento al MIMIT",
          details: String(error)
        },
        502
      );
    }
  }
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

function json(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        ...corsHeaders(),
        "Content-Type": "application/json"
      }
    }
  );
}
