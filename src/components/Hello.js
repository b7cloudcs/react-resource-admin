import { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';

// Hello
export default withTranslation()(({ t, i18n }) => {

    // return
    return <>
        {t("hello")}
    </>
})