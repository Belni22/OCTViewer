import React from 'react';
import {useTranslation} from "react-i18next";

/*
* Receives the metadata from the dicom viewer and display it.
* Please note: only with dicom files it will extract metadata and display it
* The table is designed with bootstrap, if there is no Metadata for example because of
* png or jpg files it will show a message "No Metadata available"
*/
const MetadataDisplay = ({ metadata }) => {
    const {t} = useTranslation(); // For the translation
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
                        <th>{t('patient_name')}</th>
                        <th>{t('patient_id')}</th>
                        <th>{t('study_description')}</th>
                        <th>{t('series_description')}</th>
                        <th>{t('manufacturer')}</th>
                        <th>{t('station_name')}</th>
                        <th>{t('modality')}</th>
                        <th>{t('study_date')}</th>
                        <th>{t('series_number')}</th>
                        <th>{t('instance_number')}</th>
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
                    <p>{t("metadataError")}</p>
                    <p className={"text-danger"}>{t("metadataNote")}</p>
                </div>
            )}
        </div>
    );
};

export default MetadataDisplay;
