import React from 'react';


const HelpWindow = () => {
    return <>

        <button type="button" class="btn btn-outline-info mt-5 w-100" data-bs-toggle="modal" data-bs-target="#hilfeModal">
            <img src={"/icons/info_icon.svg"} alt={"Hilfe"} width={"20"} height={"20"} />
        </button>

        <div class="modal fade" id="hilfeModal" tabindex="-1" aria-labelledby="hilfeModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="hilfeModalLabel">Informationen zu diesem Tool</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h5>Über dieses Tool</h5>
                        <p>Dieses Tool unterstützt die Funktion folgende Bilddateien hochzuladen: PNG, JPG und DICOM.<br/>
                            Laden Sie die Bilder über den Button "Datei auswählen" oben links hoch. <br/>
                            Nur bei DICOM Bildern werden die Metadaten ausgewählt und angezeigt
                        </p>
                        <h5>Werkzeuge</h5>
                        <p>Bilder können über die Fläche Datei hochladen aus dem lokalen Dateisystem hochgeladen werden. <br/>
                            Um die Bilddateien zu analysieren stehen ihnen folgende Werkzeuge zur Verfügung:</p>
                            <ul>
                                <li>Zoom: Vergrössern und verkleinern der Bilder</li>
                                <li>Scrollen: Scrollen durch mehrere Bilder mithilfe des Mausrads</li>
                                <li>Drehen: Drehen von einzelnen Bildern</li>
                                <li>Verschieben: Verschieben von Bildern</li>
                                <li>Helligkeit: Anpassen der Helligkeit</li>
                                <li>Kommentar: Hinzufügen von Kommentaren auf Bildern</li>
                                <li>Reset: Löschen der Kommentare auf einem einzelnen Bild</li>
                            </ul>
                        <h5>PDF hochladen</h5>
                        <p>
                            PDF Dateien können über den button "Datei auswählen" links unten auf der Mainpage hochgeladen werden.<br/>
                            Klicken sie auf den Button "View PDF" um das PDF anzeigen zu lassen.
                        </p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schliessen</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default HelpWindow;