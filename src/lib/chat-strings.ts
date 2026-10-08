/**
 * Localized fallback strings for the deterministic chat engine.
 *
 * The engine decides WHAT to say (a recommendation, a contact request, a
 * handoff…) with pure logic; these strings put that decision into the language
 * of the page the visitor is browsing. They are the fallback wording shown
 * when the AI rewrite layer is off or unreachable — with AI enabled the model
 * rephrases the same decision in the same language.
 *
 * Every function takes a locale (one of the 11 site locales) and returns the
 * English wording when the locale is unknown — the engine must never break.
 */
import type { AiProduct } from './ai-catalog';

/** Product-facing helper shared by several replies. */
function rangeProse(powers: number[]): string {
  const labels = powers.map((p) => `${p}W`);
  if (labels.length === 0) return 'our off-grid range';
  if (labels.length === 1) return labels[0];
  return `${labels[0]} to ${labels[labels.length - 1]}`;
}

export interface ChatStrings {
  /** Opening / re-ask for a rated power. */
  askForPower(powers: number[], greeting: string): string;
  /** Ask for a load description instead of a rating. */
  askForApplication(): string;
  /** "Happy to help…" wrapper around askForApplication. */
  offerApplication(powers: number[]): string;
  smallTalk(kind: 'thanks' | 'greeting' | 'general_help', powers: number[]): string;
  otherModels(rated: number, hasStandard: boolean, hasUsb: boolean, count: number): string;
  singleModel(rated: number): string;
  direction(ref: number, candidates: number[], smaller: boolean): string;
  boundary(smaller: boolean, edge: number, hasEdge: boolean): string;
  salesHandoff(): string;
  askForContact(): string;
  askForContactFirst(): string;
  contactAsk(): string;
  contactCaptured(): string;
  supplyHandoff(): string;
  recommend(product: AiProduct, note: string | null, askForContact: boolean): string;
  mentionVariant(product: AiProduct, variantUsb: boolean): string;
  /** A wattage the catalog does not build — offer the nearest real ratings. */
  unmatchedPower?(unmatched: number, listed: string): string;
  /** Only one model exists at a rating and the customer asked for the USB variant. */
  noUsbAtRating?(rated: number): string;
  /** Keep the conversation going on a model already on the table. */
  keepGoing?(powerLabel: string, usb: boolean): string;
  keepGoingGeneric?(): string;
  /** Prefix on a recommendation when the conversation has been flagged for sales. */
  flaggedForSales?(): string;
  /** Buying-signal handoff: a sales engineer will follow up. */
  salesEngineer?(buyingSignal: boolean): string;
  /** Sizing rule of thumb used on the "not sure" branch. */
  ruleOfThumb?(): string;
}

/** English fallback — also the base for unknown locales. */
const en: Required<ChatStrings> = {
  askForPower(powers, greeting) {
    return `${greeting} Our off-grid line covers ${powers.map((p) => `${p}W`).join('W, ')}W — or just tell me roughly what you need to power.`;
  },
  askForApplication() {
    return 'No problem — tell me what you need to power (for example a fridge, a pump, lights, or a whole cabin) and I can help narrow down the right size.';
  },
  offerApplication(powers) {
    return `Happy to help you work it out. ${en.askForApplication()}\n\nIf you already have a figure in mind, our off-grid line covers ${powers.map((p) => `${p}W`).join('W, ')}W.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return "You're welcome. If you would like a recommendation, just tell me the power you need, or describe what you want to power.";
    }
    if (kind === 'general_help') {
      return `Sure, I can help. Our off-grid line runs from ${rangeProse(powers)}. Tell me the power you need, or describe what you want to power and I can suggest a size.`;
    }
    return `Hello! How can I help you with our off-grid inverters? Our off-grid line runs from ${rangeProse(powers)}. If you already know the power you need, just say it — or tell me what you want to power and I will help you work out the size.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'a standard (no USB) version and a USB-equipped version'
        : `${count} versions`;
    return `We build ${described} at ${rated}W. Which one would you like to see?`;
  },
  singleModel(rated) {
    return `${rated}W is a single model in our off-grid range — there is no second version at that rating. Would you like to look at another power instead?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} or ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'rating' : 'ratings';
    const verb = labels.length === 1 ? 'is' : 'are';
    const question = labels.length === 1 ? 'Would that work?' : 'Would either of those work?';
    return `Of course — the closest ${noun} ${smaller ? 'below' : 'above'} ${ref}W ${verb} ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return en.askForContactFirst();
    return smaller
      ? `We don't build anything smaller than ${edge}W — that is the bottom of our off-grid range. If you need something different, our sales team can take a look.`
      : `We don't build anything above ${edge}W — that is the top of our off-grid range. If you need something different, our sales team can take a look.`;
  },
  salesHandoff() {
    return `Of course — let me put you in touch with our sales team.\n\n${en.askForContact()}`;
  },
  askForContact() {
    return 'Please share an email address or a WhatsApp number and our sales team will send you the specifications and quotation.';
  },
  askForContactFirst() {
    return 'Please share your email or WhatsApp number and our sales team will follow up with you directly.';
  },
  contactAsk() {
    return 'Could you share your email or WhatsApp so our sales team can follow up with you?';
  },
  contactCaptured() {
    return 'Your details are already with our sales team — they will follow up with you. If you have another question about our off-grid inverters, ask away.';
  },
  supplyHandoff() {
    return `That one depends on our current schedule, so let me put you in touch with the sales team.\n\n${en.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\nWould you like the full specifications and a quotation? Leave your email or WhatsApp number here and our sales team will follow up with you.'
      : '';
    return `We have a ${product.name} that may suit your requirement.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `A USB-equipped version of this ${product.powerLabel} model is also available — tell me if you would rather have that one.`
      : `A standard (no USB) version of this ${product.powerLabel} model is also available — tell me if you would rather have that one.`;
  },
  unmatchedPower(unmatched, listed) {
    return `We don't build a ${unmatched}W off-grid inverter. The closest ratings we do have are ${listed} — would either of those work?`;
  },
  noUsbAtRating(rated) {
    return `There is no USB version at ${rated}W — this is the model at this rating.`;
  },
  keepGoing(powerLabel, usb) {
    return `Happy to keep going on the ${powerLabel}${usb ? ' USB-equipped' : ''} model.`;
  },
  keepGoingGeneric() {
    return 'Happy to keep going.';
  },
  flaggedForSales() {
    return "Thanks — I've flagged this for our sales team.";
  },
  salesEngineer(buyingSignal) {
    return buyingSignal
      ? `Let me get a sales engineer involved.\n\n${en.askForContactFirst()}`
      : `Let me get a sales engineer involved so you get an accurate answer.\n\n${en.askForContact()}`;
  },
  ruleOfThumb() {
    return 'A useful rule of thumb: add up the wattage of everything you want to run at the same time, then allow about 30% headroom for motor starting.';
  },
};

/** German */
const de: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} Unsere Off-Grid-Reihe umfasst ${powers.map((p) => `${p}W`).join('W, ')}W — oder sagen Sie mir einfach grob, was Sie betreiben möchten.`;
  },
  askForApplication() {
    return 'Kein Problem — sagen Sie mir, was Sie betreiben möchten (z. B. einen Kühlschrank, eine Pumpe, Lampen oder eine ganze Kabine), und ich helfe Ihnen, die richtige Größe zu finden.';
  },
  offerApplication(powers) {
    return `Gerne helfe ich Ihnen weiter. ${de.askForApplication()}\n\nFalls Sie bereits eine Zahl im Kopf haben: Unsere Off-Grid-Reihe umfasst ${powers.map((p) => `${p}W`).join('W, ')}W.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'Gern geschehen. Wenn Sie eine Empfehlung möchten, nennen Sie mir einfach die benötigte Leistung oder beschreiben Sie, was Sie betreiben möchten.';
    }
    if (kind === 'general_help') {
      return `Gerne. Unsere Off-Grid-Reihe reicht von ${rangeProse(powers)}. Nennen Sie mir die benötigte Leistung oder beschreiben Sie, was Sie betreiben möchten, und ich schlage eine Größe vor.`;
    }
    return `Hallo! Womit kann ich Ihnen bei unseren Off-Grid-Wechselrichtern helfen? Unsere Off-Grid-Reihe reicht von ${rangeProse(powers)}. Wenn Sie die Leistung bereits kennen, nennen Sie sie einfach — oder beschreiben Sie, was Sie betreiben möchten, und ich helfe Ihnen, die Größe herauszufinden.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'eine Standardversion (ohne USB) und eine Version mit USB'
        : `${count} Versionen`;
    return `Wir bauen ${described} mit ${rated}W. Welche möchten Sie sehen?`;
  },
  singleModel(rated) {
    return `${rated}W ist in unserer Off-Grid-Reihe ein einzelnes Modell — es gibt keine zweite Version bei dieser Leistung. Möchten Sie stattdessen eine andere Leistung ansehen?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} oder ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'Leistung' : 'Leistungen';
    const verb = labels.length === 1 ? 'ist' : 'sind';
    const question = labels.length === 1 ? 'Würde das passen?' : 'Würde eine davon passen?';
    return `Natürlich — die nächstgelegene ${noun} ${smaller ? 'unterhalb' : 'oberhalb'} von ${ref}W ${verb} ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return de.askForContactFirst();
    return smaller
      ? `Wir bauen nichts kleineres als ${edge}W — das ist das untere Ende unserer Off-Grid-Reihe. Wenn Sie etwas anderes brauchen, kann unser Vertriebsteam einen Blick darauf werfen.`
      : `Wir bauen nichts über ${edge}W — das ist das obere Ende unserer Off-Grid-Reihe. Wenn Sie etwas anderes brauchen, kann unser Vertriebsteam einen Blick darauf werfen.`;
  },
  salesHandoff() {
    return `Natürlich — ich verbinde Sie mit unserem Vertriebsteam.\n\n${de.askForContact()}`;
  },
  askForContact() {
    return 'Bitte teilen Sie eine E-Mail-Adresse oder eine WhatsApp-Nummer mit, und unser Vertriebsteam sendet Ihnen die Spezifikationen und das Angebot.';
  },
  askForContactFirst() {
    return 'Bitte teilen Sie Ihre E-Mail oder WhatsApp-Nummer mit, und unser Vertriebsteam wird sich direkt bei Ihnen melden.';
  },
  contactAsk() {
    return 'Könnten Sie Ihre E-Mail oder WhatsApp teilen, damit unser Vertriebsteam mit Ihnen Kontakt aufnehmen kann?';
  },
  contactCaptured() {
    return 'Ihre Daten sind bereits bei unserem Vertriebsteam — es wird sich bei Ihnen melden. Wenn Sie eine weitere Frage zu unseren Off-Grid-Wechselrichtern haben, fragen Sie einfach.';
  },
  supplyHandoff() {
    return `Das hängt von unserem aktuellen Zeitplan ab, daher verbinde ich Sie mit dem Vertriebsteam.\n\n${de.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\nMöchten Sie die vollständigen Spezifikationen und ein Angebot? Hinterlassen Sie hier Ihre E-Mail oder WhatsApp-Nummer, und unser Vertriebsteam wird sich bei Ihnen melden.'
      : '';
    return `Wir haben einen ${product.name}, der zu Ihrer Anforderung passen könnte.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `Eine Version mit USB dieses ${product.powerLabel}-Modells ist ebenfalls verfügbar — sagen Sie mir, ob Sie lieber diese möchten.`
      : `Eine Standardversion (ohne USB) dieses ${product.powerLabel}-Modells ist ebenfalls verfügbar — sagen Sie mir, ob Sie lieber diese möchten.`;
  },
};

/** Spanish */
const es: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} Nuestra línea off-grid cubre ${powers.map((p) => `${p}W`).join('W, ')}W — o simplemente dígame aproximadamente qué necesita alimentar.`;
  },
  askForApplication() {
    return 'Sin problema — dígame qué necesita alimentar (por ejemplo, una nevera, una bomba, luces o una cabaña completa) y le ayudo a acotar el tamaño correcto.';
  },
  offerApplication(powers) {
    return `Encantado de ayudarle. ${es.askForApplication()}\n\nSi ya tiene una cifra en mente, nuestra línea off-grid cubre ${powers.map((p) => `${p}W`).join('W, ')}W.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'De nada. Si desea una recomendación, solo dígame la potencia que necesita o describa qué quiere alimentar.';
    }
    if (kind === 'general_help') {
      return `Claro, puedo ayudarle. Nuestra línea off-grid va de ${rangeProse(powers)}. Dígame la potencia que necesita o describa qué quiere alimentar y le sugiero un tamaño.`;
    }
    return `¡Hola! ¿En qué puedo ayudarle con nuestros inversores off-grid? Nuestra línea off-grid va de ${rangeProse(powers)}. Si ya sabe la potencia que necesita, dígalo — o dígame qué quiere alimentar y le ayudo a calcular el tamaño.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'una versión estándar (sin USB) y una versión con USB'
        : `${count} versiones`;
    return `Fabricamos ${described} a ${rated}W. ¿Cuál le gustaría ver?`;
  },
  singleModel(rated) {
    return `${rated}W es un modelo único en nuestra línea off-grid — no hay una segunda versión en esa potencia. ¿Le gustaría ver otra potencia?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} o ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'potencia' : 'potencias';
    const verb = labels.length === 1 ? 'es' : 'son';
    const question = labels.length === 1 ? '¿Le serviría?' : '¿Le serviría alguna?';
    return `Por supuesto — la ${noun} más cercana ${smaller ? 'por debajo' : 'por encima'} de ${ref}W ${verb} ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return es.askForContactFirst();
    return smaller
      ? `No fabricamos nada más pequeño que ${edge}W — es el límite inferior de nuestra línea off-grid. Si necesita algo distinto, nuestro equipo comercial puede estudiarlo.`
      : `No fabricamos nada por encima de ${edge}W — es el límite superior de nuestra línea off-grid. Si necesita algo distinto, nuestro equipo comercial puede estudiarlo.`;
  },
  salesHandoff() {
    return `Por supuesto — le pongo en contacto con nuestro equipo comercial.\n\n${es.askForContact()}`;
  },
  askForContact() {
    return 'Comparta un correo electrónico o un número de WhatsApp y nuestro equipo comercial le enviará las especificaciones y la cotización.';
  },
  askForContactFirst() {
    return 'Comparta su correo o número de WhatsApp y nuestro equipo comercial se pondrá en contacto con usted directamente.';
  },
  contactAsk() {
    return '¿Podría compartir su correo o WhatsApp para que nuestro equipo comercial pueda contactarle?';
  },
  contactCaptured() {
    return 'Sus datos ya están con nuestro equipo comercial — se pondrán en contacto con usted. Si tiene otra pregunta sobre nuestros inversores off-grid, pregunte sin problema.';
  },
  supplyHandoff() {
    return `Eso depende de nuestro calendario actual, así que le pongo en contacto con el equipo comercial.\n\n${es.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\n¿Le gustaría las especificaciones completas y una cotización? Deje aquí su correo o número de WhatsApp y nuestro equipo comercial se pondrá en contacto con usted.'
      : '';
    return `Tenemos un ${product.name} que puede ajustarse a su necesidad.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `También hay disponible una versión con USB de este modelo ${product.powerLabel} — dígame si prefiere esa.`
      : `También hay disponible una versión estándar (sin USB) de este modelo ${product.powerLabel} — dígame si prefiere esa.`;
  },
};

/** French */
const fr: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} Notre gamme off-grid couvre ${powers.map((p) => `${p}W`).join('W, ')}W — ou dites-moi simplement, en gros, ce que vous devez alimenter.`;
  },
  askForApplication() {
    return 'Pas de problème — dites-moi ce que vous devez alimenter (par exemple un réfrigérateur, une pompe, des lumières ou une cabine entière) et je vous aide à trouver la bonne taille.';
  },
  offerApplication(powers) {
    return `Avec plaisir, je vous aide à y voir clair. ${fr.askForApplication()}\n\nSi vous avez déjà un chiffre en tête, notre gamme off-grid couvre ${powers.map((p) => `${p}W`).join('W, ')}W.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'Avec plaisir. Si vous souhaitez une recommandation, dites-moi simplement la puissance dont vous avez besoin ou décrivez ce que vous voulez alimenter.';
    }
    if (kind === 'general_help') {
      return `Bien sûr, je peux vous aider. Notre gamme off-grid va de ${rangeProse(powers)}. Dites-moi la puissance dont vous avez besoin ou décrivez ce que vous voulez alimenter, et je peux suggérer une taille.`;
    }
    return `Bonjour ! Comment puis-je vous aider avec nos onduleurs off-grid ? Notre gamme off-grid va de ${rangeProse(powers)}. Si vous connaissez déjà la puissance, dites-le-moi — ou décrivez ce que vous voulez alimenter et je vous aiderai à déterminer la taille.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'une version standard (sans USB) et une version avec USB'
        : `${count} versions`;
    return `Nous fabriquons ${described} en ${rated}W. Laquelle souhaitez-vous voir ?`;
  },
  singleModel(rated) {
    return `${rated}W est un modèle unique dans notre gamme off-grid — il n’y a pas de seconde version à cette puissance. Souhaitez-vous voir une autre puissance ?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} ou ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'puissance' : 'puissances';
    const verb = labels.length === 1 ? 'est' : 'sont';
    const question = labels.length === 1 ? 'Est-ce que cela conviendrait ?' : 'L’une d’elles conviendrait-elle ?';
    return `Bien sûr — la ${noun} la plus proche ${smaller ? 'en dessous' : 'au-dessus'} de ${ref}W ${verb} ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return fr.askForContactFirst();
    return smaller
      ? `Nous ne fabriquons rien de plus petit que ${edge}W — c’est le bas de notre gamme off-grid. Si vous avez besoin d’autre chose, notre équipe commerciale peut y regarder.`
      : `Nous ne fabriquons rien au-dessus de ${edge}W — c’est le haut de notre gamme off-grid. Si vous avez besoin d’autre chose, notre équipe commerciale peut y regarder.`;
  },
  salesHandoff() {
    return `Bien sûr — je vous mets en contact avec notre équipe commerciale.\n\n${fr.askForContact()}`;
  },
  askForContact() {
    return 'Partagez une adresse e-mail ou un numéro WhatsApp et notre équipe commerciale vous enverra les spécifications et le devis.';
  },
  askForContactFirst() {
    return 'Partagez votre e-mail ou votre numéro WhatsApp et notre équipe commerciale vous recontactera directement.';
  },
  contactAsk() {
    return 'Pourriez-vous partager votre e-mail ou WhatsApp afin que notre équipe commerciale puisse vous recontacter ?';
  },
  contactCaptured() {
    return 'Vos coordonnées sont déjà auprès de notre équipe commerciale — elle vous recontactera. Si vous avez une autre question sur nos onduleurs off-grid, n’hésitez pas.';
  },
  supplyHandoff() {
    return `Cela dépend de notre planning actuel, je vous mets donc en contact avec l’équipe commerciale.\n\n${fr.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\nSouhaitez-vous les spécifications complètes et un devis ? Laissez ici votre e-mail ou votre numéro WhatsApp et notre équipe commerciale vous recontactera.'
      : '';
    return `Nous avons un ${product.name} qui pourrait convenir à votre besoin.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `Une version avec USB de ce modèle ${product.powerLabel} est également disponible — dites-moi si vous préférez celle-ci.`
      : `Une version standard (sans USB) de ce modèle ${product.powerLabel} est également disponible — dites-moi si vous préférez celle-ci.`;
  },
};

/** Italian */
const it: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} La nostra gamma off-grid copre ${powers.map((p) => `${p}W`).join('W, ')}W — oppure dimmi semplicemente, in linea di massima, cosa devi alimentare.`;
  },
  askForApplication() {
    return 'Nessun problema — dimmi cosa devi alimentare (ad esempio un frigorifero, una pompa, delle luci o un’intera cabina) e ti aiuto a individuare la dimensione giusta.';
  },
  offerApplication(powers) {
    return `Felice di aiutarti a capirlo. ${it.askForApplication()}\n\nSe hai già un numero in mente, la nostra gamma off-grid copre ${powers.map((p) => `${p}W`).join('W, ')}W.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'Prego. Se desideri una raccomandazione, dimmi semplicemente la potenza di cui hai bisogno o descrivi cosa vuoi alimentare.';
    }
    if (kind === 'general_help') {
      return `Certo, posso aiutarti. La nostra gamma off-grid va da ${rangeProse(powers)}. Dimmi la potenza di cui hai bisogno o descrivi cosa vuoi alimentare e posso suggerirti una dimensione.`;
    }
    return `Ciao! Come posso aiutarti con i nostri inverter off-grid? La nostra gamma off-grid va da ${rangeProse(powers)}. Se conosci già la potenza, dillo — oppure dimmi cosa vuoi alimentare e ti aiuto a capire la dimensione.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'una versione standard (senza USB) e una versione con USB'
        : `${count} versioni`;
    return `Produciamo ${described} a ${rated}W. Quale vuoi vedere?`;
  },
  singleModel(rated) {
    return `${rated}W è un modello unico nella nostra gamma off-grid — non esiste una seconda versione a quella potenza. Vuoi vedere un’altra potenza?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} o ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'potenza' : 'potenze';
    const verb = labels.length === 1 ? 'è' : 'sono';
    const question = labels.length === 1 ? 'Andrebbe bene?' : 'Andrebbe bene una di queste?';
    return `Certamente — la ${noun} più vicina ${smaller ? 'sotto' : 'sopra'} ${ref}W ${verb} ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return it.askForContactFirst();
    return smaller
      ? `Non produciamo nulla di più piccolo di ${edge}W — è il minimo della nostra gamma off-grid. Se hai bisogno di qualcosa di diverso, il nostro team vendite può valutarlo.`
      : `Non produciamo nulla sopra ${edge}W — è il massimo della nostra gamma off-grid. Se hai bisogno di qualcosa di diverso, il nostro team vendite può valutarlo.`;
  },
  salesHandoff() {
    return `Certamente — ti metto in contatto con il nostro team vendite.\n\n${it.askForContact()}`;
  },
  askForContact() {
    return 'Condividi un indirizzo e-mail o un numero WhatsApp e il nostro team vendite ti invierà le specifiche e il preventivo.';
  },
  askForContactFirst() {
    return 'Condividi la tua e-mail o il tuo numero WhatsApp e il nostro team vendite ti ricontatterà direttamente.';
  },
  contactAsk() {
    return 'Potresti condividere la tua e-mail o WhatsApp così il nostro team vendite può ricontattarti?';
  },
  contactCaptured() {
    return 'I tuoi dati sono già presso il nostro team vendite — ti ricontatteranno. Se hai un’altra domanda sui nostri inverter off-grid, chiedi pure.';
  },
  supplyHandoff() {
    return `Dipende dal nostro programma attuale, quindi ti metto in contatto con il team vendite.\n\n${it.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\nVuoi le specifiche complete e un preventivo? Lascia qui la tua e-mail o il tuo numero WhatsApp e il nostro team vendite ti ricontatterà.'
      : '';
    return `Abbiamo un ${product.name} che potrebbe soddisfare la tua esigenza.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `È disponibile anche una versione con USB di questo modello ${product.powerLabel} — dimmi se preferisci quella.`
      : `È disponibile anche una versione standard (senza USB) di questo modello ${product.powerLabel} — dimmi se preferisci quella.`;
  },
};

/** Portuguese */
const pt: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} Nossa linha off-grid cobre ${powers.map((p) => `${p}W`).join('W, ')}W — ou apenas me diga, aproximadamente, o que você precisa alimentar.`;
  },
  askForApplication() {
    return 'Sem problema — diga o que você precisa alimentar (por exemplo, uma geladeira, uma bomba, luzes ou uma cabana inteira) e eu ajudo a definir o tamanho certo.';
  },
  offerApplication(powers) {
    return `Feliz em ajudar você a resolver isso. ${pt.askForApplication()}\n\nSe você já tem um valor em mente, nossa linha off-grid cobre ${powers.map((p) => `${p}W`).join('W, ')}W.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'De nada. Se quiser uma recomendação, basta me dizer a potência que precisa ou descrever o que deseja alimentar.';
    }
    if (kind === 'general_help') {
      return `Claro, posso ajudar. Nossa linha off-grid vai de ${rangeProse(powers)}. Diga a potência que precisa ou descreva o que deseja alimentar e posso sugerir um tamanho.`;
    }
    return `Olá! Como posso ajudar com nossos inversores off-grid? Nossa linha off-grid vai de ${rangeProse(powers)}. Se você já sabe a potência, basta dizer — ou me diga o que quer alimentar e ajudo a descobrir o tamanho.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'uma versão padrão (sem USB) e uma versão com USB'
        : `${count} versões`;
    return `Temos ${described} em ${rated}W. Qual você gostaria de ver?`;
  },
  singleModel(rated) {
    return `${rated}W é um modelo único em nossa linha off-grid — não há uma segunda versão nessa potência. Gostaria de ver outra potência?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} ou ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'potência' : 'potências';
    const verb = labels.length === 1 ? 'é' : 'são';
    const question = labels.length === 1 ? 'Funcionaria?' : 'Alguma dessas funcionaria?';
    return `Claro — a ${noun} mais próxima ${smaller ? 'abaixo' : 'acima'} de ${ref}W ${verb} ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return pt.askForContactFirst();
    return smaller
      ? `Não fabricamos nada menor que ${edge}W — é o limite inferior da nossa linha off-grid. Se precisar de algo diferente, nossa equipe de vendas pode analisar.`
      : `Não fabricamos nada acima de ${edge}W — é o limite superior da nossa linha off-grid. Se precisar de algo diferente, nossa equipe de vendas pode analisar.`;
  },
  salesHandoff() {
    return `Claro — vou colocá-lo em contato com nossa equipe de vendas.\n\n${pt.askForContact()}`;
  },
  askForContact() {
    return 'Compartilhe um e-mail ou número de WhatsApp e nossa equipe de vendas enviará as especificações e o orçamento.';
  },
  askForContactFirst() {
    return 'Compartilhe seu e-mail ou número de WhatsApp e nossa equipe de vendas entrará em contato diretamente com você.';
  },
  contactAsk() {
    return 'Você poderia compartilhar seu e-mail ou WhatsApp para que nossa equipe de vendas entre em contato?';
  },
  contactCaptured() {
    return 'Seus dados já estão com nossa equipe de vendas — eles entrarão em contato. Se tiver outra pergunta sobre nossos inversores off-grid, pode perguntar.';
  },
  supplyHandoff() {
    return `Isso depende do nosso cronograma atual, então vou colocá-lo em contato com a equipe de vendas.\n\n${pt.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\nGostaria das especificações completas e um orçamento? Deixe aqui seu e-mail ou número de WhatsApp e nossa equipe de vendas entrará em contato.'
      : '';
    return `Temos um ${product.name} que pode atender à sua necessidade.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `Uma versão com USB deste modelo ${product.powerLabel} também está disponível — diga se prefere essa.`
      : `Uma versão padrão (sem USB) deste modelo ${product.powerLabel} também está disponível — diga se prefere essa.`;
  },
};

/** Japanese */
const ja: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} 当社のオフグリッドシリーズは ${powers.map((p) => `${p}W`).join('W、')}W に対応しています。または、おおよそ何を動かしたいかをお聞かせください。`;
  },
  askForApplication() {
    return '問題ありません。何を動かしたいか（例：冷蔵庫、ポンプ、照明、キャビン全体）をお聞かせいただければ、適切なサイズを絞り込むお手伝いをします。';
  },
  offerApplication(powers) {
    return `お手伝いさせてください。${ja.askForApplication()}\n\nすでにお考えの数値があれば、当社のオフグリッドシリーズは ${powers.map((p) => `${p}W`).join('W、')}W に対応しています。`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'どういたしまして。ご希望があれば、必要な電力か動かしたいものをお聞かせください。';
    }
    if (kind === 'general_help') {
      return `もちろんお手伝いできます。当社のオフグリッドシリーズは ${rangeProse(powers)} に対応しています。必要な電力か動かしたいものをお聞かせください。`;
    }
    return `こんにちは！オフグリッドインバーターについて何かお手伝いしましょうか？当社のオフグリッドシリーズは ${rangeProse(powers)} に対応しています。必要な電力がわかっているならお伝えください。または動かしたいものを教えていただければサイズを算出します。`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? '標準（USBなし）バージョンとUSB搭載バージョン'
        : `${count}つのバージョン`;
    return `${rated}W で ${described} を製造しています。どれをご覧になりたいですか？`;
  },
  singleModel(rated) {
    return `${rated}W は当社のオフグリッドシリーズで単一モデルです。その電力では2番目のバージョンはありません。別の電力を見てみますか？`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join('、')} または ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? '電力' : '電力';
    const question = labels.length === 1 ? 'それでよろしいですか？' : 'どちらかでよろしいですか？';
    return `${ref}W の${smaller ? '下' : '上'}で最も近い${noun}は ${listed} です。${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return ja.askForContactFirst();
    return smaller
      ? `${edge}W より小さい製品は製造していません。これが当社オフグリッドシリーズの下限です。別のご要望があれば営業チームが対応します。`
      : `${edge}W より大きい製品は製造していません。これが当社オフグリッドシリーズの上限です。別のご要望があれば営業チームが対応します。`;
  },
  salesHandoff() {
    return `承知しました。営業チームをご紹介します。\n\n${ja.askForContact()}`;
  },
  askForContact() {
    return 'メールアドレスまたはWhatsApp番号をお聞かせください。営業チームが仕様書とお見積りをお送りします。';
  },
  askForContactFirst() {
    return 'メールアドレスまたはWhatsApp番号をお聞かせください。営業チームが直接ご連絡いたします。';
  },
  contactAsk() {
    return '営業チームからご連絡できるよう、メールまたはWhatsAppを共有していただけますか？';
  },
  contactCaptured() {
    return 'お客様の情報は営業チームに届いております。追ってご連絡いたします。オフグリッドインバーターについて他にご質問があればお聞かせください。';
  },
  supplyHandoff() {
    return `現在のスケジュールによりますので、営業チームをご紹介します。\n\n${ja.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\n完全な仕様書とお見積りをご希望ですか？ここにメールまたはWhatsApp番号を残していただければ、営業チームがご連絡します。'
      : '';
    return `ご要件に合う ${product.name} があります。${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `この ${product.powerLabel} モデルのUSB搭載バージョンもございます。そちらをご希望でしたらお知らせください。`
      : `この ${product.powerLabel} モデルの標準（USBなし）バージョンもございます。そちらをご希望でしたらお知らせください。`;
  },
};

/** Korean */
const ko: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} 저희 오프그리드 라인은 ${powers.map((p) => `${p}W`).join('W, ')}W를 지원합니다. 또는 대략 무엇을 구동해야 하는지 알려주세요.`;
  },
  askForApplication() {
    return '문제없습니다. 무엇을 구동해야 하는지(예: 냉장고, 펌프, 조명, 캐빈 전체) 알려주시면 적절한 용량을 찾는 데 도와드리겠습니다.';
  },
  offerApplication(powers) {
    return `알아보는 것을 도와드리겠습니다. ${ko.askForApplication()}\n\n이미 원하는 수치가 있다면 저희 오프그리드 라인은 ${powers.map((p) => `${p}W`).join('W, ')}W를 지원합니다.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return '천만에요. 추천을 원하시면 필요한 전력이나 구동할 대상을 알려주세요.';
    }
    if (kind === 'general_help') {
      return `물론 도와드릴 수 있습니다. 저희 오프그리드 라인은 ${rangeProse(powers)}를 지원합니다. 필요한 전력이나 구동할 대상을 알려주시면 용량을 제안해 드리겠습니다.`;
    }
    return `안녕하세요! 오프그리드 인버터에 대해 무엇을 도와드릴까요? 저희 오프그리드 라인은 ${rangeProse(powers)}를 지원합니다. 필요한 전력을 아신다면 말씀해 주세요. 또는 구동할 대상을 알려주시면 용량을 계산해 드리겠습니다.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? '표준(USB 없음) 버전과 USB 장착 버전'
        : `${count}가지 버전`;
    return `${rated}W에서 ${described}을(를) 제조합니다. 어떤 것을 보고 싶으세요?`;
  },
  singleModel(rated) {
    return `${rated}W는 저희 오프그리드 라인의 단일 모델입니다. 해당 전력에는 두 번째 버전이 없습니다. 다른 전력을 보시겠어요?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} 또는 ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? '전력' : '전력';
    const question = labels.length === 1 ? '그것으로 되겠습니까?' : '둘 중 하나로 되겠습니까?';
    return `물론입니다 — ${ref}W의 ${smaller ? '아래' : '위'}에서 가장 가까운 ${noun}은(는) ${listed}입니다. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return ko.askForContactFirst();
    return smaller
      ? `${edge}W보다 작은 제품은 제조하지 않습니다. 저희 오프그리드 라인의 하한입니다. 다른 것이 필요하시면 영업팀이 검토할 수 있습니다.`
      : `${edge}W보다 큰 제품은 제조하지 않습니다. 저희 오프그리드 라인의 상한입니다. 다른 것이 필요하시면 영업팀이 검토할 수 있습니다.`;
  },
  salesHandoff() {
    return `물론입니다 — 영업팀을 연결해 드리겠습니다.\n\n${ko.askForContact()}`;
  },
  askForContact() {
    return '이메일 주소나 WhatsApp 번호를 공유해 주세요. 영업팀이 사양서와 견적을 보내드립니다.';
  },
  askForContactFirst() {
    return '이메일이나 WhatsApp 번호를 공유해 주세요. 영업팀이 직접 연락드리겠습니다.';
  },
  contactAsk() {
    return '영업팀이 연락할 수 있도록 이메일이나 WhatsApp을 공유해 주시겠어요?';
  },
  contactCaptured() {
    return '고객님의 정보는 이미 영업팀에 전달되었습니다. 곧 연락드릴 것입니다. 오프그리드 인버터에 대해 다른 질문이 있으시면 편하게 물어보세요.';
  },
  supplyHandoff() {
    return `현재 일정에 따라 달라지므로 영업팀을 연결해 드리겠습니다.\n\n${ko.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\n전체 사양서와 견적을 원하시나요? 여기에 이메일이나 WhatsApp 번호를 남겨 주시면 영업팀이 연락드리겠습니다.'
      : '';
    return `고객님의 요구에 맞을 수 있는 ${product.name} 제품이 있습니다.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `이 ${product.powerLabel} 모델의 USB 장착 버전도 있습니다. 그것을 원하시면 알려주세요.`
      : `이 ${product.powerLabel} 모델의 표준(USB 없음) 버전도 있습니다. 그것을 원하시면 알려주세요.`;
  },
};

/** Russian */
const ru: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} Наша линейка off-grid покрывает ${powers.map((p) => `${p}W`).join('W, ')}W — или просто скажите, что примерно нужно питать.`;
  },
  askForApplication() {
    return 'Без проблем — скажите, что нужно питать (например, холодильник, насос, освещение или целую хижину), и я помогу подобрать правильный размер.';
  },
  offerApplication(powers) {
    return `Рад помочь вам разобраться. ${ru.askForApplication()}\n\nЕсли у вас уже есть цифра на примете, наша линейка off-grid покрывает ${powers.map((p) => `${p}W`).join('W, ')}W.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'Пожалуйста. Если хотите рекомендацию, просто скажите нужную мощность или опишите, что хотите питать.';
    }
    if (kind === 'general_help') {
      return `Конечно, могу помочь. Наша линейка off-grid охватывает от ${rangeProse(powers)}. Скажите нужную мощность или опишите, что хотите питать, и я предложу размер.`;
    }
    return `Здравствуйте! Чем могу помочь с нашими off-grid инверторами? Наша линейка off-grid охватывает от ${rangeProse(powers)}. Если вы уже знаете нужную мощность — просто скажите, или опишите, что хотите питать, и я помогу подобрать размер.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'стандартную версию (без USB) и версию с USB'
        : `${count} версии`;
    return `Мы производим ${described} на ${rated}W. Какую вы хотите посмотреть?`;
  },
  singleModel(rated) {
    return `${rated}W — единственная модель в нашей линейке off-grid — второй версии на этой мощности нет. Хотите посмотреть другую мощность?`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join(', ')} или ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'мощность' : 'мощности';
    const verb = labels.length === 1 ? 'это' : 'это';
    const question = labels.length === 1 ? 'Подойдёт?' : 'Какая-нибудь из них подойдёт?';
    return `Конечно — ближайшая ${noun} ${smaller ? 'ниже' : 'выше'} ${ref}W ${verb} ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return ru.askForContactFirst();
    return smaller
      ? `Мы не производим ничего меньше ${edge}W — это нижняя граница нашей линейки off-grid. Если нужно что-то другое, наша команда продаж рассмотрит.`
      : `Мы не производим ничего выше ${edge}W — это верхняя граница нашей линейки off-grid. Если нужно что-то другое, наша команда продаж рассмотрит.`;
  },
  salesHandoff() {
    return `Конечно — свяжу вас с нашей командой продаж.\n\n${ru.askForContact()}`;
  },
  askForContact() {
    return 'Поделитесь адресом электронной почты или номером WhatsApp, и наша команда продаж отправит вам спецификации и котировку.';
  },
  askForContactFirst() {
    return 'Поделитесь вашей почтой или номером WhatsApp, и наша команда продаж свяжется с вами напрямую.';
  },
  contactAsk() {
    return 'Не могли бы вы поделиться вашей почтой или WhatsApp, чтобы наша команда продаж могла с вами связаться?';
  },
  contactCaptured() {
    return 'Ваши данные уже у нашей команды продаж — они свяжутся с вами. Если есть ещё вопрос о наших off-grid инверторах, спрашивайте.';
  },
  supplyHandoff() {
    return `Это зависит от нашего текущего графика, поэтому свяжу вас с командой продаж.\n\n${ru.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\nХотите полные спецификации и котировку? Оставьте здесь вашу почту или номер WhatsApp, и наша команда продаж свяжется с вами.'
      : '';
    return `У нас есть ${product.name}, который может подойти под вашу задачу.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `Также доступна версия с USB этой модели ${product.powerLabel} — скажите, если предпочитаете её.`
      : `Также доступна стандартная версия (без USB) этой модели ${product.powerLabel} — скажите, если предпочитаете её.`;
  },
};

/** Arabic */
const ar: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} تغطي سلسلتنا خارج الشبكة ${powers.map((p) => `${p}W`).join('وات، ')}وات — أو أخبرني تقريباً بما تحتاج إلى تشغيله.`;
  },
  askForApplication() {
    return 'لا مشكلة — أخبرني بما تحتاج إلى تشغيله (مثل ثلاجة أو مضخة أو إضاءة أو كابينة كاملة) وسأساعدك في تحديد الحجم المناسب.';
  },
  offerApplication(powers) {
    return `يسعدني مساعدتك في معرفة ذلك. ${ar.askForApplication()}\n\nإذا كان لديك رقم في ذهنك بالفعل، فإن سلسلتنا خارج الشبكة تغطي ${powers.map((p) => `${p}W`).join('وات، ')}وات.`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return 'على الرحب والسعة. إذا كنت ترغب في توصية، فقط أخبرني بالقدرة التي تحتاجها أو صف ما تريد تشغيله.';
    }
    if (kind === 'general_help') {
      return `بالتأكيد، يمكنني المساعدة. تمتد سلسلتنا خارج الشبكة من ${rangeProse(powers)}. أخبرني بالقدرة التي تحتاجها أو صف ما تريد تشغيله وسأقترح حجماً.`;
    }
    return `مرحباً! كيف يمكنني مساعدتك مع محولاتنا خارج الشبكة؟ تمتد سلسلتنا خارج الشبكة من ${rangeProse(powers)}. إذا كنت تعرف القدرة التي تحتاجها، فقط قل ذلك — أو أخبرني بما تريد تشغيله وسأساعدك في تحديد الحجم.`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? 'نسخة قياسية (بدون USB) ونسخة مزودة بـ USB'
        : `${count} نسخ`;
    return `نصنع ${described} بقدرة ${rated}W. أي واحدة تود رؤيتها؟`;
  },
  singleModel(rated) {
    return `${rated}W نموذج واحد في سلسلتنا خارج الشبكة — لا توجد نسخة ثانية بهذه القدرة. هل تود النظر إلى قدرة أخرى؟`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join('، ')} أو ${labels[labels.length - 1]}`;
    const noun = labels.length === 1 ? 'القدرة' : 'القدرات';
    const question = labels.length === 1 ? 'هل تناسبك؟' : 'هل تناسبك أي منهما؟';
    return `بالطبع — أقرب ${noun} ${smaller ? 'أقل من' : 'أعلى من'} ${ref}W هي ${listed}. ${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return ar.askForContactFirst();
    return smaller
      ? `لا نصنع أي شيء أصغر من ${edge}W — هذا هو الحد الأدنى لسلسلتنا خارج الشبكة. إذا كنت بحاجة إلى شيء مختلف، يمكن لفريق المبيعات النظر في الأمر.`
      : `لا نصنع أي شيء أعلى من ${edge}W — هذا هو الحد الأقصى لسلسلتنا خارج الشبكة. إذا كنت بحاجة إلى شيء مختلف، يمكن لفريق المبيعات النظر في الأمر.`;
  },
  salesHandoff() {
    return `بالطبع — سأربطك بفريق المبيعات.\n\n${ar.askForContact()}`;
  },
  askForContact() {
    return 'يرجى مشاركة بريد إلكتروني أو رقم واتساب وسيرسل لك فريق المبيعات المواصفات وعرض السعر.';
  },
  askForContactFirst() {
    return 'يرجى مشاركة بريدك الإلكتروني أو رقم واتساب وسيتواصل معك فريق المبيعات مباشرة.';
  },
  contactAsk() {
    return 'هل يمكنك مشاركة بريدك الإلكتروني أو واتساب حتى يتمكن فريق المبيعات من التواصل معك؟';
  },
  contactCaptured() {
    return 'بياناتك موجودة بالفعل لدى فريق المبيعات — سيتواصلون معك. إذا كان لديك سؤال آخر عن محولاتنا خارج الشبكة، فلا تتردد.';
  },
  supplyHandoff() {
    return `هذا يعتمد على جدولنا الحالي، لذا سأربطك بفريق المبيعات.\n\n${ar.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\nهل ترغب في المواصفات الكاملة وعرض السعر؟ اترك بريدك الإلكتروني أو رقم واتساب هنا وسيتواصل معك فريق المبيعات.'
      : '';
    return `لدينا ${product.name} قد يناسب متطلبك.${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `تتوفر أيضاً نسخة مزودة بـ USB من هذا الطراز ${product.powerLabel} — أخبرني إذا كنت تفضل تلك.`
      : `تتوفر أيضاً نسخة قياسية (بدون USB) من هذا الطراز ${product.powerLabel} — أخبرني إذا كنت تفضل تلك.`;
  },
};

/** Traditional Chinese */
const zhHant: ChatStrings = {
  askForPower(powers, greeting) {
    return `${greeting} 我們的離網型系列涵蓋 ${powers.map((p) => `${p}W`).join('W、')}W — 或者直接告訴我您大約需要驅動什麼設備。`;
  },
  askForApplication() {
    return '沒問題 — 告訴我您需要驅動什麼設備（例如冰箱、水泵、照明或整個小屋），我可以幫您縮小合適的功率範圍。';
  },
  offerApplication(powers) {
    return `很樂意幫您釐清需求。${zhHant.askForApplication()}\n\n如果您心中已有數字，我們的離網型系列涵蓋 ${powers.map((p) => `${p}W`).join('W、')}W。`;
  },
  smallTalk(kind, powers) {
    if (kind === 'thanks') {
      return '不客氣。如果您需要推薦，只要告訴我您需要的功率，或描述您想驅動的設備即可。';
    }
    if (kind === 'general_help') {
      return `當然可以。我們的離網型系列從 ${rangeProse(powers)}。告訴我您需要的功率，或描述您想驅動的設備，我可以建議合適的尺寸。`;
    }
    return `您好！關於我們的離網型逆變器，有什麼可以幫您？我們的離網型系列從 ${rangeProse(powers)}。如果您已知道所需功率，直接說出來即可 — 或告訴我您想驅動什麼設備，我會幫您算出合適的尺寸。`;
  },
  otherModels(rated, hasStandard, hasUsb, count) {
    const described =
      count === 2 && hasStandard && hasUsb
        ? '標準版（無 USB）和配備 USB 的版本'
        : `${count} 種版本`;
    return `我們在 ${rated}W 提供 ${described}。您想看哪一種？`;
  },
  singleModel(rated) {
    return `${rated}W 在我們的離網型系列中是單一型號 — 該功率沒有第二種版本。您想看其他功率嗎？`;
  },
  direction(ref, candidates, smaller) {
    const labels = candidates.map((p) => `${p}W`);
    const listed =
      labels.length === 1 ? labels[0] : `${labels.slice(0, -1).join('、')} 或 ${labels[labels.length - 1]}`;
    const question = labels.length === 1 ? '這個可以嗎？' : '其中一個可以嗎？';
    return `當然可以 — 最接近 ${ref}W ${smaller ? '以下' : '以上'}的功率是 ${listed}。${question}`;
  },
  boundary(smaller, edge, hasEdge) {
    if (!hasEdge) return zhHant.askForContactFirst();
    return smaller
      ? `我們不生產小於 ${edge}W 的產品 — 這是我們離網型系列的下限。如果您需要其他產品，我們的銷售團隊可以為您評估。`
      : `我們不生產高於 ${edge}W 的產品 — 這是我們離網型系列的上限。如果您需要其他產品，我們的銷售團隊可以為您評估。`;
  },
  salesHandoff() {
    return `當然可以 — 讓我為您聯繫我們的銷售團隊。\n\n${zhHant.askForContact()}`;
  },
  askForContact() {
    return '請留下電子郵件或 WhatsApp 號碼，我們的銷售團隊會寄送規格和報價給您。';
  },
  askForContactFirst() {
    return '請留下您的電子郵件或 WhatsApp 號碼，我們的銷售團隊會直接與您聯繫。';
  },
  contactAsk() {
    return '可以請您留下電子郵件或 WhatsApp，方便我們的銷售團隊與您聯繫嗎？';
  },
  contactCaptured() {
    return '您的資料已交給我們的銷售團隊 — 他們會與您聯繫。如果您對我們的離網型逆變器還有其他問題，歡迎提出。';
  },
  supplyHandoff() {
    return `這取決於我們目前的排程，所以我先幫您聯繫銷售團隊。\n\n${zhHant.askForContactFirst()}`;
  },
  recommend(product, note, askForContact) {
    const extra = note ? `\n\n${note}` : '';
    const closing = askForContact
      ? '\n\n您需要完整的規格和報價嗎？請在此留下您的電子郵件或 WhatsApp 號碼，我們的銷售團隊會與您聯繫。'
      : '';
    return `我們有 ${product.name} 可能符合您的需求。${extra}${closing}`;
  },
  mentionVariant(product, variantUsb) {
    return variantUsb
      ? `這款 ${product.powerLabel} 型號也有配備 USB 的版本 — 如果您比較想要那款，請告訴我。`
      : `這款 ${product.powerLabel} 型號也有標準版（無 USB）— 如果您比較想要那款，請告訴我。`;
  },
};

/** Locale → strings. Unknown locales fall back to English. */
const STRINGS: Record<string, ChatStrings> = {
  en,
  de,
  es,
  fr,
  it,
  pt,
  ja,
  ko,
  ru,
  ar,
  'zh-hant': zhHant,
};

/**
 * The localised rule-engine strings for a page locale.
 *
 * Falls back to English for any unknown value so the engine can never crash
 * on a bad locale. Newer helpers that a locale has not implemented yet also
 * fall back to the English wording — the reply stays grammatical, just in
 * English, until that locale catches up.
 *
 * The returned object is guaranteed to have every method: the base English
 * table implements all of them, and per-locale tables override the ones they
 * have written.
 */
export function chatStrings(locale: string | undefined | null): Required<ChatStrings> {
  const table = STRINGS[locale ?? ''];
  if (!table) return en;
  return {
    ...en,
    ...table,
  };
}
