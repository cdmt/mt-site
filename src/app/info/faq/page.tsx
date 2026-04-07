import info_styles from '../../styles/info.module.css'
import global_styles from "../../styles/global.module.css"

export default function FAQ() {
    return(
        <div className={global_styles.info_page}>
            <dl className={info_styles.faq_page}>
                <dt><h4>What format are the fonts?</h4></dt>
                <dd>The fonts are provided in OpenType, WOFF, and WOFF2 formats. Additional formats may be available upon request.</dd>
                <dt><h4>What is Opentype?</h4></dt>
                <dd>The Opentype font format is a cross-platform extension of the TrueType font format developed by jointly by Adobe and Microsoft. Opentype fonts can contain extended character sets and advanced layout features for use in Opentype savvy applications.</dd>
                <dt><h4>What is an End User Licence Agreement?</h4></dt>
                <dd>An EULA is a legal contract between the manufacturer and/or the author and the end user of an application. The EULA details how the software can and cannot be used and any restrictions that the manufacturer imposes (e.g., most EULA’s of proprietary software prohibit the user from sharing the software with anyone else).The Moretype EULA sets out the limitations of the use of the font, you have to agree to have read and understood this before you can purchase the fonts.</dd>
                <dt><h4>What languages do the fonts support?</h4></dt>
                <dd>The supported character sets are shown on the individual type pages.</dd>
                <dt><h4>Why are some fonts named “New”?</h4></dt>
                <dd>The fonts were originally released in a non OpenType format. When the fonts were upgraded to OpenType we took the opportunity to re-drawer, re-space and re-kern the fonts. The degree of changes warranted the fonts to be renamed as “New”.</dd>
                <dt><h4>Can the fonts be returned?</h4></dt>
                <dd>Due to the fonts being digital products they cannot be returned for a refund. We go to every effort during the design and testing process to ensure the fonts are produced to the highest technical standards. If you have any issue please contact us directly.</dd>
                <dt><h4>Can I alter, add or change the fonts?</h4></dt>
                <dd>Fonts must be used as provided and may not be altered, edited, or modified. This includes all glyphs, which cannot be changed for logo design, branding, or any other use.</dd>
                <dt><h4>Can I use the fonts in a website?</h4></dt>
                <dd>Fonts can be used in a website providing they are in a secure, read only mode. This is covered in more detail in the Moretype EULA. Moretype fonts are available as web fonts from Typekit, Fontdeck and Webink</dd>
                <dt><h4>Have another question ?</h4></dt>
                <dd>If you have another question you get in touch <a href="mailto:info@moretype.co.uk" className={info_styles.faq_link}>info@moretype.co.uk</a></dd>
            </dl>
        </div>
    )
}