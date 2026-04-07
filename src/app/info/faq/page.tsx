import info_styles from '../../styles/info.module.css'
import global_styles from "../../styles/global.module.css"

export default function FAQ() {
    return(
        <div className={global_styles.info_page}>
            <dl className={info_styles.faq_page}>
                <dt><h4>What formats are the fonts available in?</h4></dt>
                <dd>The fonts are provided in OpenType, WOFF, and WOFF2 formats. Additional formats may be available upon request.</dd>

                <dt><h4>What is OpenType?</h4></dt>
                <dd>The OpenType font format is a cross-platform extension of the TrueType font format, developed jointly by Adobe and Microsoft. OpenType fonts can contain extended character sets and advanced layout features for use in OpenType-savvy applications.</dd>

                <dt><h4>What is an End User Licence Agreement?</h4></dt>
                <dd>An EULA is a legal contract between the manufacturer and/or the author and the end user of an application. The EULA details how the software can and cannot be used, as well as any restrictions imposed by the manufacturer (e.g., most EULAs for proprietary software prohibit users from sharing the software with others). The Moretype EULA sets out the limitations on the use of the font, and you must confirm that you have read and understood it before purchasing the fonts.</dd>

                <dt><h4>What languages do the fonts support?</h4></dt>
                <dd>The supported character sets are shown on the individual type pages.</dd>

                <dt><h4>Why are some fonts named “New”?</h4></dt>
                <dd>The fonts were originally released in a non-OpenType format. When the fonts were upgraded to OpenType, we took the opportunity to redraw, respace, and re-kern them. The extent of these changes warranted renaming the fonts as “New”.</dd>

                <dt><h4>Can the fonts be returned?</h4></dt>
                <dd>As the fonts are digital products, they cannot be returned for a refund. We make every effort during the design and testing process to ensure the fonts meet the highest technical standards. If you experience any issues, please contact us directly.</dd>

                <dt><h4>Can I alter, add to, or change the fonts?</h4></dt>
                <dd>Fonts must be used as provided and may not be altered, edited, or modified. This includes all glyphs, which cannot be changed for logo design, branding, or any other use.</dd>

                <dt><h4>Can I use the fonts on a website?</h4></dt>
                <dd>Fonts can be used on a website provided they are in a secure, read-only mode. This is covered in more detail in the Moretype EULA. Moretype fonts are available as web fonts from Typekit, Fontdeck, and WebINK.</dd>

                <dt><h4>Have another question?</h4></dt>
                <dd>If you have another question, please get in touch <a href="mailto:info@moretype.co.uk" className={info_styles.faq_link}>info@moretype.co.uk</a></dd>
            </dl>
        </div>
    )
}