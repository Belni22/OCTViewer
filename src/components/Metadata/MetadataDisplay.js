import React from 'react';

/*
* Receives the metadata from the dicom viewer and display it.
* Please note: only with dicom files it will extract metadata and display it
* The table is designed with bootstrap, if there is no Metadata for example because of
* png or jpg files it will show a message "No Metadata available"
*/
const MetadataDisplay = ({ metadata }) => {
    return (
        <div
            style={{
                width: '812px',
                height: '512px',
                overflowY: 'scroll',
                border: '1px solid #ccc',
                marginTop: '20px'
            }}
        >
            {metadata.length > 0 ? (
                <table className={"table table-bordered table-hover"}>
                    <thead>
                    <tr>
                        <th>Name des Patienten</th>
                        <th>Patienten ID</th>
                        <th>Studienbeschreibung</th>
                        <th>Serienbeschreibung</th>
                        <th>Hersteller</th>
                        <th>Name der Station</th>
                        <th>Modalität</th>
                        <th>Datum der Studie</th>
                        <th>Seriennummer</th>
                        <th>Instanznummer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {metadata.map((meta, index) => (
                        <tr key={index}>
                            <td>{meta.patientName}</td>
                            <td>{meta.patientId}</td>
                            <td>{meta.studyDescription}</td>
                            <td>{meta.seriesDescription}</td>
                            <td>{meta.manufacturer}</td>
                            <td>{meta.stationName}</td>
                            <td>{meta.modality}</td>
                            <td>{meta.studyDate}</td>
                            <td>{meta.seriesNumber}</td>
                            <td>{meta.instanceNumber}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    <p>Keine Metadaten verfügbar</p>
                    <p className={"text-danger"}>Bemerkung: Metadaten werden nur aus DICOM Dateien extrahiert</p>
                </div>
            )}
        </div>
    );
};

export default MetadataDisplay;
