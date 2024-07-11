import React from 'react';
import {useTranslation} from "react-i18next";

// Creates a modal page for the information inside the help page
const HelpClassification = () => {
    const { t } = useTranslation();
    return <>

        <button type={"button"} className={"btn btn-outline-info ms-2"} data-bs-toggle={"modal"} data-bs-target={"#classificationModal"}>
            <img src={"/icons/info_icon.svg"} alt={"Hilfe Klassifizierung"} width={"20"} height={"20"} />
        </button>

        <div className={"modal fade"} id={"classificationModal"} aria-labelledby={"classificationModal"} aria-hidden={"true"}>
            <div className={"modal-dialog modal-lg modal-dialog-centered"}>
                <div className={"modal-content"}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="classificationModalLabel">{t('modal_classification_title')}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label={t('button_close_aria_label')}></button>
                    </div>
                    <div className="modal-body">
                        <p>{t('modal_classification_body.intro_text')}</p>
                        <ul>
                            <li>{t('modal_classification_body.classification_classes.csr')}</li>
                            <li>{t('modal_classification_body.classification_classes.dr')}</li>
                            <li>{t('modal_classification_body.classification_classes.mh')}</li>
                            <li>{t('modal_classification_body.classification_classes.normal')}</li>
                        </ul>
                        <p>{t('modal_classification_body.classification_results')}</p>
                        <p className="text-danger">{t('modal_classification_body.warning_text')}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('close_button_text')}</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default HelpClassification;