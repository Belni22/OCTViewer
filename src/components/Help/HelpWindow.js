import React from 'react';
import {useTranslation} from "react-i18next";

// Creates a modal page for the information inside the help page
const HelpWindow = () => {
    const { t } = useTranslation();
    return <>

        <button type="button" className={"btn btn-outline-info mt-5 w-100"} data-bs-toggle={"modal"} data-bs-target={"#hilfeModal"}>
            <img src={"/icons/info_icon.svg"} alt={"Hilfe"} width={"20"} height={"20"} />
        </button>

        <div className={"modal fade"} id={"hilfeModal"} aria-labelledby={"hilfeModal"} aria-hidden={"true"}>
            <div className={"modal-dialog modal-xl modal-dialog-centered"}>
                <div className={"modal-content"}>
                    <div className={"modal-header"}>
                        <h1 className={"modal-title fs-5"} id={"hilfeModalLabel"}>{t('modal_general_title')}</h1>
                        <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}></button>
                    </div>
                    <div className={"modal-body"}>
                        <h5>{t('modal_general_body.general_info_title')}</h5>
                        <p>{t('modal_general_body.general_info_text')}</p>
                        <ul>
                            <li>{t('modal_general_body.general_info_OCT')}</li>
                            <li>{t('modal_general_body.general_info_Metadata')}</li>
                            <li>{t('modal_general_body.general_info_Reports')}</li>
                            <li>{t('modal_general_body.general_info_Classification')}</li>
                        </ul>
                        <br/>
                        <h5>{t('modal_general_body.upload_instruction_title')}</h5>
                        <p>{t('modal_general_body.upload_instruction_introduction')}</p>
                        <ul>
                            <li>{t('modal_general_body.supported_image_formats1')}</li>
                            <li>{t('modal_general_body.supported_image_formats2')}</li>
                            <li>{t('modal_general_body.supported_image_formats3')}</li>
                        </ul>
                        <br />

                            <b>{t('modal_general_body.upload_subtitle')}</b>
                            <p>{t('modal_general_body.upload_instruction_text')}</p>
                            <b>{t('modal_general_body.display_subtitle')}</b>
                            <p>{t('modal_general_body.display_instruction_text')}</p>

                        <br/>
                        <h5>{t('modal_general_body.metadata_display_title')}</h5>
                        <p>
                            <b className={"text-danger"}>{t('modal_general_body.metadata_display_warning')}</b>
                        </p>
                        <p>
                            {t('modal_general_body.metadata_display_note')}
                            <i>{t('modal_general_body.metadata_display_error')}</i>.<br/>
                            {t('modal_general_body.metadata_display_introduction')}
                        </p>
                        <ul>
                            <li>{t('patient_name')}</li>
                            <li>{t('patient_id')}</li>
                            <li>{t('study_description')}</li>
                            <li>{t('series_description')}</li>
                            <li>{t('manufacturer')}</li>
                            <li>{t('station_name')}</li>
                            <li>{t('modality')}</li>
                            <li>{t('study_date')}</li>
                            <li>{t('series_number')}</li>
                            <li>{t('instance_number')}</li>
                        </ul>
                        <br/>
                        <h5>{t('modal_general_body.tools_title')}</h5>
                        <p>
                            {t('modal_general_body.tools_description')}
                        </p>
                        <table className={"table table-bordered table-hover"}>
                            <thead className={"table-light"}>
                            <tr>
                            <th>{t('modal_general_body.tools_table_header1')}</th>
                            <th>{t('modal_general_body.tools_table_header2')}</th>
                            <th>{t('modal_general_body.tools_table_header3')}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{t('turn')}</td>
                                <td>{t('modal_general_body.tools_table.tool_rotate.tool_description')}</td>
                                <td>{t('modal_general_body.tools_table.tool_rotate.tool_operation')}</td>
                            </tr>
                            <tr>
                                <td>{t('brightnessContrast')}</td>
                                <td>
                                    {t('modal_general_body.tools_table.tool_brightness_contrast.tool_description')}<br/>
                                    <strong>{t('modal_general_body.tools_table.tool_brightness_contrast.tool_special_operation')}</strong><br/>
                                    {t('modal_general_body.tools_table.tool_brightness_contrast.tool_special_operation_text1')} <br/>
                                    {t('modal_general_body.tools_table.tool_brightness_contrast.tool_special_operation_text2')}
                                </td>
                                <td>{t('modal_general_body.tools_table.tool_brightness_contrast.tool_operation')}</td>
                            </tr>
                            <tr>
                                <td>{t('move')}</td>
                                <td>
                                    {t('modal_general_body.tools_table.tool_pan.tool_description')}
                                </td>
                                <td>{t('modal_general_body.tools_table.tool_pan.tool_operation')}</td>
                            </tr>
                            <tr>
                                <td>{t('zoom')}</td>
                                <td>{t('modal_general_body.tools_table.tool_zoom.tool_description')}</td>
                                <td>{t('modal_general_body.tools_table.tool_zoom.tool_operation')}</td>
                            </tr>
                            <tr>
                                <td>{t('comment')}</td>
                                <td>
                                    {t('modal_general_body.tools_table.tool_arrow_annotate.tool_description')}
                                </td>
                                <td>{t('modal_general_body.tools_table.tool_arrow_annotate.tool_operation')}</td>
                            </tr>
                            <tr>
                                <td>{t('resetComment')}</td>
                                <td>{t('modal_general_body.tools_table.tool_reset_annotations.tool_description')}</td>
                                <td>{t('modal_general_body.tools_table.tool_reset_annotations.tool_operation')}</td>
                            </tr>
                            <tr>
                                <td>{t('scroll')}</td>
                                <td>{t('modal_general_body.tools_table.tool_scroll.tool_description')}</td>
                                <td>{t('modal_general_body.tools_table.tool_scroll.tool_operation')}</td>
                            </tr>
                            </tbody>
                        </table>

                        <h5>{t('modal_general_body.upload_display_pdf_title')}</h5>

                            <h6>{t('modal_general_body.pdf_upload_title')}</h6>
                            <p>
                                {t('modal_general_body.pdf_upload_text')}
                            </p>
                            <h6>{t('modal_general_body.pdf_display_title')}</h6>
                           <p>
                               {t('modal_general_body.pdf_display_text')}
                           </p>

                        <h5>{t('modal_general_body.classification_title')}</h5>
                        <p>
                            {t('modal_general_body.classification_text')}
                            <b className={"text-primary"}>
                                {t('modal_general_body.classification_additional_info')}
                            </b>
                        </p>

                    </div>
                    <div className={"modal-footer"}>
                    <button type={"button"} className={"btn btn-secondary"} data-bs-dismiss={"modal"}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default HelpWindow;