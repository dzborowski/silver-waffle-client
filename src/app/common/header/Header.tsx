import * as React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import "./Header.scss";
import {RouteComponentProps, withRouter} from "react-router";
import {rootStore} from "../../../renderer";
import {observer} from "mobx-react";

@observer
class InnerHeader extends React.Component<RouteComponentProps> {
    protected getLoggedInUserAvailableActions(): React.ReactNode {
        const loggedUser = rootStore.auth.loggedUser;
        return (
            <NavDropdown title={`${loggedUser?.firstName} ${loggedUser?.lastName}`} id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        rootStore.auth.logout();
                        this.props.history.push("/");
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
                        this.props.history.push("/login");
                    }}
                >
                    Zaloguj się
                </NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => {
                        this.props.history.push("/register");
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
                            this.props.history.push("/");
                        }}
                    >
                        Gry
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            {rootStore.auth.isLoggedIn()
                                ? this.getLoggedInUserAvailableActions()
                                : this.getLoggedOutUserAvailableActions()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export const Header = withRouter(InnerHeader);
