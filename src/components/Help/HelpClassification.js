import React from 'react';

// Creates a modal page for the information inside the help page
const HelpClassification = () => {
    return <>

        <button type="button" class="btn btn-outline-info ms-2" data-bs-toggle="modal" data-bs-target="#classificationModal">
            <img src={"/icons/info_icon.svg"} alt={"Hilfe Klassifizierung"} width={"20"} height={"20"} />
        </button>

        <div class="modal fade" id="classificationModal" tabindex="-1" aria-labelledby="classificationModal" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="classificationModalLabel">Information über die Klassifizierung</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>
                            Das aktuell angezeigte Bild aus der Anzeige kann mit dem "Classify"
                            Button klassifiziert werden.<br/>
                            Die Klassifizierung erfolgt in vier Klassen: CSR, DR, MH und Normal. <br/>
                        </p>
                        <ul>
                            <li>CSR: Central Serous Retinopathy (Zentrale Seröse Retinopathie)</li>
                            <li>DR: Diabetic Retinopathy (Diabetische Retinopathie)</li>
                            <li>MH: Macular Hole (Makulaloch)</li>
                            <li>Normal: Keine sichtbaren Erkrankungen</li>
                        </ul>
                        <p>Die Ergebnisse der Klassifizierung werden anschliessend in einem Balkendiagramm angezeigt.</p>
                        <p className={"text-danger"}>
                            Achtung: Die Klassifizierung dient nur zur Unterstützung und bietet Vorhersagen an.
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

export default HelpClassification;