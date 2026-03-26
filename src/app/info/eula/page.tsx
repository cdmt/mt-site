import info_styles from '../../styles/info.module.css'
import global_styles from "../../styles/global.module.css"

export default function EULA() {
    return(
        <div className={`${global_styles.info_page} ${info_styles.eula}`}>
            <section>
                <h3 className={info_styles.eula_header}>End User Licence Agreement (EULA)</h3>

                <p>Effective Date: 23/03/26<br />
                Licensor: Moretype (Moretype&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)</p>
                <p>
                    This End User License Agreement (&quot;Agreement&quot;) is a legal agreement between you (&quot;Licensee&quot;, &quot;you&quot;, or &quot;your&quot;) and Moretype governing your use of the font software provided by Moretype (&quot;Font Software&quot;).  
                </p>
                <p>
                    By installing, accessing, or using the Font Software, you agree to be bound by the terms of this Agreement.
                </p>
            </section>
            <section>
                <h4 className={info_styles.eula_header}>1. Grant of Licence</h4>
                <p>
                    Subject to your compliance with this Agreement and payment of all applicable fees,
                    Moretype grants you a non-exclusive, non-transferable, non-sublicensable licence
                    to use the Font Software in accordance with the licence type(s) you have purchased.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>2. Desktop Licence</h4>
                <p>The Desktop Licence permits you to:</p>
                <ul className="">
                    <li>Install the Font Software on a specified number of computers (as defined by your licence purchase)</li>
                    <li>Use the Font Software to create static designs, including:
                        <ul>
                            <li>Printed materials (e.g. books, posters, packaging)</li>
                            <li>Logos and branding assets</li>
                            <li>Rasterised images (e.g. JPEG, PNG)</li>
                        </ul>
                    </li>
                </ul>
                <p>Restrictions:</p>
                <ul>
                    <li>You must not share, distribute, or make the Font Software available to any third party</li>
                    <li>You must not embed the Font Software in editable or customisable documents distributed to third parties (e.g. templates for resale)</li>
                    <li>You must not convert the Font Software into other formats for redistribution</li>
                </ul>
            </section>

            <section >
                <h4 className={info_styles.eula_header}>3. Web Licence</h4>
                <p>The Web Licence permits you to:</p>
                <ul className="">
                    <li>Use the Font Software on websites via @font-face embedding</li>
                    <li>Deploy the Font Software only on domains specified in your licence</li>
                    <li>Use the Font Software for styling live text content</li>
                </ul>
                <p>Restrictions:</p>
                <ul>
                    <li>Usage must not exceed the pageview limits specified in your licence</li>
                    <li>You must take reasonable technical measures to prevent unauthorised access, copying, or extraction of the Font Software</li>
                    <li>The Font Software must not be made available for use by third parties outside your licensed websites</li>
                </ul>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>4. App Licence</h4>
                <p>The App Licence permits you to:</p>
                <ul className="">
                    <li>Embed the Font Software within mobile, desktop, or web applications</li>
                    <li>Distribute the Font Software as part of a compiled application</li>
                </ul>
                <p>Restrictions:</p>
                <ul>
                    <li>The Font Software must be embedded in a secure format that prevents extraction or reuse</li>
                    <li>The Font Software may only be used within the licensed application</li>
                    <li>Each separate application title requires its own licence unless otherwise agreed in writing</li>
                </ul>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>5. Trial and Evaluation Use</h4>
                <p>Where the Font Software is provided for trial or evaluation:</p>
                <ul className="">
                    <li>Use is limited to internal, non-commercial purposes only</li>
                    <li>Commercial use is strictly prohibited</li>
                    <li>Moretype may impose technical or time-based limitations</li>
                </ul>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>6. Restrictions</h4>
                <p>
                    You must not:
                </p>
                <ul>
                    <li>Modify, adapt, translate, reverse engineer, decompile, or create derivative works from the Font Software</li>
                    <li>Sell, rent, lease, sublicense, assign, or redistribute the Font Software</li>
                    <li>Use the Font Software in any unlawful, defamatory, or infringing manner</li>
                    <li>Use the Font Software in products where the primary value lies in the Font Software itself (e.g. alphabet products or font redistribution tools)</li>
                </ul>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>7. Intellectual Property</h4>
                <p>
                    The Font Software is licensed, not sold. Moretype retains all intellectual property rights in the Font Software, including (without limitation) copyright, design rights, and any related rights under applicable law.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>8. Backup Copies</h4>
                <p>
                    You may make a reasonable number of backup copies of the Font Software solely for archival purposes.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>9. Termination</h4>
                <p>
                    This Agreement shall remain in effect until terminated.
                </p>
                <p>
                    Moretype may terminate this Agreement immediately if you breach any of its terms. Upon termination, you must:
                </p>
                <ul>
                    <li>Immediately cease all use of the Font Software</li>
                    <li>Delete or destroy all copies in your possession or control</li>
                </ul>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>10. Consumer Rights (UK)</h4>
                <p>
                    Nothing in this Agreement excludes or limits any rights you may have under applicable UK consumer protection laws, including the Consumer Rights Act 2015, where you are acting as a consumer.
                </p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>11. Disclaimer of Warranties</h4>
                <p>To the extent permitted by law, the Font Software is provided &quot;as is&quot; and without warranties of any kind, whether express or implied, including (but not limited to) fitness for a particular purpose, satisfactory quality, or non-infringement.</p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>12. Limitation of Liability</h4>
                <p>Nothing in this Agreement excludes or limits liability for:</p>
                <ul>
                    <li>Death or personal injury caused by negligence</li>
                    <li>Fraud or fraudulent misrepresentation</li>
                    <li>Any liability which cannot be excluded or limited under applicable law</li>
                </ul>
                <p>Subject to the above, Moretype shall not be liable for any:</p>
                <ul>
                    <li>Loss of profits, business, or revenue</li>
                    <li>Loss of data</li>
                    <li>Indirect or consequential loss</li>
                </ul>
                <p>arising out of or in connection with the use of the Font Software.</p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>13. Governing Law and Jurisdiction</h4>
                <p>This Agreement and any dispute or claim arising out of or in connection with it shall be governed by and construed in accordance with the laws of England and Wales.</p>
                <p>The courts of England and Wales shall have exclusive jurisdiction, except where you are a consumer resident in another part of the United Kingdom, in which case you may bring proceedings in your local courts.</p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>14. Entire Agreement</h4>
                <p>This Agreement constitutes the entire agreement between you and Moretype relating to the Font Software and supersedes all prior agreements or understandings.</p>
            </section>

            <section>
                <h4 className={info_styles.eula_header}>15. Contact</h4>
                <p>For licensing enquiries, please contact:</p>
                <p>info@moretype.co.uk</p>
            </section>

            <section>
                <h4>By installing or using the Font Software, you confirm that you have read, understood, and agree to be bound by this Agreement.</h4>
            </section>
        </div>
    )
}