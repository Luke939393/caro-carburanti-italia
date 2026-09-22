export default {
  async fetch(request) {
    const url = new URL(request.url);

    const target =
      "https://carburanti.mise.gov.it/ospzApi/benzina/ricerca/position";

    const params = new URLSearchParams(url.search);

    const lat = params.get("lat");
    const lon = params.get("lon");
    const radius = params.get("radius") || "10";

    if (!lat || !lon) {
      return new Response(
        JSON.stringify({
          error: "Mancano latitudine e longitudine"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    const response = await fetch(
      `${target}?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&radius=${encodeURIComponent(radius)}`
    );

    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};
