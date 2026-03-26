import Link from 'next/link'
import info_styles from '../../styles/info.module.css'
import global_styles from "../../styles/global.module.css"

export default function InstallFonts() {
    return(
        <div className={`${info_styles.eula} ${global_styles.info_page}`}>
            <section>
                <h3>Whether you are installing fonts on a Mac or PC you should first.</h3>
                <ul>
                    <li>
                    Close all open applications.
                    </li>
                    <li>
                    Unzip the downloaded file containing the fonts.
                    </li>
                    <li>
                    On your desktop you should have a folder for each font weight or font family you wish to install.
                    </li>
                </ul>
            </section>
            <section>
                <h3>Install Fonts on a Mac</h3>
                <h4>Add files to the Fonts Folder</h4>
                <ul>
                    <li>Drag the font files from your desktop to your account Fonts folder.</li>
                    <li>The account fonts folder is at Username {">"} Library {">"} Fonts.</li>
                    <li>These font will then be available to your account only.</li>
                    <li>Alternatively you can add the fonts to the Macintosh HD Fonts folder.</li>
                    <li>The HD Font folder is at Macintosh HD {">"} Library {">"} Fonts.</li>
                    <li>The font will then be available to all users.,</li>
                </ul>
                <h4>Add Fonts with Font Book</h4>
                <ul>
                    <li>Font Book is free with Mac OSX.</li>
                    <li>Simple double click the font files on your desktop.</li>
                    <li>Font Book open and add the fonts to your fonts folder.</li>
                </ul>
                Further information about installing fonts on a Mac can be found <Link href="https://support.apple.com/en-gb/guide/font-book/fntbk1000/mac" target="_blank" className={info_styles.install_link}>here</Link>
            </section>
            <section>
                <h3>Install Fonts on a PC</h3>
                <ul>
                    <li>Unpack the zip folder that you downloaded.</li>
                    <li>Go to the folder with the fonts and search for the .OTF or .TTF file (we recommend you always install the OTF file if available).</li>
                    <li>Double-click on the font as if you are opening an application.</li>
                    <li>Now the font installation window will open.</li>
                    <li>Click Install and wait till it’s done.</li>
                </ul>
                Further information about installing fonts on a Mac can be found <Link href="https://support.microsoft.com/en-us/office/add-a-font-b7c5f17c-4426-4b53-967f-455339c564c1" target="_blank" className={info_styles.install_link}>here</Link>
            </section>
        </div>
    )
}