import React from 'react';

// Creates a modal page for the information inside the help page
const HelpWindow = () => {
    return <>

        <button type="button" class="btn btn-outline-info mt-5 w-100" data-bs-toggle="modal" data-bs-target="#hilfeModal">
            <img src={"/icons/info_icon.svg"} alt={"Hilfe"} width={"20"} height={"20"} />
        </button>

        <div class="modal fade" id="hilfeModal" tabindex="-1" aria-labelledby="hilfeModal" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="hilfeModalLabel">Über den OCT Viewer</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5>Allgemeine Informationen</h5>
                        <p>Dieses Tool wurde erstellt um OCT Aufnahmen und andere multimodale Daten anzuzeigen. <br/>
                            Das Tool beinhaltet die folgenden Funktionen:</p>
                        <ul>
                            <li>Anzeigen von OCT Aufnahmen</li>
                            <li>Anzeigen von Metadaten</li>
                            <li>Anzeigen von Berichten (PDF)</li>
                            <li>Klassifizierung</li>
                        </ul>
                        <br/>
                        <h5>Upload und Anzeige von Bildern</h5>
                        <p>Folgende Bildformate werden unterstützt:</p>
                        <ul>
                            <li>JPG</li>
                            <li>PNG</li>
                            <li>DICOM</li>
                        </ul>
                        <br />
                        <p>
                            Die Bilder können über den Button <i>Datei auswählen</i> <b className={"text-primary"}>oben
                            links in der Sidebar </b>
                            aus dem lokalen Dateiverzeichnis ausgewählt und hochgeladen werden. Anschliessend wird die
                            Datei direkt angezeigt.
                        </p>
                        <br/>
                        <h5>Anzeige von Metadaten</h5>
                        <p>
                            <b className={"text-danger"}>Wichtig: Metadaten werden nur aus DICOM Dateien extrahiert und
                                angezeigt!</b> <br/>
                            Metadaten werden sobald eine DICOM Datei hochgeladen wird automatisch extrahiert, bei JPG
                            und PNG Dateien erhält man die Meldung:
                            <i>Keine Metadaten verfügbar</i>.<br/>
                            Die folgenden Metadaten werden angezeigt:
                        </p>
                        <ul>
                            <li>Name des Patienten</li>
                            <li>Patienten ID</li>
                            <li>Studienbeschreibung</li>
                            <li>Serienbeschreibung</li>
                            <li>Hersteller</li>
                            <li>Name der Station</li>
                            <li>Modalität</li>
                            <li>Datum der Studie</li>
                            <li>Seriennummer</li>
                            <li>Instanznummer</li>
                        </ul>
                        <br />
                        <h5>Werkzeuge</h5>
                        <p>
                            Es stehen mehrere Werkzeuge zur Verfügung die für die Bildanalyse genutzt werden können.
                            Nachfolgende Tabelle gibt detailliert Erklärungen dazu.
                        </p>
                        <table className={"table table-bordered table-hover"}>
                            <thead className={"table-light"}>
                            <tr>
                                <th>Werkzeug</th>
                                <th>Beschreibung</th>
                                <th>Bedienung</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Drehen</td>
                                <td>Ermöglicht das Drehen des Bildes im oder gegen den Uhrzeigersinn.</td>
                                <td>Linke Maustaste klicken und ziehen</td>
                            </tr>
                            <tr>
                                <td>Helligkeit/Kontrast</td>
                                <td>
                                    Ermöglicht das Verändern der Helligkeit und des Kontrasts der OCT Aufnahme.<br/>
                                    <strong>* Beinhaltet eine besondere Bedienung:</strong><br/>
                                    Helligkeit: Gedrückte linke Maustaste nach oben und unten<br/>
                                    Kontrast: Gedrückte linke Maustaste nach links oder rechts
                                </td>
                                <td>Linke Maustaste klicken und ziehen *</td>
                            </tr>
                            <tr>
                                <td>Verschieben</td>
                                <td>Die Aufnahme kann verschoben werden. Bei einer vergrößerten Aufnahme kann so an den
                                    richtigen Punkt navigiert werden.
                                </td>
                                <td>Linke Maustaste klicken und ziehen</td>
                            </tr>
                            <tr>
                                <td>Zoom</td>
                                <td>Die Aufnahme kann zur besseren Analyse vergrößert werden.</td>
                                <td>Linke Maustaste klicken und nach oben/unten ziehen</td>
                            </tr>
                            <tr>
                                <td>Kommentar</td>
                                <td>Um wichtige Punkte oder Erkenntnisse zu markieren, können mehrere Kommentare pro
                                    Aufnahme erstellt werden.
                                </td>
                                <td>Linke Maustaste klicken + Tastatur</td>
                            </tr>
                            <tr>
                                <td>Kommentare zurücksetzen</td>
                                <td>Löscht die erstellten Kommentare auf dem aktuell angezeigten Bild.</td>
                                <td>Einmaliger Klick auf Button</td>
                            </tr>
                            <tr>
                                <td>Scroll</td>
                                <td>Ermöglicht das Navigieren zwischen verschiedenen Aufnahmen.</td>
                                <td>Mausrad</td>
                            </tr>
                            </tbody>
                        </table>

                        <h5>Upload und Anzeige PDF-Dateien</h5>

                            <h6>Upload</h6>
                            <p>
                            Die PDF Dateien werden auf der Hauptseite unten links dargestellt. Um die PDF <b>Dateien
                            hochzuladen </b>
                            muss man die PDF-Datei über den Button <b>Datei auswählen </b><b className={"text-primary"}>links unten
                            auf der Hauptseite </b>auswählen. Die Dateien können aus dem lokalen Dateiverzeichnis ausgewählt werden.
                            </p>
                            <h6>Anzeige</h6>
                           <p>
                               Um die <b>Datei anzeigen</b> zu lassen klickt man auf den Button <b className={"text-success"}>View PDF</b>.
                           </p>

                        <h5>Klassifizierung</h5>
                        <p>
                            Das zurzeit angezeigte Bild kann klassifiziert werden. Es gilt zu beachten das nicht mehrere Bilder zur gleichen
                            Zeit klassifiziert werden können. <b className={"text-primary"}>Weitere Informationen
                            können von der Hilfeseite für die Klassifikation entnommen werden. Diese befindet sich oberhalb des Balkendiagramms (i-Symbol).</b>
                        </p>

                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default HelpWindow;