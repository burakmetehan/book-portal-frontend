export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function checkAuth() {
            const responseData = await _checkAuth();

            if (responseData.valid && responseData.token) {
                localStorage.setItem('Authorization', 'Bearer ' + responseData.token);
                setIsAuthenticated(true);
            } else {
                localStorage.clear();
                setIsAuthenticated(false);
            }
        }

        checkAuth();
    }, [])

    return (
        <Router>
            <Layout
                style={{ height: '100vh' }}
            >
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['home']}
                    >
                        <Menu.Item key="home">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="users">
                            <Link to="/users">Users</Link>
                        </Menu.Item>
                        <Menu.Item key="books">
                            <Link to="/books">Books</Link>
                        </Menu.Item>
                    </Menu>
                </Header>

                <Content
                    className="site-layout"
                    style={{ padding: "0 50px", marginTop: 64 }}
                >
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                        <Breadcrumb.Item>Books</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 380 }}
                    >
                        <Switch>
                            <Route path="/">
                                <Home setIsAuthenticated={setIsAuthenticated} />
                            </Route>
                            <Route path="users">
                                <h1>USERS</h1>
                            </Route>
                            <Route path="books">
                                <AddBook />
                            </Route>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </Router >
    )
}