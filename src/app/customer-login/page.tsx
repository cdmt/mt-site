import CustomerLoginForm from "fontdue-js/CustomerLoginForm";
//
import global_styles from "../styles/global.module.css"

export default function About() {
        return (
            <div className={`${global_styles.page_wrap} ${global_styles.page_width}`}>
                <CustomerLoginForm />
            </div>
        )
}