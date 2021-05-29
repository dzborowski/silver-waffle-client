import * as React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./Header.scss";
import {observer} from "mobx-react";
import {AppModel} from "../../AppModel";

@observer
export class Header extends React.Component {
    protected getLoggedInUserAvailableActions(): React.ReactNode {
        const loggedUser = AppModel.rootStore.auth.loggedUser;
        return (
            <NavDropdown title={`${loggedUser?.firstName} ${loggedUser?.lastName}`} id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        AppModel.rootStore.auth.logout();
                        AppModel.history.push("/");
                    }}
                >
                    Wyloguj się
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    protected getLoggedOutUserAvailableActions(): React.ReactNode {
        return (
            <NavDropdown title="Konto" id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        AppModel.history.push("/login");
                    }}
                >
                    Zaloguj się
                </NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => {
                        AppModel.history.push("/register");
                    }}
                >
                    Zarejestruj się
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    public render() {
        return (
            <div className={"Header"}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand
                        onClick={() => {
                            AppModel.history.push("/");
                        }}
                    >
                        Gry
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            {AppModel.rootStore.auth.isLoggedIn
                                ? this.getLoggedInUserAvailableActions()
                                : this.getLoggedOutUserAvailableActions()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
