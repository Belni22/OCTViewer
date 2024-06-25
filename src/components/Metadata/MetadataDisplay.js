import React from 'react';

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
                        <th>Station Name</th>
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
                <div>No metadata available</div>
            )}
        </div>
    );
};

export default MetadataDisplay;
