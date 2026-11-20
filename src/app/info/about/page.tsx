import Link from 'next/link'
import info_styles from '../../styles/info.module.css'
import global_styles from "../../styles/global.module.css"

export default function About() {
    return(
        <div className={`${info_styles.about} ${global_styles.info_page}`}>
            <section>
                <p>Based in Manchester, UK, Moretype is an independent digital type foundry dedicated to crafting versatile, 
                    contemporary typefaces for screen and print. Pairing typographic precision with practical functionality, 
                    the foundry develops clean, expressive font families built to perform across modern digital interfaces and traditional print media alike.
                </p>
                <p>
                    At the core of Moretype’s approach is a focus on enduring utility and subtle character. Each typeface is drawn 
                    and refined with meticulous attention to proportion, spacing, and cross-platform rendering—ensuring consistent 
                    clarity whether set at small text sizes on high-density displays or scaled up for physical print and identity work. 
                </p>
                <p>
                    Alongside its growing retail catalog, Moretype creates thoughtful typographic systems tailored to the demands of contemporary designers, 
                    studios, and brands—offering dependable, well-engineered fonts ready for real-world production.
                </p>                 
         </section>
        </div>
    )
}