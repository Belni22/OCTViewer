//based on https://github.com/piyush-eon/i18next-tutorial-yt/tree/master
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const languages = [
    {code: "en", lang: "English"},
    {code: "de", lang: "Deutsch"},
];

const LanguageSelector = () => {
    const {i18n} = useTranslation();

    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n, i18n.language]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("language", lng);
    };

    return (
        <div className="d-flex btn-container mt-5 justify-content-between">
            {languages.map((lng) => {
                return (
                    <button
                        className={lng.code === i18n.language ? "btn btn-light" : "btn btn-outline-light"}
                        key={lng.code}
                        onClick={() => changeLanguage(lng.code)}
                        style={{width:`${95/languages.length}%`}}
                    >
                        {lng.lang}
                    </button>
                );
            })}
        </div>
    );
};

export default LanguageSelector;