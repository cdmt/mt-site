import info_styles from '../../styles/info.module.css'

export default function InstallFonts() {
    return(
        <div className={info_styles.eula}>
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
                <h2>Install Fonts on a Mac</h2>
                <h3>Add files to the Fonts Folder</h3>
                <ul>
                    <li>Drag the font files from your desktop to your account Fonts folder.</li>
                    <li>The account fonts folder is at Username {">"} Library {">"} Fonts.</li>
                    <li>These font will then be available to your account only.</li>
                    <li>Alternatively you can add the fonts to the Macintosh HD Fonts folder.</li>
                    <li>The HD Font folder is at Macintosh HD {">"} Library {">"} Fonts.</li>
                    <li>The font will then be available to all users.,</li>
                </ul>
                <h3>Add Fonts with Font Book</h3>
                <ul>
                    <li>Font Book is free with Mac OSX.</li>
                    <li>Simple double click the font files on your desktop.</li>
                    <li>Font Book open and add the fonts to your fonts folder.</li>
                </ul>
                Further information about installing fonts on a Mac can be found here.
            </section>
            <section>
                <h2>Install Fonts on a PC</h2>
                <ul>
                    <li>Unpack the zip folder that you downloaded.</li>
                    <li>Go to the folder with the fonts and search for the .OTF or .TTF file (we recommend you always install the OTF file if available).</li>
                    <li>Double-click on the font as if you are opening an application.</li>
                    <li>Now the font installation window will open.</li>
                    <li>Click Install and wait till it’s done.</li>
                </ul>
                Further information about installing fonts on a Mac can be found here.
            </section>
        </div>
    )
}