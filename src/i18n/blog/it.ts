/**
 * Blog translations — ITALIAN.
 * English MDX articles in src/content/blog/ remain the single source;
 * this table provides the Italian overrides keyed by post id.
 */
import type { BlogTable } from '../blog-content';

export const itBlog: BlogTable = {
  'hybrid-vs-grid-tie-vs-off-grid': {
    title: 'Ibrido vs Grid-Tie vs Off-Grid: Quale topologia di inverter si adatta al tuo progetto?',
    description:
      'Un confronto pratico tra le tre topologie di inverter per i progetti solari — cosa fa ciascuna, quanto costano e come scegliere quella giusta per il tuo mercato.',
    tags: ['Guida agli inverter', 'Basi dell’energia solare'],
    bodyHtml: `
<p>La scelta della topologia dell’inverter è la prima e più determinante decisione in qualsiasi progetto solare. Questa guida confronta le tre topologie principali e le collega agli scenari reali di progetto che riceviamo dagli acquirenti B2B.</p>

<h2>Confronto rapido</h2>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Grid-tie</th>
      <th>Off-grid</th>
      <th>Ibrido</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cessione dell’energia alla rete</td>
      <td>Sì</td>
      <td>No</td>
      <td>Configurabile</td>
    </tr>
    <tr>
      <td>Supporto batteria</td>
      <td>No</td>
      <td>Sì</td>
      <td>Sì</td>
    </tr>
    <tr>
      <td>Funziona durante l’interruzione</td>
      <td>No</td>
      <td>Sì</td>
      <td>Sì (&lt; 10 ms)</td>
    </tr>
    <tr>
      <td>Uso tipico</td>
      <td>Riduzione della bolletta</td>
      <td>Rete non disponibile</td>
      <td>Accumulo + backup</td>
    </tr>
    <tr>
      <td>Costo relativo</td>
      <td>Il più basso</td>
      <td>Medio</td>
      <td>Il più alto</td>
    </tr>
  </tbody>
</table>

<h2>Grid-tie: massimizzare il ROI su una rete esistente</h2>

<p>Gli inverter grid-tie convertono la corrente continua (DC) in corrente alternata (AC) e cedono l’energia in surplus alla rete. Sono i più economici per watt e i più efficienti, ma le normative richiedono che si arrestino durante le interruzioni — nessuna alimentazione di backup.</p>

<p><strong>Ideali per:</strong> mercati con net metering o tariffe feed-in e clienti il cui obiettivo è puramente economico.</p>

<h2>Off-grid: energia dove la rete non arriva</h2>

<p>Gli inverter off-grid formano la propria minirete a partire da fotovoltaico e batteria, spesso con un ingresso per generatore come backup. Il dimensionamento è fondamentale: bisogna coprire il mese peggiore, non quello medio.</p>

<p><strong>Ideali per:</strong> elettrificazione rurale, siti di telecomunicazioni, isole e baite.</p>

<h2>Ibrido: il punto medio in più rapida crescita</h2>

<p>Gli inverter ibridi combinano un inverter grid-tie con un caricabatterie. Cedono energia quando conviene, caricano le batterie quando costa meno e danno backup alla casa quando la rete si interrompe — tutto in un’unica unità.</p>

<p><strong>Ideali per:</strong> mercati con blackout sempre più frequenti, tariffe a fasce orarie o incentivi all’autoconsumo. È il segmento in più rapida crescita nella maggior parte delle regioni che serviamo.</p>

<h2>Come aiutiamo gli acquirenti B2B a decidere</h2>

<p>Condividi il tuo mercato di destinazione e il profilo tipico di progetto con i nostri ingegneri di vendita — ti consiglieremo il giusto mix di topologie per il tuo catalogo, insieme ai requisiti di certificazione per il tuo paese di destinazione. Inizia dal <a href="/it/contact/">modulo di richiesta</a>.</p>
`,
  },
  'how-to-size-a-hybrid-solar-system': {
    title: 'Come dimensionare un sistema solare ibrido: un metodo passo a passo',
    description:
      'Il dimensionamento di un sistema solare con accumulo in cinque passi: analisi dei carichi, campo fotovoltaico, banco di batterie, potenza dell’inverter e verifica di conformità — con esempi svolti.',
    tags: ['Guida al dimensionamento', 'Sistemi ibridi'],
    bodyHtml: `
<p>Un dimensionamento corretto è ciò che distingue un sistema ibrido che soddisfa il cliente da uno che delude. Ecco il metodo in cinque passi che utilizzano i nostri ingegneri, che puoi applicare direttamente ai progetti dei tuoi clienti.</p>

<h2>Passo 1: Analizza i carichi</h2>

<p>Elenca ogni carico con la sua potenza assorbita e le ore di funzionamento giornaliere. Il risultato è un bilancio energetico giornaliero in kWh. Non tirare a indovinare — un data logger o le bollette del cliente battono ogni stima.</p>

<p><strong>Esempio:</strong> una famiglia che consuma 12 kWh al giorno con un picco serale di 6 kW.</p>

<h2>Passo 2: Dimensiona il campo fotovoltaico</h2>

<p>Dividi il bilancio giornaliero per le ore di picco solari locali, poi aggiungi il 15–25% per le perdite di sistema, il rendimento round-trip della batteria e il degrado dei pannelli.</p>

<p><strong>Esempio:</strong> 12 kWh ÷ 4.5 ore di sole × 1.25 ≈ 3.3 kW → un campo da 4 kW (8 pannelli da 500 W) lascia margine.</p>

<h2>Passo 3: Dimensiona il banco di batterie</h2>

<p>Definisci l’obiettivo di backup: solo i carichi essenziali (frigorifero, luci, router) o tutta la casa. Moltiplica per le ore (o i giorni) di autonomia richiesti e rispetta la corrente di carica massima dell’inverter — un banco di batterie troppo piccolo per assorbire la produzione fotovoltaica spreca l’energia generata.</p>

<p><strong>Esempio:</strong> 8 kWh di accumulo (48 V × ~170 Ah utilizzabili) coprono i carichi essenziali per la notte con un giorno di autonomia.</p>

<h2>Passo 4: Scegli l’inverter</h2>

<p>La potenza continua dell’inverter deve superare il picco di carico simultaneo, e la sua potenza di spunto deve coprire l’avviamento dei motori. Un’unità da 5 kW continui / 10 kW di spunto — sfoglia il nostro <a href="/it/products/">catalogo di inverter</a> — gestisce comodamente un picco serale di 6 kW distribuito su carichi non coincidenti, con margine per la corrente di inserimento.</p>

<h2>Passo 5: Verifica la conformità</h2>

<p>Conferma i codici di rete, i limiti di cessione e i requisiti di certificazione per il mercato di destinazione prima di quotare. È qui che il supporto OEM ripaga di sé — preconfiguriamo in linea di produzione il firmware specifico per il mercato.</p>

<h2>Hai bisogno di una verifica?</h2>

<p>Inviaci la tua analisi dei carichi e il mercato di destinazione tramite il <a href="/it/contact/">modulo di contatto</a> — i nostri ingegneri esamineranno il tuo dimensionamento e ti consiglieranno i modelli adatti gratuitamente.</p>
`,
  },
};
