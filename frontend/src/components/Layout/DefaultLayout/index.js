import Navigation from "./Header/Navigation";
import FooterForm from "./Footer/FooterForm";
function DefaultLayout({ children }) {
    return (
        <body>
            <div>
                {/* //Header */}
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