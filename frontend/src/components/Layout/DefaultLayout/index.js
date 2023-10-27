import Navigation from "./Header/Navigation";
import FooterForm from "./Footer/FooterForm";
function DefaultLayout({ children }) {
    return (
        <body>
            <div>
                <Navigation />
                <div>
                    {children}
                </div>
                {/* <FooterForm /> */}
            </div>
        </body>
    );
}

export default DefaultLayout;