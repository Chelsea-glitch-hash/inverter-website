/**
 * Blog-/Artikelübersetzungen — DEUTSCH.
 *
 * Die englischen MDX-Artikel in src/content/blog/ bleiben die einzige Quelle.
 * Interne Links werden mit dem Präfix /de/ versehen.
 */
import type { BlogTable } from '../blog-content';

export const deBlog: BlogTable = {
  'hybrid-vs-grid-tie-vs-off-grid': {
    title: 'Hybrid vs. netzgekoppelt vs. Off-Grid: Welche Wechselrichter-Topologie passt zu Ihrem Projekt?',
    description:
      'Ein praxisnaher Vergleich der drei Wechselrichter-Topologien für Solarprojekte — was jede leistet, was sie kostet und wie Sie die richtige für Ihren Markt wählen.',
    tags: ['Wechselrichter-Leitfaden', 'Solar-Grundlagen'],
    bodyHtml: `<p>Die Wahl der Wechselrichter-Topologie ist die erste und folgenreichste Entscheidung in jedem Solarprojekt. Dieser Leitfaden vergleicht die drei gängigen Topologien und ordnet sie realen Projektszenarien zu, wie wir sie von B2B-Käufern kennen.</p>

<h2>Schnellvergleich</h2>

<table>
  <thead>
    <tr>
      <th></th>
      <th>Netzgekoppelt</th>
      <th>Off-Grid</th>
      <th>Hybrid</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Netzeinspeisung</td>
      <td>Ja</td>
      <td>Nein</td>
      <td>Konfigurierbar</td>
    </tr>
    <tr>
      <td>Batterieunterstützung</td>
      <td>Nein</td>
      <td>Ja</td>
      <td>Ja</td>
    </tr>
    <tr>
      <td>Funktion bei Netzausfall</td>
      <td>Nein</td>
      <td>Ja</td>
      <td>Ja (&lt; 10 ms)</td>
    </tr>
    <tr>
      <td>Typischer Einsatz</td>
      <td>Stromkostenreduzierung</td>
      <td>Kein Netz verfügbar</td>
      <td>Speicher + Backup</td>
    </tr>
    <tr>
      <td>Relative Kosten</td>
      <td>Am niedrigsten</td>
      <td>Mittel</td>
      <td>Am höchsten</td>
    </tr>
  </tbody>
</table>

<h2>Netzgekoppelt: maximaler ROI am bestehenden Netz</h2>

<p>Netzgekoppelte Wechselrichter wandeln Gleichstrom in Wechselstrom und speisen Überschussleistung ins Netz ein. Sie sind pro Watt am günstigsten und am effizientesten, aber Vorschriften schreiben vor, dass sie bei Netzausfällen abschalten — keine Notstromversorgung.</p>

<p><strong>Am besten geeignet für:</strong> Märkte mit Netzeinspeisevergütung oder Einspeisetarifen sowie Kunden, deren Ziel rein wirtschaftlicher Natur ist.</p>

<h2>Off-Grid: Strom dort, wo das Netz nicht hinkommt</h2>

<p>Off-Grid-Wechselrichter (Inselwechselrichter) bilden aus PV und Batterie ein eigenes Inselnetz, oft mit Generatoreingang als Backup. Sorgfältige Auslegung ist entscheidend: Sie müssen den schlechtesten Monat abdecken, nicht den Durchschnitt.</p>

<p><strong>Am besten geeignet für:</strong> ländliche Elektrifizierung, Telekommunikationsstandorte, Inseln und Ferienhütten.</p>

<h2>Hybrid: der schnell wachsende Mittelweg</h2>

<p>Hybrid-Wechselrichter kombinieren einen netzgekoppelten Wechselrichter mit einem Batterieladegerät. Sie speisen ein, wenn es sich lohnt, laden, wenn es günstig ist, und versorgen das Haus bei Netzausfall — alles in einem Gerät.</p>

<p><strong>Am besten geeignet für:</strong> Märkte mit steigender Häufigkeit von Stromausfällen, zeitgestaffelten Tarifen oder Anreizen für Eigenverbrauch. Dies ist das am schnellsten wachsende Segment in den meisten Regionen, in denen wir tätig sind.</p>

<h2>Wie wir B2B-Käufern bei der Entscheidung helfen</h2>

<p>Teilen Sie unserem Vertriebsteam Ihren Zielmarkt und Ihr typisches Projektprofil mit — wir empfehlen die richtige Topologie-Mischung für Ihr Sortiment, einschließlich der Zertifizierungsanforderungen für Ihr Zielland. Starten Sie mit dem <a href="/de/contact/">Anfrageformular</a>.</p>`,
  },
  'how-to-size-a-hybrid-solar-system': {
    title: 'So dimensionieren Sie eine Hybrid-Solaranlage: Ein Arbeitsblatt in fünf Schritten',
    description:
      'Auslegung eines Hybrid-Systems mit Solarspeicher in fünf Schritten: Lastaudit, PV-Generator, Batteriespeicher, Wechselrichter-Nennleistung und Konformitätsprüfung — mit durchgerechneten Beispielen.',
    tags: ['Auslegungsleitfaden', 'Hybrid-Systeme'],
    bodyHtml: `<p>Die korrekte Auslegung entscheidet darüber, ob ein Hybrid-System den Kunden begeistert oder enttäuscht. Hier ist die Fünf-Schritte-Methode unserer Ingenieure, die Sie direkt auf Kundenprojekte anwenden können.</p>

<h2>Schritt 1: Die Lasten erfassen</h2>

<p>Listen Sie jeden Verbraucher mit seiner Leistungsaufnahme und den täglichen Betriebsstunden auf. Das Ergebnis ist ein täglicher Energiebedarf in kWh. Nicht schätzen — ein Datenlogger oder die Stromrechnungen des Kunden schlagen jede Schätzung.</p>

<p><strong>Beispiel:</strong> ein Haushalt mit 12 kWh/Tag Verbrauch und einer Abendsspitze von 6 kW.</p>

<h2>Schritt 2: Den PV-Generator dimensionieren</h2>

<p>Teilen Sie den täglichen Bedarf durch die lokalen Spitzen-Sonnenstunden und rechnen Sie 15–25 % für Systemverluste, Batterie-Round-Trip und Moduldegradation hinzu.</p>

<p><strong>Beispiel:</strong> 12 kWh ÷ 4,5 Sonnenstunden × 1,25 ≈ 3,3 kW → ein 4-kW-Generator (8 × 500-W-Module) lässt Reserve.</p>

<h2>Schritt 3: Den Batteriespeicher dimensionieren</h2>

<p>Legen Sie das Backup-Ziel fest: nur wichtige Lasten (Kühlschrank, Beleuchtung, Router) oder das ganze Haus. Multiplizieren Sie mit den erforderlichen Autonomiestunden (oder -tagen) und beachten Sie den maximalen Ladestrom des Wechselrichters — ein zu kleiner Speicher, der die PV-Leistung nicht aufnehmen kann, verschwendet Ertrag.</p>

<p><strong>Beispiel:</strong> 8 kWh Speicher (48 V × ~170 Ah nutzbar) deckt wichtige Lasten über Nacht mit einem Tag Autonomie.</p>

<h2>Schritt 4: Den Wechselrichter auswählen</h2>

<p>Die Dauerleistung des Wechselrichters muss über der gleichzeitigen Spitzenlast liegen, und seine Überlastkapazität muss Motoranläufe abdecken. Ein Gerät mit 5 kW Dauerleistung / 10 kW Überlast — stöbern Sie in unserem <a href="/de/products/">Wechselrichterkatalog</a> — bewältigt problemlos eine Abendsspitze von 6 kW bei zeitlich versetzten Lasten und Anlaufstromreserve.</p>

<h2>Schritt 5: Die Konformität prüfen</h2>

<p>Klären Sie Netzanschlussregeln, Einspeisebegrenzungen und Zertifizierungsanforderungen für den Zielmarkt, bevor Sie ein Angebot erstellen. Hier zahlt sich OEM-Unterstützung aus — wir konfigurieren marktspezifische Firmware bereits in der Produktionslinie vor.</p>

<h2>Benötigen Sie eine Prüfung?</h2>

<p>Senden Sie uns Ihr Lastaudit und Ihren Zielmarkt über das <a href="/de/contact/">Kontaktformular</a> — unsere Ingenieure prüfen Ihre Auslegung und empfehlen passende Modelle, kostenlos.</p>`,
  },
};
