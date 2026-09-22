Caro Carburanti Italia V3.7 - Distributori

Aprire distributori.html.

Questa versione mantiene la struttura del sito e rifà solo la logica della pagina Distributori:
- cartografia chiara in stile mappe moderne, con CARTO Light e fallback Esri;
- nessun tile OpenStreetMap standard che aveva generato Access blocked;
- Regione -> Provincia -> Comune caricati direttamente dal servizio ufficiale Osservaprezzi/MIMIT;
- ricerca indirizzo con marker rosso sulla posizione cercata;
- ricerca dei prezzi dei singoli impianti tramite endpoint ufficiali MIMIT;
- prezzo self preferito nella scheda del singolo distributore;
- filtraggio per distanza e carburante;
- pulsante Mostra sulla mappa per ogni impianto.

Nota: la pagina HTML resta autonoma e non richiede Python/server locale. Per dati e geocoding deve avere accesso Internet.
